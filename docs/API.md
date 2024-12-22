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
| <code><a href="#cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.binaryMediaTypes">binaryMediaTypes</a></code> | <code>string[]</code> | Binary media types supported by the API Gateway (e.g., ['image/x-icon']). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.cloudWatchRole">cloudWatchRole</a></code> | <code>boolean</code> | Enable CloudWatch role creation for API Gateway logging (default: true). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.dataTraceEnabled">dataTraceEnabled</a></code> | <code>boolean</code> | Enable request/response tracing in API Gateway logs (default: true). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.description">description</a></code> | <code>string</code> | Custom description for the API Gateway. |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.loggingEnabled">loggingEnabled</a></code> | <code>boolean</code> | Enable CloudWatch logging (default: true). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.loggingLevel">loggingLevel</a></code> | <code>aws-cdk-lib.aws_apigateway.MethodLoggingLevel</code> | CloudWatch logging level for API Gateway (default: INFO). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.logRetentionDays">logRetentionDays</a></code> | <code>number</code> | Number of days to retain API Gateway logs (default: 30). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.methodSettings">methodSettings</a></code> | <code><a href="#cdk-cognito-userpool-identity-provider-github.MethodSettings">MethodSettings</a>[]</code> | Method-level settings for API Gateway. |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.metricsEnabled">metricsEnabled</a></code> | <code>boolean</code> | Enable CloudWatch metrics for API Gateway (default: true). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.stageOptions">stageOptions</a></code> | <code>{[ key: string ]: any}</code> | Additional stage options for API Gateway deployment. |

---

##### `binaryMediaTypes`<sup>Optional</sup> <a name="binaryMediaTypes" id="cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.binaryMediaTypes"></a>

```typescript
public readonly binaryMediaTypes: string[];
```

- *Type:* string[]

Binary media types supported by the API Gateway (e.g., ['image/x-icon']).

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

Custom description for the API Gateway.

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

Number of days to retain API Gateway logs (default: 30).

---

##### `methodSettings`<sup>Optional</sup> <a name="methodSettings" id="cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.methodSettings"></a>

```typescript
public readonly methodSettings: MethodSettings[];
```

- *Type:* <a href="#cdk-cognito-userpool-identity-provider-github.MethodSettings">MethodSettings</a>[]

Method-level settings for API Gateway.

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

Additional stage options for API Gateway deployment.

---

### MethodSettings <a name="MethodSettings" id="cdk-cognito-userpool-identity-provider-github.MethodSettings"></a>

Method settings for the REST API.

#### Initializer <a name="Initializer" id="cdk-cognito-userpool-identity-provider-github.MethodSettings.Initializer"></a>

