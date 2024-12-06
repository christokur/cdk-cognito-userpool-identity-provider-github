import { Template } from "aws-cdk-lib/assertions";
import { UserPool } from "aws-cdk-lib/aws-cognito";
import { Code } from "aws-cdk-lib/aws-lambda";
import { Stack } from "aws-cdk-lib/core";
import { UserPoolIdentityProviderGithub } from "../src";

const clientId = "myClientId";
const clientSecret = "myClientSecret";
const cognitoHostedUiDomain = "https://cognito.domain";

let originalFromDockerBuild: typeof Code.fromDockerBuild;

beforeAll(() => {
  originalFromDockerBuild = Code.fromDockerBuild;
  jest.clearAllMocks();
});

beforeEach(() => {
  (Code.fromDockerBuild as jest.Mock) = jest.fn().mockReturnValue({
    bindToResource: jest.fn(),
    isInline: false,
    bind: () => ({
      s3Location: { bucketName: "test-bucket", objectKey: "test-key" },
    }),
  });
});

afterAll(() => {
  Code.fromDockerBuild = originalFromDockerBuild;
});

test("UserPoolIdentityProviderGithub creates resources", () => {
  const stack = new Stack();
  new UserPoolIdentityProviderGithub(stack, "UserPoolIdentityProviderGithub", {
    clientId,
    clientSecret,
    userPool: new UserPool(stack, "UserPool"),
    cognitoHostedUiDomain,
  });

  const template = Template.fromStack(stack);

  template.hasResourceProperties("AWS::ApiGateway::RestApi", {});

  template.hasResourceProperties("AWS::Lambda::Function", {
    Handler: "openIdConfiguration.handler",
    Environment: {
      Variables: {
        COGNITO_REDIRECT_URI: `${cognitoHostedUiDomain}/oauth2/idpresponse`,
        GITHUB_API_URL: "https://api.github.com",
        GITHUB_CLIENT_ID: clientId,
        GITHUB_CLIENT_SECRET: clientSecret,
        GITHUB_LOGIN_URL: "https://github.com",
      },
    },
    Runtime: "nodejs18.x",
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

  expect(Code.fromDockerBuild).toHaveBeenCalledWith(expect.any(String), {
    file: "Dockerfile",
    buildArgs: {
      GIT_URL: "https://github.com/christokur/github-cognito-openid-wrapper",
      GIT_BRANCH: "master",
    },
  });
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

  expect(Code.fromDockerBuild).toHaveBeenCalledWith(expect.any(String), {
    file: "Dockerfile",
    buildArgs: {
      GIT_URL: customGitUrl,
      GIT_BRANCH: customGitBranch,
    },
  });
});
