import { awscdk } from 'projen';
import { NodePackageManager } from 'projen/lib/javascript';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Christo De Lange',
  authorAddress: 'christo.delange@sands.com',
  cdkVersion: '2.100.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-user-pool-identity-provider-github',
  description: 'A CDK construct that adds GitHub as an identity provider to a Cognito user pool',
  repositoryUrl: 'git@github.com:christokur/cdk-user-pool-identity-provider-github.git',
  license: 'Apache-2.0',
  keywords: ['cdk'],
  projenrcTs: true,
  packageManager: NodePackageManager.NPM,
  deps: [
    'aws-cdk-lib@2.100.0',
    'constructs@10.0.0'
  ],
  peerDeps: [
    'aws-cdk-lib@2.100.0',
    'constructs@10.0.0'
  ],
  devDeps: [
    '@types/jest@^29',
    '@types/node@^16 <= 16.18.78',
    '@typescript-eslint/eslint-plugin@^7',
    '@typescript-eslint/parser@^7',
    'commit-and-tag-version@^12',
    'eslint@^8',
    'eslint-import-resolver-node@^0.3.6',
    'eslint-import-resolver-typescript@^2.5.0',
    'eslint-plugin-import@^2.24.2',
    'jest@^29',
    'jest-junit@^16',
    'jsii@^5.0.0',
    'jsii-diff@^1.103.1',
    'jsii-docgen@^10.5.0',
    'jsii-pacmak@^1.103.1',
    'jsii-rosetta@^5.0.0',
    'json-schema@^0.4.0',
    'projen@^0.88.0',
    'ts-jest@^29',
    'ts-node@^10.9.2',
    'typescript@^5.1.6',
    'glob@^10.0.0'
  ],
  bundledDeps: [],
});

// Add overrides to package.json
project.package.addField('overrides', {
  '@types/babel__traverse': '7.18.2',
  '@types/prettier': '2.6.0',
  'glob': '^10.0.0',
});

// Explicitly set peer dependency version for constructs
project.package.addPeerDeps('constructs@10.0.0');

project.synth();
