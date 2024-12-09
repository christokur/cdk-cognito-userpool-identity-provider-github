import { strict as assert } from "assert";
import * as fs from "fs";
import * as path from "path";
import { Duration } from "aws-cdk-lib";
import * as cdk from "aws-cdk-lib";
import {
  LambdaIntegration,
  RestApi,
  // DomainName,
  // BasePathMapping,
} from "aws-cdk-lib/aws-apigateway";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import { CfnUserPoolIdentityProvider, UserPool } from "aws-cdk-lib/aws-cognito";
import {
  Code,
  Function as LambdaFunction,
  Runtime,
} from "aws-cdk-lib/aws-lambda";
import * as route53 from "aws-cdk-lib/aws-route53";
import { IHostedZone } from "aws-cdk-lib/aws-route53";
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
  hostedZone?: IHostedZone;
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
        // Other RestApi properties
      );

      api = new RestApi(this, "RestApi", {
        domainName: {
          domainName: props.apiDomainName,
          certificate: githubApiCertificate,
          // Additional domain configurations
        },
      });

      // const domain = new DomainName(this, "CustomDomain", {
      //   domainName: props.apiDomainName,
      //   certificate: githubApiCertificate,
      // });

      // // Map the custom domain to the API stage
      // new BasePathMapping(this, "BasePathMapping", {
      //   domainName: domain,
      //   restApi: api,
      //   stage: api.deploymentStage,
      // });

      // api.addDomainName("ApiDomain", {
      //   domainName: props.apiDomainName,
      //   certificate: githubApiCertificate,
      // });

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
      api = new RestApi(this, "RestApi");
      // Assign the API URL to the public property
      this.apiUrl = api.url || "";
    }

    const homeDir = process.env.HOME || "/root";
    const npmRcPath = path.join(homeDir, ".npmrc");
    if (!fs.existsSync(npmRcPath)) {
      throw new Error(
        `WARNING: .npmrc file not found in ${homeDir}. You may need to create one or set the "NPM_CONFIG_USERCONFIG" environment variable.`,
      );
    } else {
      fs.copyFileSync(npmRcPath, `${__dirname}/.npmrc`);
      console.log(`Copied .npmrc to ${path.resolve(__dirname, ".npmrc")}`);
    }
    assert(
      fs.existsSync(`${__dirname}/.npmrc`),
      ".npmrc not copied to __dirname",
    );
    assert(
      fs.existsSync(`${__dirname}/Dockerfile`),
      "Dockerfile not found in __dirname",
    );

    const packageJsonPath = path.join(__dirname, "..", "package.json");
    const version = fs.existsSync(packageJsonPath)
      ? JSON.parse(fs.readFileSync(packageJsonPath, "utf8")).version
      : "2.3.5";
    console.log(`Version: ${version}`);

    const openIdConfigurationFunction = new LambdaFunction(
      this,
      "OIDCFunction",
      {
        runtime: Runtime.NODEJS_20_X,
        handler: "index.handler",
        code: Code.fromDockerBuild(__dirname, {
          file: "Dockerfile",
          buildArgs: {
            GIT_URL:
              props.gitUrl ||
              "https://github.com/christokur/github-cognito-openid-wrapper",
            GIT_BRANCH: props.gitBranch || "master",
            VERSION: props.version || version,
          },
          cacheDisabled: true,
          platform: "linux/amd64",
        }),
        environment: {
          COGNITO_REDIRECT_URI: `${props.cognitoHostedUiDomain}/oauth2/idpresponse`,
          GITHUB_API_URL: "https://api.github.com",
          GITHUB_CLIENT_ID: props.clientId,
          GITHUB_CLIENT_SECRET: props.clientSecret,
          GITHUB_LOGIN_URL: "https://github.com",
        },
        timeout: Duration.seconds(900),
      },
    );

    api.root.addMethod(
      "GET",
      new LambdaIntegration(openIdConfigurationFunction, {
        proxy: true,
      }),
    );

    api.root.addResource("{proxy+}").addMethod(
      "ANY",
      new LambdaIntegration(openIdConfigurationFunction, {
        proxy: true,
      }),
    );

    if (props.createUserPoolIdentityProvider) {
      let apiEndpoint = api.url;
      if (props.apiDomainName) {
        apiEndpoint = `https://${props.apiDomainName}/${api.deploymentStage.stageName}`;
      }

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
