import { Stack } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { UserPool } from "aws-cdk-lib/aws-cognito";
import { Code } from "aws-cdk-lib/aws-lambda";
import { IHostedZone } from "aws-cdk-lib/aws-route53";
import { UserPoolIdentityProviderGithub } from "../src";

const clientId = "myClientId";
const clientSecret = "myClientSecret";
const cognitoHostedUiDomain = "https://cognito.domain";

let originalFromAsset: typeof Code.fromAsset;
const originalHome = process.env.HOME;

beforeAll(() => {
  originalFromAsset = Code.fromAsset;
  process.env.NODE_ENV = "test";
  jest.clearAllMocks();
});

afterEach(() => {
  process.env.HOME = originalHome;
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

test("UserPoolIdentityProviderGithub creates resources", () => {
  const stack = new Stack();
  new UserPoolIdentityProviderGithub(stack, "UserPoolIdentityProviderGithub", {
    clientId,
    clientSecret,
    userPool: new UserPool(stack, "UserPool"),
    cognitoHostedUiDomain,
    createUserPoolIdentityProvider: true,
  });

  const template = Template.fromStack(stack);

  template.hasResourceProperties("AWS::ApiGateway::RestApi", {});

  template.hasResourceProperties("AWS::Lambda::Function", {
    Handler: "index.handler",
    Environment: {
      Variables: {
        COGNITO_REDIRECT_URI: `${cognitoHostedUiDomain}/oauth2/idpresponse`,
        GITHUB_API_URL: "https://api.github.com",
        GITHUB_CLIENT_ID: clientId,
        GITHUB_CLIENT_SECRET: clientSecret,
        GITHUB_LOGIN_URL: "https://github.com",
      },
    },
    Runtime: "nodejs20.x",
    Timeout: 900,
  });

  template.hasResourceProperties("AWS::Cognito::UserPoolIdentityProvider", {
    ProviderName: "GitHub",
    ProviderType: "OIDC",
  });
});

test("UserPoolIdentityProviderGithub uses default gitUrl and gitBranch", () => {
  const stack = new Stack();

  new UserPoolIdentityProviderGithub(stack, "UserPoolIdentityProviderGithub", {
    clientId,
    clientSecret,
    userPool: new UserPool(stack, "UserPool"),
    cognitoHostedUiDomain,
  });

  expect(Code.fromAsset).toHaveBeenCalledWith(expect.any(String));

  // Verify the path is correct
  const callPath = (Code.fromAsset as jest.Mock).mock.calls[0][0];
  expect(callPath).toMatch(/github-cognito-openid-wrapper\/dist-lambda$/);
});

test("UserPoolIdentityProviderGithub uses custom gitUrl and gitBranch", () => {
  const stack = new Stack();
  const customGitUrl = "https://github.com/custom/repo";
  const customGitBranch = "develop";

  new UserPoolIdentityProviderGithub(stack, "UserPoolIdentityProviderGithub", {
    clientId,
    clientSecret,
    userPool: new UserPool(stack, "UserPool"),
    cognitoHostedUiDomain,
    gitUrl: customGitUrl,
    gitBranch: customGitBranch,
  });

  expect(Code.fromAsset).toHaveBeenCalledWith(expect.any(String));

  // Verify the path is correct
  const callPath = (Code.fromAsset as jest.Mock).mock.calls[0][0];
  expect(callPath).toMatch(/github-cognito-openid-wrapper\/dist-lambda$/);
});

test("UserPoolIdentityProviderGithub creates certificate for custom domain", () => {
  const stack = new Stack();
  const mockHostedZone = {
    hostedZoneId: "DUMMY",
    zoneName: "example.com",
  } as IHostedZone;

  new UserPoolIdentityProviderGithub(stack, "UserPoolIdentityProviderGithub", {
    clientId,
    clientSecret,
    userPool: new UserPool(stack, "UserPool"),
    cognitoHostedUiDomain,
    apiDomainName: "api.example.com",
    hostedZone: mockHostedZone,
  });

  const template = Template.fromStack(stack);
  template.hasResourceProperties("AWS::CertificateManager::Certificate", {
    DomainName: "api.example.com",
  });
});

test("UserPoolIdentityProviderGithub handles missing .npmrc", () => {
  const stack = new Stack();
  process.env.HOME = "/nonexistent";

  expect(() => {
    new UserPoolIdentityProviderGithub(stack, "TestConstruct", {
      userPool: new UserPool(stack, "UserPool"),
      clientId,
      clientSecret,
      cognitoHostedUiDomain,
    });
  }).toThrow();

  process.env.HOME = originalHome;
});

test("UserPoolIdentityProviderGithub handles missing HOME env var", () => {
  const stack = new Stack();
  delete process.env.HOME;

  expect(() => {
    new UserPoolIdentityProviderGithub(stack, "TestConstruct", {
      userPool: new UserPool(stack, "UserPool"),
      clientId,
      clientSecret,
      cognitoHostedUiDomain,
    });
  }).toThrow(/WARNING: .npmrc file not found in \/root/);

  process.env.HOME = originalHome;
});

test("UserPoolIdentityProviderGithub does not create identity provider when createUserPoolIdentityProvider is false", () => {
  const stack = new Stack();
  const provider = new UserPoolIdentityProviderGithub(
    stack,
    "UserPoolIdentityProviderGithub",
    {
      clientId,
      clientSecret,
      userPool: new UserPool(stack, "UserPool"),
      cognitoHostedUiDomain,
      createUserPoolIdentityProvider: false,
    },
  );

  expect(provider.userPoolIdentityProvider).toBeUndefined();
  Template.fromStack(stack).hasResourceProperties(
    "AWS::ApiGateway::RestApi",
    {},
  );
});

test("UserPoolIdentityProviderGithub creates correct API endpoints", () => {
  const stack = new Stack();
  new UserPoolIdentityProviderGithub(stack, "UserPoolIdentityProviderGithub", {
    clientId,
    clientSecret,
    userPool: new UserPool(stack, "UserPool"),
    cognitoHostedUiDomain,
  });

  const template = Template.fromStack(stack);

  // Root GET method
  template.hasResourceProperties("AWS::ApiGateway::Method", {
    HttpMethod: "GET",
    AuthorizationType: "NONE",
    Integration: {
      Type: "AWS_PROXY",
    },
  });

  // Proxy ANY method
  template.hasResourceProperties("AWS::ApiGateway::Method", {
    HttpMethod: "ANY",
    AuthorizationType: "NONE",
    Integration: {
      Type: "AWS_PROXY",
    },
  });
});

test("UserPoolIdentityProviderGithub sets correct Lambda environment variables", () => {
  const stack = new Stack();
  new UserPoolIdentityProviderGithub(stack, "UserPoolIdentityProviderGithub", {
    clientId,
    clientSecret,
    userPool: new UserPool(stack, "UserPool"),
    cognitoHostedUiDomain,
  });

  Template.fromStack(stack).hasResourceProperties("AWS::Lambda::Function", {
    Environment: {
      Variables: {
        COGNITO_REDIRECT_URI: `${cognitoHostedUiDomain}/oauth2/idpresponse`,
        GITHUB_API_URL: "https://api.github.com",
        GITHUB_CLIENT_ID: clientId,
        GITHUB_CLIENT_SECRET: clientSecret,
        GITHUB_LOGIN_URL: "https://github.com",
      },
    },
  });
});
