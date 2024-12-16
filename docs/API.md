# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### UserPoolIdentityProviderGithub <a name="UserPoolIdentityProviderGithub" id="cdk-cognito-userpool-identity-provider-github.UserPoolIdentityProviderGithub"></a>

GitHub OpenID Connect Wrapper for Cognito.

*Example*

```typescript
new UserPoolIdentityProviderGithub(this, 'UserPoolIdentityProviderGithub', {
  userPool: new UserPool(stack, 'UserPool'),
  clientId: 'myClientId',
  clientSecret: 'myClientSecret',
  cognitoHostedUiDomain: 'https://auth.domain.com',
});
```


#### Initializers <a name="Initializers" id="cdk-cognito-userpool-identity-provider-github.UserPoolIdentityProviderGithub.Initializer"></a>

```typescript
import { UserPoolIdentityProviderGithub } from 'cdk-cognito-userpool-identity-provider-github'

new UserPoolIdentityProviderGithub(scope: Construct, id: string, props: IUserPoolIdentityProviderGithubProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.UserPoolIdentityProviderGithub.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.UserPoolIdentityProviderGithub.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.UserPoolIdentityProviderGithub.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps">IUserPoolIdentityProviderGithubProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-cognito-userpool-identity-provider-github.UserPoolIdentityProviderGithub.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-cognito-userpool-identity-provider-github.UserPoolIdentityProviderGithub.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-cognito-userpool-identity-provider-github.UserPoolIdentityProviderGithub.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps">IUserPoolIdentityProviderGithubProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.UserPoolIdentityProviderGithub.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-cognito-userpool-identity-provider-github.UserPoolIdentityProviderGithub.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.UserPoolIdentityProviderGithub.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-cognito-userpool-identity-provider-github.UserPoolIdentityProviderGithub.isConstruct"></a>

```typescript
import { UserPoolIdentityProviderGithub } from 'cdk-cognito-userpool-identity-provider-github'

UserPoolIdentityProviderGithub.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-cognito-userpool-identity-provider-github.UserPoolIdentityProviderGithub.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.UserPoolIdentityProviderGithub.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.UserPoolIdentityProviderGithub.property.apiUrl">apiUrl</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.UserPoolIdentityProviderGithub.property.domainName">domainName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.UserPoolIdentityProviderGithub.property.userPoolIdentityProvider">userPoolIdentityProvider</a></code> | <code>aws-cdk-lib.aws_cognito.CfnUserPoolIdentityProvider</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-cognito-userpool-identity-provider-github.UserPoolIdentityProviderGithub.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `apiUrl`<sup>Required</sup> <a name="apiUrl" id="cdk-cognito-userpool-identity-provider-github.UserPoolIdentityProviderGithub.property.apiUrl"></a>

```typescript
public readonly apiUrl: string;
```

- *Type:* string

---

##### `domainName`<sup>Required</sup> <a name="domainName" id="cdk-cognito-userpool-identity-provider-github.UserPoolIdentityProviderGithub.property.domainName"></a>

```typescript
public readonly domainName: string;
```

- *Type:* string

---

##### `userPoolIdentityProvider`<sup>Optional</sup> <a name="userPoolIdentityProvider" id="cdk-cognito-userpool-identity-provider-github.UserPoolIdentityProviderGithub.property.userPoolIdentityProvider"></a>

```typescript
public readonly userPoolIdentityProvider: CfnUserPoolIdentityProvider;
```

- *Type:* aws-cdk-lib.aws_cognito.CfnUserPoolIdentityProvider

---


## Structs <a name="Structs" id="Structs"></a>

### ApiGatewayOptions <a name="ApiGatewayOptions" id="cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions"></a>

Configuration options for the API Gateway.

#### Initializer <a name="Initializer" id="cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.Initializer"></a>

