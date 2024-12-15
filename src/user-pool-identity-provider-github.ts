import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as cdk from "aws-cdk-lib";
import { Duration } from "aws-cdk-lib";
import {
  RestApi,
  LambdaIntegration,
  MethodLoggingLevel,
  EndpointType,
} from "aws-cdk-lib/aws-apigateway";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import { CfnUserPoolIdentityProvider, UserPool } from "aws-cdk-lib/aws-cognito";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as logs from "aws-cdk-lib/aws-logs";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as targets from "aws-cdk-lib/aws-route53-targets";
import { Construct } from "constructs";

/**
 * Configuration options for the API Gateway.
 */
export interface ApiGatewayOptions {
  /** Enable CloudWatch logging (default: true) */
  readonly loggingEnabled?: boolean;

  /**
   * CloudWatch logging level for API Gateway (default: INFO).
   * Available levels: ERROR, INFO, OFF
   */
  readonly loggingLevel?: MethodLoggingLevel;

  /**
   * Enable request/response tracing in API Gateway logs (default: true).
   * When enabled, API Gateway logs the full request/response bodies.
   */
  readonly dataTraceEnabled?: boolean;

  /**
   * Enable CloudWatch metrics for API Gateway (default: true).
   * Metrics include latency, count, and error rates.
   */
  readonly metricsEnabled?: boolean;

  /**
   * Enable CloudWatch role creation for API Gateway logging (default: true).
   * When true, creates an IAM role allowing API Gateway to write logs.
   */
  readonly cloudWatchRole?: boolean;

  /**
   * Custom API description (default: "GitHub OIDC Identity Provider API").
   * Appears in API Gateway console and exports.
   */
  readonly description?: string;

  /**
   * Method settings for API Gateway stage.
   * Override specific method settings like caching or throttling.
   */
  readonly methodSettings?: Record<string, any>[];

  /**
   * Additional stage options for API Gateway deployment stage.
   * Configure caching, throttling, and other stage-level settings.
   */
  readonly stageOptions?: Record<string, any>;

  /**
   * Log retention days for API Gateway CloudWatch logs (default: 30).
   * Automatically deletes logs older than specified days.
   * Use aws-cdk-lib/aws-logs.RetentionDays enum for valid values.
   */
  readonly logRetentionDays?: number;
}

/**
 * Properties for configuring the GitHub Identity Provider for AWS Cognito.
 */
export interface IUserPoolIdentityProviderGithubProps {
  /**
   * The Cognito User Pool to attach the identity provider to.
   * Must be an existing User Pool instance.
   */
  userPool: UserPool;

  /**
   * The client ID from your GitHub OAuth application.
   * Obtain this from GitHub Developer Settings.
   */
  clientId: string;

  /**
   * The client secret from your GitHub OAuth application.
   * Obtain this from GitHub Developer Settings.
   * Keep this value secure and never commit it to source control.
   */
  clientSecret: string;

  /**
   * The domain name for your Cognito hosted UI.
   * Format: https://your-domain-prefix.auth.region.amazoncognito.com
   */
  cognitoHostedUiDomain: string;

  /**
   * Custom Git repository URL for the GitHub wrapper (optional).
   * Use this to specify a fork or alternative implementation.
   * Default: Uses the standard github-cognito-openid-wrapper package.
   */
  gitUrl?: string;

  /**
   * Git branch to use from the wrapper repository (optional).
   * Useful for testing specific versions or features.
   * Default: Uses the main/master branch.
   */
  gitBranch?: string;

  /**
   * Custom domain name for the API Gateway endpoint (optional).
   * Must be a valid domain name that you control.
   * Requires hostedZone to be specified.
   */
  apiDomainName?: string;

  /**
   * Route 53 hosted zone for the custom domain (optional).
   * Required if apiDomainName is specified.
   * Must be an existing hosted zone in your AWS account.
   */
  hostedZone?: route53.IHostedZone;

  /**
   * Whether to create the Cognito User Pool Identity Provider (default: true).
   * Set to false to skip identity provider creation.
   */
  createUserPoolIdentityProvider?: boolean;

  /**
   * Version string for the wrapper package (optional).
   * Useful for tracking deployments or specific wrapper versions.
   */
  version?: string;

  /**
   * API Gateway configuration options.
   * Configure logging, metrics, custom domain, and other API settings.
   */
  apiOptions?: ApiGatewayOptions;

  /**
   * Log retention days for Lambda function CloudWatch logs (default: 30).
   * Automatically deletes logs older than specified days.
   * Use aws-cdk-lib/aws-logs.RetentionDays enum for valid values.
   */
  readonly lambdaLogRetentionDays?: number;
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
      cloudWatchRole: props.apiOptions?.cloudWatchRole ?? true,
      description:
        props.apiOptions?.description ?? "GitHub OIDC Identity Provider API",
      deployOptions: {
        loggingLevel: props.apiOptions?.loggingLevel ?? MethodLoggingLevel.INFO,
        dataTraceEnabled: props.apiOptions?.dataTraceEnabled ?? true,
        metricsEnabled: props.apiOptions?.metricsEnabled ?? true,
        methodSettings: props.apiOptions?.methodSettings ?? [
          {
            httpMethod: "*",
            resourcePath: "/*",
            loggingLevel:
              props.apiOptions?.loggingLevel ?? MethodLoggingLevel.INFO,
            dataTraceEnabled: props.apiOptions?.dataTraceEnabled ?? true,
            metricsEnabled: props.apiOptions?.metricsEnabled ?? true,
          },
        ],
        ...props.apiOptions?.stageOptions,
      },
      accessLogSettings: {
        destinationArn: new logs.LogGroup(this, "ApiGatewayAccessLogs", {
          retention:
            props.apiOptions?.logRetentionDays ?? logs.RetentionDays.ONE_MONTH,
        }).logGroupArn,
        format: JSON.stringify({
          requestId: "$context.requestId",
          ip: "$context.identity.sourceIp",
          caller: "$context.identity.caller",
          user: "$context.identity.user",
          requestTime: "$context.requestTime",
          httpMethod: "$context.httpMethod",
          resourcePath: "$context.resourcePath",
          status: "$context.status",
          protocol: "$context.protocol",
          responseLength: "$context.responseLength",
        }),
      },
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
        ...restApiProps,
        domainName: {
          domainName: props.apiDomainName,
          certificate: githubApiCertificate,
          endpointType: EndpointType.REGIONAL,
          basePath: "", // Set empty base path
        },
        deployOptions: {
          ...restApiProps.deployOptions,
          stageName: "", // Remove stage name when using custom domain
        },
      });

      // Create DNS record with no base path
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
        CUSTOM_DOMAIN_NAME: props.apiDomainName || "", // Add custom domain name to environment
      },
      timeout: Duration.seconds(900),
      logRetention:
        props.lambdaLogRetentionDays ?? logs.RetentionDays.ONE_MONTH,
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
            // When false, no additional attributes are added to the attributes URL
            attributes_url_add_attributes: false,
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
