import * as path from "path";
import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as logs from "aws-cdk-lib/aws-logs";
import { Construct } from "constructs";
import {
  DEFAULT_LAMBDA_ASSET_OPTIONS,
  DEBUG_LAMBDA_ASSET_OPTIONS,
} from "./lambda-config";

export interface CreateLambdaFunctionOptions {
  cognitoHostedUiDomain: string;
  clientId: string;
  clientSecret: string;
  includeSourceMaps?: boolean;
  tracingEnabled?: boolean;
  consumer?: string;
  version?: string;
  versionComponent: string;
  logLevel?: "error" | "warn" | "info" | "debug";
  lambdaLogRetentionDays?: number;
}

export function createLambdaFunction(
  scope: Construct,
  id: string,
  options: CreateLambdaFunctionOptions,
): lambda.Function {
  return new lambda.Function(scope, id, {
    runtime: lambda.Runtime.NODEJS_20_X,
    handler: "index.handler",
    tracing: options.tracingEnabled
      ? lambda.Tracing.ACTIVE
      : lambda.Tracing.DISABLED,
    code: lambda.Code.fromAsset(
      path.join(
        __dirname,
        "../node_modules/github-cognito-openid-wrapper/dist-lambda",
      ),
      options.includeSourceMaps
        ? DEBUG_LAMBDA_ASSET_OPTIONS
        : DEFAULT_LAMBDA_ASSET_OPTIONS,
    ) as lambda.Code,
    environment: {
      COGNITO_REDIRECT_URI: `${options.cognitoHostedUiDomain}/oauth2/idpresponse`,
      GITHUB_API_URL: "https://api.github.com",
      GITHUB_CLIENT_ID: options.clientId,
      GITHUB_CLIENT_SECRET: options.clientSecret,
      GITHUB_LOGIN_URL: "https://github.com",
      SOURCE_MAP_SUPPORT: options.includeSourceMaps ? "true" : "false",
      CONSUMER:
        options.consumer || "cdk-cognito-userpool-identity-provider-github",
      VERSION_CONSUMER: options.version || "0.0.0",
      VERSION_COMPONENT: options.versionComponent,
      LOG_LEVEL: options.logLevel || "info",
    },
    timeout: cdk.Duration.seconds(900),
    logRetention:
      options.lambdaLogRetentionDays ?? logs.RetentionDays.ONE_MONTH,
  });
}
