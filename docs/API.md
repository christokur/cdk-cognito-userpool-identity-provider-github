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

#### Initializer <a name="Initializer" id="cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.Initializer"></a>

```typescript
import { ApiGatewayOptions } from 'cdk-cognito-userpool-identity-provider-github'

const apiGatewayOptions: ApiGatewayOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.cloudWatchRole">cloudWatchRole</a></code> | <code>boolean</code> | Enable CloudWatch role creation (default: true). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.dataTraceEnabled">dataTraceEnabled</a></code> | <code>boolean</code> | Enable request/response tracing (default: true). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.description">description</a></code> | <code>string</code> | API description (default: "GitHub OIDC Identity Provider API"). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.loggingEnabled">loggingEnabled</a></code> | <code>boolean</code> | Enable CloudWatch logging (default: true). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.loggingLevel">loggingLevel</a></code> | <code>aws-cdk-lib.aws_apigateway.MethodLoggingLevel</code> | CloudWatch logging level (default: INFO). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.logRetentionDays">logRetentionDays</a></code> | <code>number</code> | Log retention days for API Gateway logs (default: 30). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.methodSettings">methodSettings</a></code> | <code>{[ key: string ]: any}[]</code> | Method settings for API Gateway stage. |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.metricsEnabled">metricsEnabled</a></code> | <code>boolean</code> | Enable CloudWatch metrics (default: true). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.stageOptions">stageOptions</a></code> | <code>{[ key: string ]: any}</code> | Additional stage options. |

---

##### `cloudWatchRole`<sup>Optional</sup> <a name="cloudWatchRole" id="cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.cloudWatchRole"></a>

```typescript
public readonly cloudWatchRole: boolean;
```

- *Type:* boolean

Enable CloudWatch role creation (default: true).

---

##### `dataTraceEnabled`<sup>Optional</sup> <a name="dataTraceEnabled" id="cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.dataTraceEnabled"></a>

```typescript
public readonly dataTraceEnabled: boolean;
```

- *Type:* boolean

Enable request/response tracing (default: true).

---

##### `description`<sup>Optional</sup> <a name="description" id="cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.description"></a>

```typescript
public readonly description: string;
```

- *Type:* string

API description (default: "GitHub OIDC Identity Provider API").

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

CloudWatch logging level (default: INFO).

---

##### `logRetentionDays`<sup>Optional</sup> <a name="logRetentionDays" id="cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.logRetentionDays"></a>

```typescript
public readonly logRetentionDays: number;
```

- *Type:* number

Log retention days for API Gateway logs (default: 30).

---

##### `methodSettings`<sup>Optional</sup> <a name="methodSettings" id="cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.methodSettings"></a>

```typescript
public readonly methodSettings: {[ key: string ]: any}[];
```

- *Type:* {[ key: string ]: any}[]

Method settings for API Gateway stage.

---

##### `metricsEnabled`<sup>Optional</sup> <a name="metricsEnabled" id="cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.metricsEnabled"></a>

```typescript
public readonly metricsEnabled: boolean;
```

- *Type:* boolean

Enable CloudWatch metrics (default: true).

---

##### `stageOptions`<sup>Optional</sup> <a name="stageOptions" id="cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions.property.stageOptions"></a>

```typescript
public readonly stageOptions: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

Additional stage options.

---


## Protocols <a name="Protocols" id="Protocols"></a>

### IUserPoolIdentityProviderGithubProps <a name="IUserPoolIdentityProviderGithubProps" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps"></a>

