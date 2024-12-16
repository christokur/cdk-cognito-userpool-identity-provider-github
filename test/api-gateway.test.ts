import { Stack } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as route53 from "aws-cdk-lib/aws-route53";
import { createApiGateway } from "../src/api-gateway";

describe("createApiGateway", () => {
  test("creates basic API Gateway without custom domain", () => {
    const stack = new Stack();
    const { api } = createApiGateway(stack, "TestApi", {});

    // Add a test method to the API
    const testFunction = new lambda.Function(stack, "TestHandler", {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "index.handler",
      code: lambda.Code.fromInline("exports.handler = () => {}"),
    });

    const resource = api.root.addResource("test");
    resource.addMethod("GET", new apigateway.LambdaIntegration(testFunction));

    const template = Template.fromStack(stack);
    template.hasResourceProperties("AWS::ApiGateway::RestApi", {
      Name: "GitHubOIDCIdpApi",
    });
  });

  test("creates API Gateway with custom domain", () => {
    const stack = new Stack();
    const hostedZone = new route53.HostedZone(stack, "TestZone", {
      zoneName: "example.com",
    });

    const { api } = createApiGateway(stack, "TestApi", {
      apiDomainName: "api.example.com",
      hostedZone,
    });

    // Add a test method to the API
    const testFunction = new lambda.Function(stack, "TestHandler", {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "index.handler",
      code: lambda.Code.fromInline("exports.handler = () => {}"),
    });

    const resource = api.root.addResource("test");
    resource.addMethod("GET", new apigateway.LambdaIntegration(testFunction));

    const template = Template.fromStack(stack);
    template.hasResourceProperties("AWS::ApiGateway::DomainName", {
      DomainName: "api.example.com",
    });
  });
});