```typescript
import { ApiGatewayOptions } from 'cdk-cognito-userpool-identity-provider-github'

const apiGatewayOptions: ApiGatewayOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.cloudWatchRole">cloudWatchRole</a></code> | <code>boolean</code> | Enable CloudWatch role creation for API Gateway logging (default: true). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.dataTraceEnabled">dataTraceEnabled</a></code> | <code>boolean</code> | Enable request/response tracing in API Gateway logs (default: true). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.description">description</a></code> | <code>string</code> | Custom API description (default: "GitHub OIDC Identity Provider API"). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.loggingEnabled">loggingEnabled</a></code> | <code>boolean</code> | Enable CloudWatch logging (default: true). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.loggingLevel">loggingLevel</a></code> | <code>aws-cdk-lib.aws_apigateway.MethodLoggingLevel</code> | CloudWatch logging level for API Gateway (default: INFO). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.logRetentionDays">logRetentionDays</a></code> | <code>number</code> | Log retention days for API Gateway CloudWatch logs (default: 30). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.methodSettings">methodSettings</a></code> | <code>{[ key: string ]: any}[]</code> | Method settings for API Gateway stage. |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.metricsEnabled">metricsEnabled</a></code> | <code>boolean</code> | Enable CloudWatch metrics for API Gateway (default: true). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.stageOptions">stageOptions</a></code> | <code>{[ key: string ]: any}</code> | Additional stage options for API Gateway deployment stage. |

---

##### `cloudWatchRole`<sup>Optional</sup> <a name="cloudWatchRole" id="cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.cloudWatchRole"></a>

```typescript
public readonly cloudWatchRole: boolean;
```

- *Type:* boolean

Enable CloudWatch role creation for API Gateway logging (default: true).

When true, creates an IAM role allowing API Gateway to write logs.

---

##### `dataTraceEnabled`<sup>Optional</sup> <a name="dataTraceEnabled" id="cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.dataTraceEnabled"></a>

```typescript
public readonly dataTraceEnabled: boolean;
```

- *Type:* boolean

Enable request/response tracing in API Gateway logs (default: true).

When enabled, API Gateway logs the full request/response bodies.

---

##### `description`<sup>Optional</sup> <a name="description" id="cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

Custom API description (default: "GitHub OIDC Identity Provider API").

Appears in API Gateway console and exports.

---

##### `loggingEnabled`<sup>Optional</sup> <a name="loggingEnabled" id="cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.loggingEnabled"></a>

```typescript
public readonly loggingEnabled: boolean;
```

- *Type:* boolean

Enable CloudWatch logging (default: true).

---

##### `loggingLevel`<sup>Optional</sup> <a name="loggingLevel" id="cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.loggingLevel"></a>

```typescript
public readonly loggingLevel: MethodLoggingLevel;
```

- *Type:* aws-cdk-lib.aws_apigateway.MethodLoggingLevel

CloudWatch logging level for API Gateway (default: INFO).

Available levels: ERROR, INFO, OFF

---

##### `logRetentionDays`<sup>Optional</sup> <a name="logRetentionDays" id="cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.logRetentionDays"></a>

```typescript
public readonly logRetentionDays: number;
```

- *Type:* number

Log retention days for API Gateway CloudWatch logs (default: 30).

Automatically deletes logs older than specified days.
Use aws-cdk-lib/aws-logs.RetentionDays enum for valid values.

---

##### `methodSettings`<sup>Optional</sup> <a name="methodSettings" id="cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.methodSettings"></a>

```typescript
public readonly methodSettings: {[ key: string ]: any}[];
```

- *Type:* {[ key: string ]: any}[]

Method settings for API Gateway stage.

Override specific method settings like caching or throttling.

---

##### `metricsEnabled`<sup>Optional</sup> <a name="metricsEnabled" id="cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.metricsEnabled"></a>

```typescript
public readonly metricsEnabled: boolean;
```

- *Type:* boolean

Enable CloudWatch metrics for API Gateway (default: true).

Metrics include latency, count, and error rates.

---

##### `stageOptions`<sup>Optional</sup> <a name="stageOptions" id="cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.stageOptions"></a>

```typescript
public readonly stageOptions: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

Additional stage options for API Gateway deployment stage.

Configure caching, throttling, and other stage-level settings.

---


## Protocols <a name="Protocols" id="Protocols"></a>

### IUserPoolIdentityProviderGithubProps <a name="IUserPoolIdentityProviderGithubProps" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps"></a>

- *Implemented By:* <a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps">IUserPoolIdentityProviderGithubProps</a>

Properties for configuring the GitHub Identity Provider for AWS Cognito.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.includeSourceMaps">includeSourceMaps</a></code> | <code>boolean</code> | Include source maps in Lambda assets for better debugging in CloudWatch Logs. |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.lambdaLogRetentionDays">lambdaLogRetentionDays</a></code> | <code>number</code> | Log retention days for Lambda function CloudWatch logs (default: 30). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.clientId">clientId</a></code> | <code>string</code> | The client ID from your GitHub OAuth application. |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.clientSecret">clientSecret</a></code> | <code>string</code> | The client secret from your GitHub OAuth application. |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.cognitoHostedUiDomain">cognitoHostedUiDomain</a></code> | <code>string</code> | The domain name for your Cognito hosted UI. |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.userPool">userPool</a></code> | <code>aws-cdk-lib.aws_cognito.UserPool</code> | The Cognito User Pool to attach the identity provider to. |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.apiDomainName">apiDomainName</a></code> | <code>string</code> | Custom domain name for the API Gateway endpoint (optional). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.apiOptions">apiOptions</a></code> | <code><a href="#cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions">ApiGatewayOptions</a></code> | API Gateway configuration options. |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.createUserPoolIdentityProvider">createUserPoolIdentityProvider</a></code> | <code>boolean</code> | Whether to create the Cognito User Pool Identity Provider (default: true). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.gitBranch">gitBranch</a></code> | <code>string</code> | Git branch to use from the wrapper repository (optional). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.gitUrl">gitUrl</a></code> | <code>string</code> | Custom Git repository URL for the GitHub wrapper (optional). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.hostedZone">hostedZone</a></code> | <code>aws-cdk-lib.aws_route53.IHostedZone</code> | Route 53 hosted zone for the custom domain (optional). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.version">version</a></code> | <code>string</code> | Version string for the wrapper package (optional). |

