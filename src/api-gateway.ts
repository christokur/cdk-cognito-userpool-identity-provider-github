import * as cdk from "aws-cdk-lib";
import {
  RestApi,
  EndpointType,
  MethodLoggingLevel,
} from "aws-cdk-lib/aws-apigateway";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as logs from "aws-cdk-lib/aws-logs";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as targets from "aws-cdk-lib/aws-route53-targets";
import { Construct } from "constructs";
import { ApiGatewayOptions } from "./types";

export interface CreateApiGatewayResult {
  api: RestApi;
  domainName: string;
  apiUrl: string;
}

export function createApiGateway(
  scope: Construct,
  _id: string,
  options: {
    apiDomainName?: string;
    hostedZone?: route53.IHostedZone;
    apiOptions?: ApiGatewayOptions;
    tracingEnabled?: boolean;
  },
): CreateApiGatewayResult {
  const restApiName = "GitHubOIDCIdpApi";
  const restApiProps = {
    cloudWatchRole: options.apiOptions?.cloudWatchRole ?? true,
    description:
      options.apiOptions?.description ?? "GitHub OIDC Identity Provider API",
    binaryMediaTypes: options.apiOptions?.binaryMediaTypes ?? ['image/x-icon'],
    deployOptions: {
      loggingLevel: options.apiOptions?.loggingLevel ?? MethodLoggingLevel.INFO,
      dataTraceEnabled: options.apiOptions?.dataTraceEnabled ?? true,
      metricsEnabled: options.apiOptions?.metricsEnabled ?? true,
      methodSettings: options.apiOptions?.methodSettings ?? [
        {
          httpMethod: "*",
          resourcePath: "/*",
          loggingLevel:
            options.apiOptions?.loggingLevel ?? MethodLoggingLevel.INFO,
          dataTraceEnabled: options.apiOptions?.dataTraceEnabled ?? true,
          metricsEnabled: options.apiOptions?.metricsEnabled ?? true,
        },
      ],
      ...options.apiOptions?.stageOptions,
    },
    accessLogSettings: {
      destinationArn: new logs.LogGroup(scope, "ApiGatewayAccessLogs", {
        retention:
          options.apiOptions?.logRetentionDays ?? logs.RetentionDays.ONE_MONTH,
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

  let api: RestApi;
  let domainName = "";
  let apiUrl = "";

  // Common API Gateway properties
  const commonApiProps = {
    ...restApiProps,
    deployOptions: {
      tracingEnabled: options.tracingEnabled ?? false,
      ...restApiProps.deployOptions,
    },
  };

  // Set up custom domain if provided
  if (options.apiDomainName && options.hostedZone) {
    // Create certificate for GitHub API Gateway in the current region
    const githubApiCertificate = new acm.Certificate(
      scope,
      "GithubApiCertificate",
      {
        domainName: options.apiDomainName,
        validation: acm.CertificateValidation.fromDns(options.hostedZone),
      },
    );

    api = new RestApi(scope, restApiName, {
      ...commonApiProps,
      domainName: {
        domainName: options.apiDomainName,
        certificate: githubApiCertificate,
        endpointType: EndpointType.REGIONAL,
        basePath: "", // Set empty base path
      },
      deployOptions: {
        ...commonApiProps.deployOptions,
        stageName: "", // Remove stage name when using custom domain
      },
    });

    // Create DNS record with no base path
    new route53.ARecord(scope, "ApiDomainRecord", {
      zone: options.hostedZone,
      recordName: options.apiDomainName,
      target: route53.RecordTarget.fromAlias(new targets.ApiGateway(api)),
    });

    new cdk.CfnOutput(scope, "domainName", {
      value: api.domainName?.domainName || "",
    });
    new cdk.CfnOutput(scope, "url", { value: api.url || "" });

    domainName = api.domainName?.domainName || "";
    apiUrl = `https://${domainName}`;
  } else {
    api = new RestApi(scope, restApiName, commonApiProps);
    apiUrl = api.url || "";
  }

  // Set retention for API Gateway execution logs
  const stageName = api.deploymentStage.stageName;
  new logs.CfnResourcePolicy(scope, "ApiGatewayLogsRetention", {
    policyName: `${api.restApiId}-logs-retention`,
    policyDocument: JSON.stringify({
      Version: "2012-10-17",
      Statement: [
        {
          Effect: "Allow",
          Principal: { Service: "apigateway.amazonaws.com" },
          Action: ["logs:PutRetentionPolicy"],
          Resource: [
            `arn:aws:logs:${cdk.Stack.of(scope).region}:${
              cdk.Stack.of(scope).account
            }:log-group:API-Gateway-Execution-Logs_${api.restApiId}/${stageName}`,
          ],
        },
      ],
    }),
  });

  return { api, domainName, apiUrl };
}
