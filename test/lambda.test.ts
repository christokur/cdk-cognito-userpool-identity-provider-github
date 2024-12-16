import { Stack } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { Code } from "aws-cdk-lib/aws-lambda";
import { createLambdaFunction } from "../src/lambda";

describe("createLambdaFunction", () => {
  let originalFromAsset: typeof Code.fromAsset;

  beforeAll(() => {
    originalFromAsset = Code.fromAsset;
    process.env.NODE_ENV = "test";
  });

  beforeEach(() => {
    (Code.fromAsset as jest.Mock) = jest.fn().mockReturnValue({
      bindToResource: jest.fn(),
      isInline: false,
      bind: () => ({
        s3Location: { bucketName: "test-bucket", objectKey: "test-key" },
      }),
    });
  });

  afterAll(() => {
    Code.fromAsset = originalFromAsset;
  });

  test("creates Lambda function with default options", () => {
    const stack = new Stack();
    createLambdaFunction(stack, "TestFunction", {
      cognitoHostedUiDomain: "https://cognito.domain",
      clientId: "testClientId",
      clientSecret: "testClientSecret",
      versionComponent: "1.0.0",
    });

    const template = Template.fromStack(stack);
    template.hasResourceProperties("AWS::Lambda::Function", {
      Handler: "index.handler",
      Runtime: "nodejs20.x",
      Environment: {
        Variables: {
          COGNITO_REDIRECT_URI: "https://cognito.domain/oauth2/idpresponse",
          GITHUB_API_URL: "https://api.github.com",
          GITHUB_CLIENT_ID: "testClientId",
          GITHUB_CLIENT_SECRET: "testClientSecret",
          GITHUB_LOGIN_URL: "https://github.com",
          SOURCE_MAP_SUPPORT: "false",
          CONSUMER: "cdk-cognito-userpool-identity-provider-github",
          VERSION_CONSUMER: "0.0.0",
          VERSION_COMPONENT: "1.0.0",
          LOG_LEVEL: "info",
        },
      },
    });
  });

  test("creates Lambda function with custom options", () => {
    const stack = new Stack();
    createLambdaFunction(stack, "TestFunction", {
      cognitoHostedUiDomain: "https://cognito.domain",
      clientId: "testClientId",
      clientSecret: "testClientSecret",
      versionComponent: "1.0.0",
      includeSourceMaps: true,
      tracingEnabled: true,
      consumer: "custom-consumer",
      version: "2.0.0",
      logLevel: "debug",
    });

    const template = Template.fromStack(stack);
    template.hasResourceProperties("AWS::Lambda::Function", {
      Handler: "index.handler",
      Runtime: "nodejs20.x",
      TracingConfig: { Mode: "Active" },
      Environment: {
        Variables: {
          SOURCE_MAP_SUPPORT: "true",
          CONSUMER: "custom-consumer",
          VERSION_CONSUMER: "2.0.0",
          LOG_LEVEL: "debug",
        },
      },
    });
  });
});
