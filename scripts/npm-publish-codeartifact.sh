#!/bin/env bash

export AWS_REGION_TOOLS=${AWS_REGION_TOOLS:-us-east-2}
export AWS_ACCOUNT_TOOLS=${AWS_ACCOUNT_TOOLS:-433714148419}
export PYTHON_KEYRING_BACKEND=${PYTHON_KEYRING_BACKEND:-keyring.backends.null.Keyring}
export DEFAULT_ASSETS_PATHS=${DEFAULT_ASSETS_PATHS:-build}
export NPM_REPOSITORY_NAME=${NPM_REPOSITORY_NAME:-clients}
export NODE_ENV=${NODE_ENV:-production}
export BUILD_TYPE=${BUILD_TYPE:-release}

# Set the AWS CLI profile to use

export NPM_REGISTRY_URL="https://artifacts-${AWS_ACCOUNT_TOOLS}.d.codeartifact.${AWS_REGION_TOOLS}.amazonaws.com/npm/${NPM_REPOSITORY_NAME}/"
[ -z "$(cat $GITHUB_WORKSPACE/VERSION | grep "-" 2>&1)" ] || export BUILD_TYPE=$(cat $GITHUB_WORKSPACE/VERSION | cut -d '-' -f 2)
npm publish --registry $NPM_REGISTRY_URL --tag $BUILD_TYPE --verbose