- *Implemented By:* <a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps">IUserPoolIdentityProviderGithubProps</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.lambdaLogRetentionDays">lambdaLogRetentionDays</a></code> | <code>number</code> | Log retention days for Lambda function logs (default: 30). |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.clientId">clientId</a></code> | <code>string</code> | The client id recognized by Github APIs. |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.clientSecret">clientSecret</a></code> | <code>string</code> | The client secret to be accompanied with clientId for Github APIs to authenticate the client. |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.cognitoHostedUiDomain">cognitoHostedUiDomain</a></code> | <code>string</code> | The Cognito hosted UI domain. |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.userPool">userPool</a></code> | <code>aws-cdk-lib.aws_cognito.UserPool</code> | The user pool. |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.apiDomainName">apiDomainName</a></code> | <code>string</code> | The custom domain name for the API Gateway. |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.apiOptions">apiOptions</a></code> | <code><a href="#cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions">ApiGatewayOptions</a></code> | API Gateway configuration options. |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.createUserPoolIdentityProvider">createUserPoolIdentityProvider</a></code> | <code>boolean</code> | Create the user pool. |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.gitBranch">gitBranch</a></code> | <code>string</code> | The branch of the Git repository to clone for the GitHub wrapper. |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.gitUrl">gitUrl</a></code> | <code>string</code> | The URL of the Git repository for the GitHub wrapper. |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.hostedZone">hostedZone</a></code> | <code>aws-cdk-lib.aws_route53.IHostedZone</code> | The hosted zone for the custom domain. |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.version">version</a></code> | <code>string</code> | The version string. |

---

##### `lambdaLogRetentionDays`<sup>Optional</sup> <a name="lambdaLogRetentionDays" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.lambdaLogRetentionDays"></a>

```typescript
public readonly lambdaLogRetentionDays: number;
```

- *Type:* number

Log retention days for Lambda function logs (default: 30).

---

##### `clientId`<sup>Required</sup> <a name="clientId" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.clientId"></a>

```typescript
public readonly clientId: string;
```

- *Type:* string

The client id recognized by Github APIs.

---

##### `clientSecret`<sup>Required</sup> <a name="clientSecret" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.clientSecret"></a>

```typescript
public readonly clientSecret: string;
```

- *Type:* string

The client secret to be accompanied with clientId for Github APIs to authenticate the client.

---

##### `cognitoHostedUiDomain`<sup>Required</sup> <a name="cognitoHostedUiDomain" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.cognitoHostedUiDomain"></a>

```typescript
public readonly cognitoHostedUiDomain: string;
```

- *Type:* string

The Cognito hosted UI domain.

---

##### `userPool`<sup>Required</sup> <a name="userPool" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.userPool"></a>

```typescript
public readonly userPool: UserPool;
```

- *Type:* aws-cdk-lib.aws_cognito.UserPool

The user pool.

---

##### `apiDomainName`<sup>Optional</sup> <a name="apiDomainName" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.apiDomainName"></a>

```typescript
public readonly apiDomainName: string;
```

- *Type:* string

The custom domain name for the API Gateway.

---

##### `apiOptions`<sup>Optional</sup> <a name="apiOptions" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.apiOptions"></a>

```typescript
public readonly apiOptions: ApiGatewayOptions;
```

- *Type:* <a href="#cdk-cognito-userpool-identity-provider-github.ApiGatewayOptions">ApiGatewayOptions</a>

API Gateway configuration options.

---

##### `createUserPoolIdentityProvider`<sup>Optional</sup> <a name="createUserPoolIdentityProvider" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.createUserPoolIdentityProvider"></a>

```typescript
public readonly createUserPoolIdentityProvider: boolean;
```

- *Type:* boolean

Create the user pool.

---

##### `gitBranch`<sup>Optional</sup> <a name="gitBranch" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.gitBranch"></a>

```typescript
public readonly gitBranch: string;
```

- *Type:* string

The branch of the Git repository to clone for the GitHub wrapper.

---

##### `gitUrl`<sup>Optional</sup> <a name="gitUrl" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.gitUrl"></a>

```typescript
public readonly gitUrl: string;
```

- *Type:* string

The URL of the Git repository for the GitHub wrapper.

---

##### `hostedZone`<sup>Optional</sup> <a name="hostedZone" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.hostedZone"></a>

```typescript
public readonly hostedZone: IHostedZone;
```

- *Type:* aws-cdk-lib.aws_route53.IHostedZone

The hosted zone for the custom domain.

---

##### `version`<sup>Optional</sup> <a name="version" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.version"></a>

```typescript
public readonly version: string;
```

- *Type:* string

The version string.

---

