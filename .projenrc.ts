import { execSync } from "child_process";
import { AwsCdkConstructLibrary } from "projen/lib/awscdk";
import { NodePackageManager } from "projen/lib/javascript";

// Add custom synthesis hooks
class CognitoGithubProviderProject extends AwsCdkConstructLibrary {
  constructor(options = {}) {
    super({
      author: "Christo De Lange",
      authorAddress: "sands@christodelange.com",
      cdkVersion: "2.171.1",
      defaultReleaseBranch: "main",
      name: "cdk-cognito-userpool-identity-provider-github",
      description:
        "A CDK construct that adds GitHub as an identity provider to a Cognito user pool",
      repositoryUrl:
        "git@github.com:christokur/cdk-cognito-userpool-identity-provider-github.git",
      license: "Apache-2.0",
      keywords: ["cdk"],
      projenrcTs: true,
      packageManager: NodePackageManager.NPM,
      gitignore: [
        "/.aider*",
        "/.jsii",
        "/dist",
        "/lib",
        "/.vscode",
        "/.idea",
        "/coverage",
        "/cdk.out",
        "/test-reports",
        "/node_modules",
        "/.DS_Store",
        "/.ai",
        "/env.txt",
        "/cmd.txt",
        "/errors.txt",
        "/ai",
        ".env",
        "!/tsconfig*",
        "src/.npmrc",
        ".yalc",
        "yalc*",
      ],
      jsiiReleaseVersion: "2.0.36",
      nextVersionCommand: "bump2version patch --allow-dirty",
      releaseToNpm: false,
      release: false,
      minNodeVersion: "18.0.0",
      jsiiVersion: "5.6.0",
      deps: [],
      bundledDeps: [
        "github-cognito-openid-wrapper@^1.6.12",
        "source-map-support",
      ],
      devDeps: [
        "projen@^0.91.0",
        "@jest/globals@^29.7.0",
        "@types/node@22.10.1",
        "jest-junit@16.0.0",
        "jsii-rosetta@5.6.0",
        "aws-cdk-lib@2.171.1",
        "constructs@10.4.2",
        "@types/node",
        "ts-node",
        "eslint@^8",
        "eslint-import-resolver-typescript@^3.5.5",
        "eslint-plugin-import@^2.27.5",
        "typescript@~5.6.3",
        "eslint-plugin-prettier",
        "eslint-config-prettier",
        "prettier",
      ],
      peerDependencyOptions: {
        pinnedDevDependency: true,
      },
      peerDeps: ["aws-cdk-lib@2.171.1", "constructs@10.4.2"],
      jest: true,
      jestOptions: {
        jestVersion: "^29",
        jestConfig: {
          verbose: true,
          testEnvironment: "node",
          testMatch: ["**/*.test.ts"],
          globals: {},
        },
      },
      eslint: true,
      eslintOptions: {
        dirs: ["src", "test"],
        prettier: true,
        lintProjenRc: true,
        commandOptions: {
          fix: true,
          extraArgs: [],
        },
      },
      ...options,
    });
  }

  postSynthesize() {
    super.postSynthesize();
    execSync("node scripts/update-version.js", { stdio: "inherit" });
  }
}

const project = new CognitoGithubProviderProject({});

// Remove "type": "module" from package.json as we're using CommonJS now
project.package.addField("type", undefined);

project.tsconfig?.addInclude("test/**/*.ts");

project.addTask("test:debug", {
  exec: "jest --verbose --runInBand",
});

project.addTask("clean", {
  exec: "rm -fr node_modules dist coverage test-reports lib package-lock.json .projen .jsii .mergify.yml .eslintrc.json env.txt errors.txt",
});

project.addTask("reinstall", {
  exec: "rm -fr node_modules package-lock.json dist coverage test-reports lib && npm install",
});

project.addTask("publish", {
  steps: [
    {
      exec: "test -d dist || npx projen build",
      name: "Check dist and build/package if necessary",
    },
    {
      exec: "node scripts/npm-publish-codeartifact.js",
      env: {
        AWS_PROFILE: "cloud-services-prod",
      },
      name: "Publish to CodeArtifact",
    },
  ],
});

project.addTask("rebuild", {
  exec: "rm -fr dist lib && npx projen && npx projen build",
});

project.addTask("localbuild", {
  exec: "rm -fr dist lib && npx projen && npx projen build && yalc publish && rm -rf node_modules && ln -s $(realpath ../b2b-sso-service/node_modules) node_modules",
});

project.addTask("repackage", {
  exec: "rm -fr dist lib && npx projen && npx projen package",
});

project.addTask("republish", {
  exec: "rm -fr dist lib && npx projen && npx projen publish",
});

// The Dockerfile isn't interpreted by TypeScript
// We need to copy it manually
project.postCompileTask.exec("cp src/Dockerfile lib/");

// Define a task for patching tsconfig.json
const patchTsconfigTask = project.addTask("patch-tsconfig", {
  exec: "node scripts/patch-tsconfig.js",
  description: "Patch tsconfig.json to remove charset option",
});

project.preCompileTask.prependSpawn(patchTsconfigTask, {
  name: "patch tsconfig.json",
});

project.postCompileTask.prependSpawn(patchTsconfigTask, {
  name: "patch tsconfig.json",
});

// Add a custom compilation step
project.compileTask.reset("pwd");
project.compileTask.prependSpawn(patchTsconfigTask, {
  name: "patch tsconfig.json",
});
project.compileTask.prependExec("jsii --silence-warnings=reserved-word", {
  name: "jsii",
});
project.compileTask.prependExec("tsc", { name: "tsc" });
project.compileTask.prependSpawn(patchTsconfigTask, {
  name: "patch tsconfig.json",
});
// Update the existing ESLint task
const eslintTask = project.tasks.tryFind("eslint");
if (eslintTask) {
  eslintTask.reset("eslint . --ext .ts,.tsx");
}

// Update the existing docgen task
const docgenTask = project.tasks.tryFind("docgen");
if (docgenTask) {
  docgenTask.reset("jsii-docgen -o docs/API.md");
}

const defaultTask = project.tasks.tryFind("default");
if (defaultTask) {
  defaultTask.prependExec("node scripts/update-version.js");
}

project.synth();
