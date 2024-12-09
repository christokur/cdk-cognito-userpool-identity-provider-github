# UserPoolIdentityProviderGithub CDK construct

Version: 2.3.4

This library bundles the [GitHub OpenID Connect Wrapper for Cognito](https://github.com/TimothyJones/github-cognito-openid-wrapper) as a CDK construct, instead of the original SAM implementation.

The goal behind is to make it as easy to use GitHub as an identity provider as officially supported identity providers. Under the hood, it creates additional resources (a REST API and 5 Lambda functions) to connect Cognito to GitHub.

## ⚠️ Project status

This project has been upgraded to use CDK v2 (version 2.100.0). However, please note that this repository is archived and not actively maintained. Use at your own risk.

If you decide to use this construct, be aware that:
- A new SSH key might be generated every time the Dockerfile is built, which could lead to a very short interruption of service during deployment.
- There are some known deprecation warnings related to testing dependencies. See [KNOWN_ISSUES.md](./KNOWN_ISSUES.md) for details.

## Install

### npm

```bash
npm install --save cdk-cognito-userpool-identity-provider-github
```

### Go, Maven, NuGet, PyPI

Other package managers aren't supported yet, but they could be easily. Let us know your needs by [opening an issue](https://github.com/scenario-labs/cdk-cognito-userpool-identity-provider-github/issues/new).

## Usage

This construct works in a similar way to [officially supported identity providers](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-cognito-readme.html#identity-providers).

See [API](./API.md) for a full reference.

### Basic setup

If you already have a user pool with a client and a hosted UI with a custom domain, then you can simply do:

```ts
import { UserPoolIdentityProviderGithub } from 'cdk-cognito-userpool-identity-provider-github';

new UserPoolIdentityProviderGithub(this, 'UserPoolIdentityProviderGithub', {
  userPool: myUserPool,
  clientId: 'myClientId',
  clientSecret: 'myClientSecret',
  cognitoHostedUiDomain: 'https://auth.domain.com',
});
```

### Full setup

The following snippet does the following:
- Create a user pool
- Configure the hosted UI with a custom domain
- Create a Github identity provider for the user pool
- Create a user pool client with Cognito and Github as identity providers

```ts
import { DnsValidatedCertificate } from '@aws-cdk/aws-certificatemanager';
import { UserPool } from '@aws-cdk/aws-cognito';
import { ARecord, RecordTarget } from '@aws-cdk/aws-route53';
import { UserPoolIdentityProviderGithub } from 'cdk-cognito-userpool-identity-provider-github';

// Parameters
const userPoolDomainName = 'https://auth.domain.com';
const callbackUrls = ['https://www.domain.com'];
const logoutUrls = ['https://www.domain.com'];
const githubClientId = 'githubClientId';
const githubClientSecret = 'githubClientSecret';

// User pool
const userPool = new UserPool(stack, 'UserPool');

// Hosted UI with custom domain
const userPoolDomain = userPool.addDomain('UserPoolDomain', {
  customDomain: {
    certificate: new DnsValidatedCertificate(this, 'Certificate', {
      domainName: userPoolDomainName,
      hostedZone: props.hostedZone,
      region: 'us-east-1', // Cloudfront only checks this region for certificates.
    }),
    domainName: userPoolDomainName,
  },
});
new ARecord(this, 'CustomDomainAliasRecord', {
  zone: props.hostedZone,
  recordName: userPoolDomainName,
  target: RecordTarget.fromAlias({
    bind: () => ({
      hostedZoneId: 'Z2FDTNDATAQYW2', // CloudFront Zone ID
      dnsName: userPoolDomain.cloudFrontEndpoint,
    }),
  }),
});

// Github identity provider
new UserPoolIdentityProviderGithub(this, 'UserPoolIdentityProviderGithub', {
  userPool,
  clientId: githubClientId,
  clientSecret: githubClientSecret,
  cognitoHostedUiDomain: userPoolDomainName,
});

// User pool client
const userPoolClient = userPool.addClient('UserPoolClient', {
  oAuth: {
    callbackUrls,
    logoutUrls,
  },
  supportedIdentityProviders: [
    cognito.UserPoolClientIdentityProvider.COGNITO,
    cognito.UserPoolClientIdentityProvider.custom('Github'),
  ],
});
userPoolClient.node.addDependency(userPoolIdentityProviderGithub);
```

## Contributing

This project uses the [projen](https://github.com/projen/projen) project generator. 

Please note that this project is no longer actively maintained.

## License

This code is distributed under MIT license, that you can read [here](./LICENSE).

It also redistributes code from [GitHub OpenID Connect Wrapper for Cognito](https://github.com/TimothyJones/github-cognito-openid-wrapper), distributed under BSD 3-Clause license, that you can read [here](https://github.com/TimothyJones/github-cognito-openid-wrapper/blob/master/LICENSE).