---

##### `includeSourceMaps`<sup>Optional</sup> <a name="includeSourceMaps" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.includeSourceMaps"></a>

```typescript
public readonly includeSourceMaps: boolean;
```

- *Type:* boolean
- *Default:* false

Include source maps in Lambda assets for better debugging in CloudWatch Logs.

When enabled, this will increase the Lambda deployment package size.

---

##### `lambdaLogRetentionDays`<sup>Optional</sup> <a name="lambdaLogRetentionDays" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.lambdaLogRetentionDays"></a>

```typescript
public readonly lambdaLogRetentionDays: number;
```

- *Type:* number

Log retention days for Lambda function CloudWatch logs (default: 30).

Automatically deletes logs older than specified days.
Use aws-cdk-lib/aws-logs.RetentionDays enum for valid values.

---

##### `clientId`<sup>Required</sup> <a name="clientId" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.clientId"></a>

```typescript
public readonly clientId: string;
```

- *Type:* string

The client ID from your GitHub OAuth application.

Obtain this from GitHub Developer Settings.

---

##### `clientSecret`<sup>Required</sup> <a name="clientSecret" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.clientSecret"></a>

```typescript
public readonly clientSecret: string;
```

- *Type:* string

The client secret from your GitHub OAuth application.

Obtain this from GitHub Developer Settings.
Keep this value secure and never commit it to source control.

---

##### `cognitoHostedUiDomain`<sup>Required</sup> <a name="cognitoHostedUiDomain" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.cognitoHostedUiDomain"></a>

```typescript
public readonly cognitoHostedUiDomain: string;
```

- *Type:* string

The domain name for your Cognito hosted UI.

Format: https://your-domain-prefix.auth.region.amazoncognito.com

---

##### `userPool`<sup>Required</sup> <a name="userPool" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.userPool"></a>

```typescript
public readonly userPool: UserPool;
```

- *Type:* aws-cdk-lib.aws_cognito.UserPool

The Cognito User Pool to attach the identity provider to.

Must be an existing User Pool instance.

---

##### `apiDomainName`<sup>Optional</sup> <a name="apiDomainName" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.apiDomainName"></a>

```typescript
public readonly apiDomainName: string;
```

- *Type:* string

Custom domain name for the API Gateway endpoint (optional).

Must be a valid domain name that you control.
Requires hostedZone to be specified.

---

##### `apiOptions`<sup>Optional</sup> <a name="apiOptions" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.apiOptions"></a>

```typescript
public readonly apiOptions: ApiGatewayOptions;
```

- *Type:* <a href="#cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions">ApiGatewayOptions</a>

API Gateway configuration options.

Configure logging, metrics, custom domain, and other API settings.

---

##### `createUserPoolIdentityProvider`<sup>Optional</sup> <a name="createUserPoolIdentityProvider" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.createUserPoolIdentityProvider"></a>

```typescript
public readonly createUserPoolIdentityProvider: boolean;
```

- *Type:* boolean

Whether to create the Cognito User Pool Identity Provider (default: true).

Set to false to skip identity provider creation.

---

##### `gitBranch`<sup>Optional</sup> <a name="gitBranch" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.gitBranch"></a>

```typescript
public readonly gitBranch: string;
```

- *Type:* string

Git branch to use from the wrapper repository (optional).

Useful for testing specific versions or features.
Default: Uses the main/master branch.

---

##### `gitUrl`<sup>Optional</sup> <a name="gitUrl" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.gitUrl"></a>

```typescript
public readonly gitUrl: string;
```

- *Type:* string

Custom Git repository URL for the GitHub wrapper (optional).

Use this to specify a fork or alternative implementation.
Default: Uses the standard github-cognito-openid-wrapper package.

---

##### `hostedZone`<sup>Optional</sup> <a name="hostedZone" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.hostedZone"></a>

```typescript
public readonly hostedZone: IHostedZone;
```

- *Type:* aws-cdk-lib.aws_route53.IHostedZone

Route 53 hosted zone for the custom domain (optional).

Required if apiDomainName is specified.
Must be an existing hosted zone in your AWS account.

---

##### `version`<sup>Optional</sup> <a name="version" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string

Version string for the wrapper package (optional).

Useful for tracking deployments or specific wrapper versions.

---

