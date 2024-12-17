import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as cdk from "aws-cdk-lib";
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { CfnUserPoolIdentityProvider } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";
import { createApiGateway } from "./api-gateway";
import { createLambdaFunction } from "./lambda";
import { IUserPoolIdentityProviderGithubProps } from "./types";

const VERSION: string = "2.0.18";

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

    // Check for .npmrc file
    const npmrcPath = path.join(process.env.HOME || "/root", ".npmrc");
    if (!fs.existsSync(npmrcPath)) {
      throw new Error(
        `WARNING: .npmrc file not found in ${process.env.HOME || "/root"}`,
      );
    }

    // Build the wrapper package
    const targetDir = path.join(
      __dirname,
      "../node_modules/github-cognito-openid-wrapper",
    );

    if (!fs.existsSync(targetDir)) {
      throw new Error(
        `Directory not found: ${targetDir}\n` +
          "Please ensure github-cognito-openid-wrapper is installed by running:\n" +
          "npm install github-cognito-openid-wrapper",
      );
    }

    try {
      execSync("npm install && npm run build", {
        cwd: targetDir,
        stdio: "inherit",
        shell: process.env.SHELL,
      });
    } catch (error: any) {
      const details = [
        "Failed to build wrapper package:",
        `Working directory: ${targetDir}`,
        `Error: ${error.message}`,
        error.code ? `Error code: ${error.code}` : null,
        error.path ? `Path: ${error.path}` : null,
        error.syscall ? `System call: ${error.syscall}` : null,
        error.stderr ? `stderr: ${error.stderr.toString()}` : null,
        error.stdout ? `stdout: ${error.stdout.toString()}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      throw new Error(details);
    }

    // Create API Gateway
    const { api, domainName, apiUrl } = createApiGateway(this, "GitHubApi", {
      apiDomainName: props.apiDomainName,
      hostedZone: props.hostedZone,
      apiOptions: props.apiOptions,
      tracingEnabled: props.tracingEnabled,
    });

    this.domainName = domainName;
    this.apiUrl = apiUrl;

    // Create Lambda function
    const indexFunction = createLambdaFunction(this, "indexFunction", {
      cognitoHostedUiDomain: props.cognitoHostedUiDomain,
      clientId: props.clientId,
      clientSecret: props.clientSecret,
      includeSourceMaps: props.includeSourceMaps,
      tracingEnabled: props.tracingEnabled,
      consumer: props.consumer,
      version: props.version,
      versionComponent: VERSION,
      logLevel: props.logLevel,
      lambdaLogRetentionDays: props.lambdaLogRetentionDays,
    });

    // Add API routes
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

    // Create User Pool Identity Provider if requested
    if (props.createUserPoolIdentityProvider) {
      let apiEndpoint = props.apiDomainName
        ? `https://${props.apiDomainName}`
        : api.url;

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
            attributes_url: `${apiEndpoint}/userinfo`,
            attributes_url_add_attributes: false,
            oidc_issuer: apiEndpoint,
            authorize_scopes: "openid read:user user:email",
          },
          attributeMapping: {
            email: "email",
            name: "name",
            username: "sub",
            preferredUsername: "preferred_username",
          },
        },
      );
      new cdk.CfnOutput(this, "oidcIssuerUrl", {
        value: apiEndpoint,
      });
    } else {
      this.userPoolIdentityProvider = undefined;
    }
  }
}
