import { strict as assert } from "assert";
import * as fs from "fs";
import * as path from "path";
import { Duration } from "aws-cdk-lib";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { CfnUserPoolIdentityProvider, UserPool } from "aws-cdk-lib/aws-cognito";
import {
  Code,
  Function as LambdaFunction,
  Runtime,
} from "aws-cdk-lib/aws-lambda";
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
  public readonly userPoolIdentityProvider: CfnUserPoolIdentityProvider;

  constructor(
    scope: Construct,
    id: string,
    props: IUserPoolIdentityProviderGithubProps,
  ) {
    super(scope, id);

    const api = new RestApi(this, "RestApi");

    const homeDir = process.env.HOME || "/root";
    const npmRcPath = path.join(homeDir, ".npmrc");
    if (!fs.existsSync(npmRcPath)) {
      console.warn(
        `WARNING: .npmrc file not found in ${homeDir}. You may need to create one or set the "NPM_CONFIG_USERCONFIG" environment variable.`,
      );
      process.exit(1);
    } else {
      fs.copyFileSync(npmRcPath, `${__dirname}/.npmrc`);
    }
    assert(
      fs.existsSync(`${__dirname}/.npmrc`),
      ".npmrc not copied to __dirname",
    );
    assert(
      fs.existsSync(`${__dirname}/Dockerfile`),
      "Dockerfile not found in __dirname",
    );

    const openIdConfigurationFunction = new LambdaFunction(
      this,
      "OpenIdConfigurationFunction",
      {
        runtime: Runtime.NODEJS_18_X,
        handler: "openIdConfiguration.handler",
        code: Code.fromDockerBuild(__dirname, {
          file: "Dockerfile",
          buildArgs: {
            GIT_URL:
              props.gitUrl ||
              "https://github.com/christokur/github-cognito-openid-wrapper",
            GIT_BRANCH: props.gitBranch || "master",
          },
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
          oidc_issuer: api.url,
          authorize_scopes: "openid read:user user:email",
        },
        attributeMapping: {
          email: "email",
          username: "login",
        },
      },
    );
  }
}
