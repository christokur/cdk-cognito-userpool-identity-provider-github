#!/bin/bash

VERSIONS=(
  0.0.0 2.0.0 2.0.1 2.1.0 2.1.1 2.1.2 2.1.3 2.1.4 2.1.5 2.1.6 2.1.7 2.1.8 
  2.2.0 2.2.1 2.2.2 2.2.3 2.3.0 2.3.1 2.3.3 2.3.4 2.3.5 2.3.6
)

for version in "${VERSIONS[@]}"; do
  echo "Deleting version $version..."
  aws codeartifact delete-package-versions \
    --domain artifacts \
    --repository npm \
    --package cdk-cognito-userpool-identity-provider-github \
    --versions "$version" \
    --format npm \
    --profile cloud-services-prod
done
