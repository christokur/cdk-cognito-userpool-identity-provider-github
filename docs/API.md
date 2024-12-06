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

##### `isConstruct` <a name="isConstruct" id="cdk-cognito-userpool-identity-provider-github.UserPoolIdentityProviderGithub.isConstruct"></a>

```typescript
import { UserPoolIdentityProviderGithub } from 'cdk-cognito-userpool-identity-provider-github'

UserPoolIdentityProviderGithub.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="cdk-cognito-userpool-identity-provider-github.UserPoolIdentityProviderGithub.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.UserPoolIdentityProviderGithub.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.UserPoolIdentityProviderGithub.property.userPoolIdentityProvider">userPoolIdentityProvider</a></code> | <code>aws-cdk-lib.aws_cognito.CfnUserPoolIdentityProvider</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-cognito-userpool-identity-provider-github.UserPoolIdentityProviderGithub.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `userPoolIdentityProvider`<sup>Required</sup> <a name="userPoolIdentityProvider" id="cdk-cognito-userpool-identity-provider-github.UserPoolIdentityProviderGithub.property.userPoolIdentityProvider"></a>

```typescript
public readonly userPoolIdentityProvider: CfnUserPoolIdentityProvider;
```

- *Type:* aws-cdk-lib.aws_cognito.CfnUserPoolIdentityProvider

---




## Protocols <a name="Protocols" id="Protocols"></a>

### IUserPoolIdentityProviderGithubProps <a name="IUserPoolIdentityProviderGithubProps" id="cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps"></a>

- *Implemented By:* <a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps">IUserPoolIdentityProviderGithubProps</a>


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.clientId">clientId</a></code> | <code>string</code> | The client id recognized by Github APIs. |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.clientSecret">clientSecret</a></code> | <code>string</code> | The client secret to be accompanied with clientId for Github APIs to authenticate the client. |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.cognitoHostedUiDomain">cognitoHostedUiDomain</a></code> | <code>string</code> | The Cognito hosted UI domain. |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.userPool">userPool</a></code> | <code>aws-cdk-lib.aws_cognito.UserPool</code> | The user pool. |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.gitBranch">gitBranch</a></code> | <code>string</code> | The branch of the Git repository to clone for the GitHub wrapper. |
| <code><a href="#cdk-cognito-userpool-identity-provider-github.IUserPoolIdentityProviderGithubProps.property.gitUrl">gitUrl</a></code> | <code>string</code> | The URL of the Git repository for the GitHub wrapper. |

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

