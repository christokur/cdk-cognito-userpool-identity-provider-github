#!/usr/bin/env node

/* eslint-env node */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Tell ESLint that we're using Node.js globals
/* global process */

// Read environment variables with defaults
const AWS_REGION_TOOLS = process.env.AWS_REGION_TOOLS || 'us-east-2';
const AWS_ACCOUNT_TOOLS = process.env.AWS_ACCOUNT_TOOLS || '433714148419';
const PYTHON_KEYRING_BACKEND = process.env.PYTHON_KEYRING_BACKEND || 'keyring.backends.null.Keyring';
const NPM_REPOSITORY_NAME = process.env.NPM_REPOSITORY_NAME || 'npm';
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

// Function to recursively search for .tgz files
function findTgzFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(findTgzFiles(file));
    } else if (path.extname(file) === '.tgz') {
      results.push(file);
    }
  });
  return results;
}

// Find the tgz file in the dist/ directory
const distDir = path.join(process.cwd(), 'dist');
let tgzFiles;
try {
  tgzFiles = findTgzFiles(distDir);
  if (tgzFiles.length === 0) {
    throw new Error('No .tgz files found in the dist/ directory or its subdirectories');
  }
  console.log(`Found .tgz files: ${tgzFiles.join(', ')}`);
} catch (error) {
  console.error('Error finding tgz files:', error);
  process.exit(1);
}

// Execute npm publish command for each found tgz file
tgzFiles.forEach((tgzFile) => {
  try {
    const publishCommand = `npm publish --registry ${NPM_REGISTRY_URL} --tag ${process.env.BUILD_TYPE} --verbose "${tgzFile}"`;
    console.log(`Executing command: ${publishCommand}`);
    execSync(publishCommand, { stdio: 'inherit' });
    console.log(`npm publish completed successfully for ${tgzFile}`);
  } catch (error) {
    console.error(`Error executing npm publish for ${tgzFile}:`, error);
  }
});

console.log('All publish operations completed.');
