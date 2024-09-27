const { AwsCdkConstructLibrary } = require('projen/lib/awscdk');
const { NodePackageManager, TypeScriptModuleResolution } = require('projen/lib/javascript');

const project = new AwsCdkConstructLibrary({
  author: 'Christo De Lange',
  authorAddress: 'sands@christodelange.com',
  cdkVersion: '2.100.0',
  defaultReleaseBranch: 'main',
  name: 'cdk-user-pool-identity-provider-github',
  description: 'A CDK construct that adds GitHub as an identity provider to a Cognito user pool',
  repositoryUrl: 'git@github.com:christokur/cdk-user-pool-identity-provider-github.git',
  license: 'Apache-2.0',
  keywords: ['cdk'],
  projenrcTs: true,
  packageManager: NodePackageManager.NPM,
  gitignore: ['/.aider*'],

  majorVersion: 2,
  minorVersion: 0,
  releaseToNpm: true,
  releaseWorkflow: true,

  // Node.js requirements
  minNodeVersion: '18.0.0',
  deps: [
    'aws-cdk-lib@2.100.0',
    'constructs@^10.0.5',
  ],
  peerDeps: [
    'aws-cdk-lib@2.100.0',
    'constructs@^10.0.5',
  ],
  devDeps: [
    '@types/node@^16',
    'eslint@^8',
    'eslint-import-resolver-node@^0.3.6',
    'eslint-import-resolver-typescript@^2.5.0',
    'eslint-plugin-import@^2.24.2',
    'jest-junit@^15',
    'jsii-diff@^1.103.1',
    'jsii-docgen@^11.0.0',
    'jsii-pacmak@^1.103.1',
    'json-schema@^0.4.0',
    'projen@^0.88.0',
    'ts-node@^10.9.2',
    '@types/jest@^29',
    'jest@^29',
    'ts-jest@^29.1.1',
    '@jest/globals@^29',
    '@typescript-eslint/eslint-plugin@^7',
    '@typescript-eslint/parser@^7',
    'glob@^8.1.0',
    'glob-promise@^6.0.2',
  ],
  bundledDeps: [],
  jest: true,
  jestOptions: {
    jestConfig: {
      verbose: true,
      testEnvironment: 'node',
      testMatch: ['**/*.test.ts'],
      preset: 'ts-jest',
      globals: {
        'ts-jest': {
          tsconfig: 'tsconfig.dev.json',
          diagnostics: {
            ignoreCodes: [151001],
          },
        },
      },
    },
  },
  typescriptVersion: '~5.3.3',
  tsconfig: {
    compilerOptions: {
      target: 'ES2020',
      module: 'CommonJS',
      moduleResolution: TypeScriptModuleResolution.NODE,
      lib: ['es2020', 'dom'],
      declaration: true,
      strict: true,
      noImplicitAny: true,
      strictNullChecks: true,
      noImplicitThis: true,
      alwaysStrict: true,
      noUnusedLocals: false,
      noUnusedParameters: false,
      noImplicitReturns: true,
      noFallthroughCasesInSwitch: false,
      inlineSourceMap: true,
      inlineSources: true,
      experimentalDecorators: true,
      strictPropertyInitialization: false,
      typeRoots: ['./node_modules/@types'],
      esModuleInterop: true,
    },
  },
  eslint: true,
  eslintOptions: {
    dirs: ['src', 'test'],
    extensions: ['.ts', '.tsx'],
    lintProjenRc: false,
  },
});

// Remove "type": "module" from package.json as we're using CommonJS now
project.package.addField('type', undefined);

project.package.addField('overrides', {
  '@types/babel__traverse': '7.18.2',
  '@types/prettier': '2.6.0',
});

// Explicitly set jsii and jsii-rosetta versions
project.addDevDeps('jsii@~5.5.0', 'jsii-rosetta@~5.5.0');

project.tsconfig?.addInclude('test/**/*.ts');

project.addTask('test:debug', {
  exec: 'jest --verbose --runInBand',
});

project.addTask('clean', {
  exec: 'rm -fr node_modules dist coverage test-reports lib',
});

project.addTask('reinistall', {
  exec: 'rm -fr node_modules package-lock.json dist coverage test-reports lib',
});

project.addTask('publish', {
  exec: 'node scripts/npm-publish-codeartifact.js',
});

// The Dockerfile isn't interpreted by TypeScript
// We need to copy it manually
project.compileTask.exec('cp src/Dockerfile lib/');

// Add a custom compilation step
project.compileTask.reset('tsc && jsii --silence-warnings=reserved-word');

// Update the existing ESLint task
const eslintTask = project.tasks.tryFind('eslint');
if (eslintTask) {
  eslintTask.reset('eslint . --ext .ts,.tsx');
}

project.synth();
