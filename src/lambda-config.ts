import * as s3_assets from "aws-cdk-lib/aws-s3-assets";

/**
 * Default options for Lambda code assets
 * Includes source maps for better debugging while excluding unnecessary files
 * @internal
 */
export const DEFAULT_LAMBDA_ASSET_OPTIONS: s3_assets.AssetOptions = {
  exclude: ["*.ts", "test", "tests", "*.map", ".git", ".DS_Store"],
};

/**
 * Debug options for Lambda code assets
 * Includes source maps and TypeScript files for debugging
 * @internal
 */
export const DEBUG_LAMBDA_ASSET_OPTIONS: s3_assets.AssetOptions = {
  exclude: ["test", "tests", ".git", ".DS_Store"],
};
