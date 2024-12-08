"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var awscdk_1 = require("projen/lib/awscdk");
var javascript_1 = require("projen/lib/javascript");
// Add custom synthesis hooks
var CognitoGithubProviderProject = /** @class */ (function (_super) {
    __extends(CognitoGithubProviderProject, _super);
    function CognitoGithubProviderProject(options) {
        if (options === void 0) { options = {}; }
        return _super.call(this, __assign({ author: "Christo De Lange", authorAddress: "sands@christodelange.com", cdkVersion: "2.171.1", defaultReleaseBranch: "main", name: "cdk-cognito-userpool-identity-provider-github", description: "A CDK construct that adds GitHub as an identity provider to a Cognito user pool", repositoryUrl: "git@github.com:christokur/cdk-cognito-userpool-identity-provider-github.git", license: "Apache-2.0", keywords: ["cdk"], projenrcTs: true, packageManager: javascript_1.NodePackageManager.NPM, gitignore: [
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
                "/ai",
                "/env.txt",
                "/errors.txt",
                "/ai",
                "**/.env",
            ], version: "2.0.1", releaseToNpm: false, release: false, minNodeVersion: "18.0.0", jsiiVersion: "5.6.0", deps: ["aws-cdk-lib@2.171.1", "constructs@10.4.2"], devDeps: [
                "aws-cdk-lib@2.171.1",
                "constructs@10.4.2",
                "@jest/globals@^29.7.0",
                "@types/node@22.10.1",
                "jest-junit@16.0.0",
                "projen@^0.90.6",
                "jsii-rosetta@5.6.0",
                "@types/node"
            ], peerDependencyOptions: {
                pinnedDevDependency: false,
            }, peerDeps: ["aws-cdk-lib@2.171.1", "constructs@10.4.2"], jest: true, jestOptions: {
                jestVersion: "^29",
                jestConfig: {
                    verbose: true,
                    testEnvironment: "node",
                    testMatch: ["**/*.test.ts"],
                    globals: {},
                },
            }, eslint: true, eslintOptions: {
                dirs: ["src", "test"],
                extensions: [".ts"],
                lintProjenRc: true,
                prettier: true,
                version: "^8.0.0",
                env: {
                    node: true,
                    jest: true,
                },
                commandOptions: {
                    fix: true,
                    extraArgs: [],
                },
            } }, options)) || this;
    }
    CognitoGithubProviderProject.prototype.postSynthesize = function () {
        _super.prototype.postSynthesize.call(this);
        try {
            var version = require("fs").readFileSync("VERSION", "utf8").trim();
            var packageJson = require("./package.json");
            packageJson.version = version;
            require("fs").writeFileSync("package.json", JSON.stringify(packageJson, null, 2) + "\n");
            console.log("Updated version to ".concat(version, " in package.json"));
        }
        catch (error) {
            console.error("Error updating version:", error);
        }
    };
    return CognitoGithubProviderProject;
}(awscdk_1.AwsCdkConstructLibrary));
var project = new CognitoGithubProviderProject({});
// Remove "type": "module" from package.json as we're using CommonJS now
project.package.addField("type", undefined);
(_a = project.tsconfig) === null || _a === void 0 ? void 0 : _a.addInclude("test/**/*.ts");
project.addTask("test:debug", {
    exec: "jest --verbose --runInBand",
});
project.addTask("clean", {
    exec: "rm -fr node_modules dist coverage test-reports lib package-lock.json package.json .projen .jsii .mergify.yml .eslintrc.json env.txt errors.txt",
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
// The Dockerfile isn't interpreted by TypeScript
// We need to copy it manually
project.postCompileTask.exec("cp src/Dockerfile lib/");
// Define a task for patching tsconfig.json
var patchTsconfigTask = project.addTask("patch-tsconfig", {
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
var eslintTask = project.tasks.tryFind("eslint");
if (eslintTask) {
    eslintTask.reset("eslint . --ext .ts,.tsx");
}
// Update the existing docgen task
var docgenTask = project.tasks.tryFind("docgen");
if (docgenTask) {
    docgenTask.reset("jsii-docgen -o docs/API.md");
}
project.synth();
