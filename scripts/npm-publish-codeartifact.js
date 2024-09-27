#!/usr/bin/env node

/* eslint-env node */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Tell ESLint that we're using Node.js globals
/* global process */

// Read environment variables with defaults
const AWS_REGION_TOOLS = process.env.AWS_REGION_TOOLS || 'us-east-2';
const AWS_ACCOUNT_TOOLS = process.env.AWS_ACCOUNT_TOOLS || '433714148419';
const PYTHON_KEYRING_BACKEND = process.env.PYTHON_KEYRING_BACKEND || 'keyring.backends.null.Keyring';
const NPM_REPOSITORY_NAME = process.env.NPM_REPOSITORY_NAME || 'clients';
const NODE_ENV = process.env.NODE_ENV || 'production';
const BUILD_TYPE = process.env.BUILD_TYPE || 'release';
const GITHUB_WORKSPACE = process.env.GITHUB_WORKSPACE || '.';

// Set NPM Registry URL
const NPM_REGISTRY_URL = `https://artifacts-${AWS_ACCOUNT_TOOLS}.d.codeartifact.${AWS_REGION_TOOLS}.amazonaws.com/npm/${NPM_REPOSITORY_NAME}/`;

// Set environment variables
process.env.PYTHON_KEYRING_BACKEND = PYTHON_KEYRING_BACKEND;
process.env.NODE_ENV = NODE_ENV;

// Read VERSION file and determine BUILD_TYPE
let versionContent;
try {
  const versionFilePath = path.resolve(process.cwd(), `${GITHUB_WORKSPACE}/VERSION`);
  versionContent = fs.readFileSync(versionFilePath, 'utf8').trim();
} catch (error) {
  console.error('Error reading VERSION file:', error);
  process.exit(1);
}

if (versionContent.includes('-')) {
  process.env.BUILD_TYPE = versionContent.split('-')[1];
} else {
  process.env.BUILD_TYPE = BUILD_TYPE;
}

// Execute npm publish command
try {
  execSync(`npm publish --registry ${NPM_REGISTRY_URL} --tag ${process.env.BUILD_TYPE} --verbose`, { stdio: 'inherit' });
} catch (error) {
  console.error('Error executing npm publish:', error);
  process.exit(1);
}

console.log('npm publish completed successfully');
