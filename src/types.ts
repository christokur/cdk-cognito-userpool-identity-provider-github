import { MethodLoggingLevel } from "aws-cdk-lib/aws-apigateway";
import { UserPool } from "aws-cdk-lib/aws-cognito";
import * as route53 from "aws-cdk-lib/aws-route53";

/**
 * Method settings for the REST API
 * @public
 */
export interface MethodSettings {
  /**
   * The HTTP method
   */
  readonly httpMethod: string;

  /**
   * The resource path
   */
  readonly resourcePath: string;

  /**
   * Whether metrics are enabled
   */
  readonly metricsEnabled?: boolean;

  /**
   * Whether data trace is enabled
   */
  readonly dataTraceEnabled?: boolean;

  /**
   * The logging level
   */
  readonly loggingLevel?: MethodLoggingLevel;
}

/**
 * Configuration options for the API Gateway.
 * @public
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

  /** Custom description for the API Gateway */
  readonly description?: string;

  /** Number of days to retain API Gateway logs (default: 30) */
  readonly logRetentionDays?: number;

  /** Additional stage options for API Gateway deployment */
  readonly stageOptions?: Record<string, any>;

  /** Method-level settings for API Gateway */
  readonly methodSettings?: MethodSettings[];

  /** Binary media types supported by the API Gateway (e.g., ['image/x-icon']) */
  readonly binaryMediaTypes?: string[];
}

/**
 * Properties for configuring the GitHub Identity Provider for AWS Cognito.
 * @public
 */
export interface IUserPoolIdentityProviderGithubProps {
  /** The Cognito User Pool to associate with the GitHub Identity Provider */
  readonly userPool: UserPool;

  /** GitHub OAuth App Client ID */
  readonly clientId: string;

  /** GitHub OAuth App Client Secret */
  readonly clientSecret: string;

  /** Domain name for the Cognito Hosted UI */
  readonly cognitoHostedUiDomain: string;

  /** GitHub Enterprise URL (optional) */
  readonly gitUrl?: string;

  /** Git branch to use (optional) */
  readonly gitBranch?: string;

  /** Custom domain name for the API (optional) */
  readonly apiDomainName?: string;

  /** Route53 hosted zone for the API domain (optional) */
  readonly hostedZone?: route53.IHostedZone;

  /** Whether to create the Cognito User Pool Identity Provider (default: true) */
  readonly createUserPoolIdentityProvider?: boolean;

  /** Version number (optional) */
  readonly version?: string;

  /** API Gateway configuration options (optional) */
  readonly apiOptions?: ApiGatewayOptions;

  /** Number of days to retain Lambda logs (optional) */
  readonly lambdaLogRetentionDays?: number;

  /** Whether to include source maps for debugging (optional) */
  readonly includeSourceMaps?: boolean;

  /** Consumer identifier (optional) */
  readonly consumer?: string;

  /** Whether to enable tracing (optional) */
  readonly tracingEnabled?: boolean;

  /** Log level for the Lambda function (optional) */
  readonly logLevel?: "error" | "warn" | "info" | "debug";
}
