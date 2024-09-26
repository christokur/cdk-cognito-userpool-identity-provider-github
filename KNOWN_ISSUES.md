# Known Issues

## Deprecation Warnings

The following deprecation warnings are known to appear during installation:

1. `abab@2.0.6`: Use your platform's native atob() and btoa() methods instead
2. `w3c-hr-time@1.0.2`: Use your platform's native performance.now() and performance.timeOrigin
3. `domexception@4.0.0`: Use your platform's native DOMException instead

These warnings are related to dependencies used in the testing environment and do not affect the main functionality of the CDK construct. They are a result of nested dependencies that are not directly controllable through our package configuration.

We are monitoring these issues and will update our dependencies when newer versions that resolve these warnings become available.

## Mitigation

We have attempted to override these packages in our configuration, but due to the nested nature of the dependencies, the warnings persist. The functionality of the CDK construct remains unaffected by these deprecation warnings.

## Future Steps

- Periodically check for updates to our direct dependencies that might resolve these nested dependency issues.
- Monitor the GitHub repositories of the affected packages for updates or alternatives.
- Consider alternative testing libraries in future major versions if these issues persist long-term.

If you encounter any issues that you believe are related to these warnings, please open an issue in the project repository.