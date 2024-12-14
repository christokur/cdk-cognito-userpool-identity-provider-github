import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as cdk from "aws-cdk-lib";
import { Duration } from "aws-cdk-lib";
import { RestApi, LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import { CfnUserPoolIdentityProvider, UserPool } from "aws-cdk-lib/aws-cognito";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as targets from "aws-cdk-lib/aws-route53-targets";
import { Construct } from "constructs";

export interface IUserPoolIdentityProviderGithubProps {
  /** The user pool */
  userPool: UserPool;
  /** The client id recognized by Github APIs */
  clientId: string;
  /** The client secret to be accompanied with clientId for Github APIs to authenticate the client */
  clientSecret: string;
  /** The Cognito hosted UI domain */
  cognitoHostedUiDomain: string;
  /** The URL of the Git repository for the GitHub wrapper */
  gitUrl?: string;
  /** The branch of the Git repository to clone for the GitHub wrapper */
  gitBranch?: string;
  /** The custom domain name for the API Gateway */
  apiDomainName?: string;
  /** The hosted zone for the custom domain */
  hostedZone?: route53.IHostedZone;
  /** Create the user pool */
  createUserPoolIdentityProvider?: boolean;
  /** The version string */
  version?: string;
}

/**
 * GitHub OpenID Connect Wrapper for Cognito
 *
 * @example
 *
 * new UserPoolIdentityProviderGithub(this, 'UserPoolIdentityProviderGithub', {
 *   userPool: new UserPool(stack, 'UserPool'),
 *   clientId: 'myClientId',
 *   clientSecret: 'myClientSecret',
 *   cognitoHostedUiDomain: 'https://auth.domain.com',
 * });
 */
export class UserPoolIdentityProviderGithub extends Construct {
  public readonly userPoolIdentityProvider:
    | CfnUserPoolIdentityProvider
    | undefined;
  public readonly apiUrl: string = "";
  public readonly domainName: string = "";

  constructor(
    scope: Construct,
    id: string,
    props: IUserPoolIdentityProviderGithubProps,
  ) {
    super(scope, id);

    let api = undefined;
    const restApiName = "GitHubOIDCIdpApi";
    const restApiProps = {
      cloudWatchRole: true,
      description: "GitHub OIDC Identity Provider API",
    };

    // Set up custom domain if provided
    if (props.apiDomainName && props.hostedZone) {
      // Create certificate for GitHub API Gateway in the current region
      const githubApiCertificate = new acm.Certificate(
        this,
        "GithubApiCertificate",
        {
          domainName: props.apiDomainName,
          validation: acm.CertificateValidation.fromDns(props.hostedZone),
        },
      );

      api = new RestApi(this, restApiName, {
        domainName: {
          domainName: props.apiDomainName,
          certificate: githubApiCertificate,
        },
      });

      // Create DNS record
      new route53.ARecord(this, "ApiDomainRecord", {
        zone: props.hostedZone,
        recordName: props.apiDomainName,
        target: route53.RecordTarget.fromAlias(new targets.ApiGateway(api)),
      });
      new cdk.CfnOutput(this, "domainName", {
        value: api.domainName?.domainName || "",
      });
      new cdk.CfnOutput(this, "url", { value: api.url || "" });

      this.domainName = api.domainName?.domainName || "";
      // Assign the API URL to the public property
      this.apiUrl = `https://${this.domainName}`;
    } else {
      api = new RestApi(this, restApiName, restApiProps);
      // Assign the API URL to the public property
      this.apiUrl = api.url || "";
    }

    // Check for .npmrc file
    const npmrcPath = path.join(process.env.HOME || "/root", ".npmrc");
    if (!fs.existsSync(npmrcPath)) {
      throw new Error(
        `WARNING: .npmrc file not found in ${process.env.HOME || "/root"}`,
      );
    }

    // Build the wrapper package
    execSync("npm install && npm run build", {
      cwd: path.join(
        __dirname,
        "../node_modules/github-cognito-openid-wrapper",
      ),
      stdio: "inherit",
    });

    const indexFunction = new lambda.Function(this, "indexFunction", {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset(
        path.join(
          __dirname,
          "../node_modules/github-cognito-openid-wrapper/dist-lambda",
        ),
      ),
      environment: {
        COGNITO_REDIRECT_URI: `${props.cognitoHostedUiDomain}/oauth2/idpresponse`,
        GITHUB_API_URL: "https://api.github.com",
        GITHUB_CLIENT_ID: props.clientId,
        GITHUB_CLIENT_SECRET: props.clientSecret,
        GITHUB_LOGIN_URL: "https://github.com",
      },
      timeout: Duration.seconds(900),
    });

    api.root.addMethod(
      "GET",
      new LambdaIntegration(indexFunction, {
        proxy: true,
      }),
    );

    api.root.addResource("{proxy+}").addMethod(
      "ANY",
      new LambdaIntegration(indexFunction, {
        proxy: true,
      }),
    );

    if (props.createUserPoolIdentityProvider) {
      let apiEndpoint = api.url;
      // if (props.apiDomainName) {
      //   apiEndpoint = `https://${props.apiDomainName}/${api.deploymentStage.stageName}`;
      // }

      this.userPoolIdentityProvider = new CfnUserPoolIdentityProvider(
        this,
        "UserPoolIdentityProvider",
        {
          userPoolId: props.userPool.userPoolId,
          providerName: "GitHub",
          providerType: "OIDC",
          providerDetails: {
            client_id: props.clientId,
            client_secret: props.clientSecret,
            attributes_request_method: "GET",
            oidc_issuer: apiEndpoint,
            authorize_scopes: "openid read:user user:email",
          },
          attributeMapping: {
            email: "email_verified",
            name: "name",
            username: "sub",
            preferredUsername: "preferred_username",
          },
        },
      );
    } else {
      this.userPoolIdentityProvider = undefined;
    }
  }
}