```typescript
import { MethodSettings } from 'cdk-cognito-userpool-identity-provider-github'

const methodSettings: MethodSettings = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.MethodSettings.property.httpMethod">httpMethod</a></code> | <code>string</code> | The HTTP method. |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.MethodSettings.property.resourcePath">resourcePath</a></code> | <code>string</code> | The resource path. |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.MethodSettings.property.metricsEnabled">metricsEnabled</a></code> | <code>boolean</code> | Whether metrics are enabled. |

---

##### `httpMethod`<sup>Required</sup> <a name="httpMethod" id="cdk-cognito-userpool-identity-provider-github.MethodSettings.property.httpMethod"></a>

```typescript
public readonly httpMethod: string;
```

- *Type:* string

The HTTP method.

---

##### `resourcePath`<sup>Required</sup> <a name="resourcePath" id="cdk-cognito-userpool-identity-provider-github.MethodSettings.property.resourcePath"></a>

```typescript
public readonly resourcePath: string;
```

- *Type:* string

The resource path.

---

##### `metricsEnabled`<sup>Optional</sup> <a name="metricsEnabled" id="cdk-cognito-userpool-identity-provider-github.MethodSettings.property.metricsEnabled"></a>

```typescript
public readonly metricsEnabled: boolean;
```

- *Type:* boolean

Whether metrics are enabled.

---


## Protocols <a name="Protocols" id="Protocols"></a>

### IUserPoolIdentityProviderGithubProps <a name="IUserPoolIdentityProviderGithubProps" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps"></a>

- *Implemented By:* <a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps">IUserPoolIdentityProviderGithubProps</a>

Properties for configuring the GitHub Identity Provider for AWS Cognito.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.clientId">clientId</a></code> | <code>string</code> | GitHub OAuth App Client ID. |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.clientSecret">clientSecret</a></code> | <code>string</code> | GitHub OAuth App Client Secret. |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.cognitoHostedUiDomain">cognitoHostedUiDomain</a></code> | <code>string</code> | Domain name for the Cognito Hosted UI. |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.userPool">userPool</a></code> | <code>aws-cdk-lib.aws_cognito.UserPool</code> | The Cognito User Pool to associate with the GitHub Identity Provider. |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.apiDomainName">apiDomainName</a></code> | <code>string</code> | Custom domain name for the API (optional). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.apiOptions">apiOptions</a></code> | <code><a href="#cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions">ApiGatewayOptions</a></code> | API Gateway configuration options (optional). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.consumer">consumer</a></code> | <code>string</code> | Consumer identifier (optional). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.createUserPoolIdentityProvider">createUserPoolIdentityProvider</a></code> | <code>boolean</code> | Whether to create the Cognito User Pool Identity Provider (default: true). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.gitBranch">gitBranch</a></code> | <code>string</code> | Git branch to use (optional). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.gitUrl">gitUrl</a></code> | <code>string</code> | GitHub Enterprise URL (optional). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.hostedZone">hostedZone</a></code> | <code>aws-cdk-lib.aws_route53.IHostedZone</code> | Route53 hosted zone for the API domain (optional). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.includeSourceMaps">includeSourceMaps</a></code> | <code>boolean</code> | Whether to include source maps for debugging (optional). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.lambdaLogRetentionDays">lambdaLogRetentionDays</a></code> | <code>number</code> | Number of days to retain Lambda logs (optional). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.logLevel">logLevel</a></code> | <code>string</code> | Log level for the Lambda function (optional). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.tracingEnabled">tracingEnabled</a></code> | <code>boolean</code> | Whether to enable tracing (optional). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.version">version</a></code> | <code>string</code> | Version number (optional). |

---

##### `clientId`<sup>Required</sup> <a name="clientId" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.clientId"></a>

```typescript
public readonly clientId: string;
```

- *Type:* string

GitHub OAuth App Client ID.

---

##### `clientSecret`<sup>Required</sup> <a name="clientSecret" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.clientSecret"></a>

```typescript
public readonly clientSecret: string;
```

- *Type:* string

GitHub OAuth App Client Secret.

---

##### `cognitoHostedUiDomain`<sup>Required</sup> <a name="cognitoHostedUiDomain" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.cognitoHostedUiDomain"></a>

```typescript
public readonly cognitoHostedUiDomain: string;
```

- *Type:* string

Domain name for the Cognito Hosted UI.

---

##### `userPool`<sup>Required</sup> <a name="userPool" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.userPool"></a>

```typescript
public readonly userPool: UserPool;
```

- *Type:* aws-cdk-lib.aws_cognito.UserPool

The Cognito User Pool to associate with the GitHub Identity Provider.

---

##### `apiDomainName`<sup>Optional</sup> <a name="apiDomainName" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.apiDomainName"></a>

```typescript
public readonly apiDomainName: string;
```

- *Type:* string

Custom domain name for the API (optional).

---

##### `apiOptions`<sup>Optional</sup> <a name="apiOptions" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.apiOptions"></a>

```typescript
public readonly apiOptions: ApiGatewayOptions;
```

- *Type:* <a href="#cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions">ApiGatewayOptions</a>

API Gateway configuration options (optional).

---

##### `consumer`<sup>Optional</sup> <a name="consumer" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.consumer"></a>

```typescript
public readonly consumer: string;
```

- *Type:* string

Consumer identifier (optional).

---

##### `createUserPoolIdentityProvider`<sup>Optional</sup> <a name="createUserPoolIdentityProvider" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.createUserPoolIdentityProvider"></a>

```typescript
public readonly createUserPoolIdentityProvider: boolean;
```

- *Type:* boolean

Whether to create the Cognito User Pool Identity Provider (default: true).

---

##### `gitBranch`<sup>Optional</sup> <a name="gitBranch" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.gitBranch"></a>

```typescript
public readonly gitBranch: string;
```

- *Type:* string

Git branch to use (optional).

---

##### `gitUrl`<sup>Optional</sup> <a name="gitUrl" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.gitUrl"></a>

```typescript
public readonly gitUrl: string;
```

- *Type:* string

GitHub Enterprise URL (optional).

---

##### `hostedZone`<sup>Optional</sup> <a name="hostedZone" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.hostedZone"></a>

```typescript
public readonly hostedZone: IHostedZone;
```

- *Type:* aws-cdk-lib.aws_route53.IHostedZone

Route53 hosted zone for the API domain (optional).

---

##### `includeSourceMaps`<sup>Optional</sup> <a name="includeSourceMaps" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.includeSourceMaps"></a>

```typescript
public readonly includeSourceMaps: boolean;
```

- *Type:* boolean

Whether to include source maps for debugging (optional).

---

##### `lambdaLogRetentionDays`<sup>Optional</sup> <a name="lambdaLogRetentionDays" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.lambdaLogRetentionDays"></a>

```typescript
public readonly lambdaLogRetentionDays: number;
```

- *Type:* number

Number of days to retain Lambda logs (optional).

---

##### `logLevel`<sup>Optional</sup> <a name="logLevel" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.logLevel"></a>

```typescript
public readonly logLevel: string;
```

- *Type:* string

Log level for the Lambda function (optional).

---

##### `tracingEnabled`<sup>Optional</sup> <a name="tracingEnabled" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.tracingEnabled"></a>

```typescript
public readonly tracingEnabled: boolean;
```

- *Type:* boolean

Whether to enable tracing (optional).

---

##### `version`<sup>Optional</sup> <a name="version" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string

Version number (optional).

---

