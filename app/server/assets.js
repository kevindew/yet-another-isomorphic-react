import path from 'path';
import fs from 'fs';

export function loadWebpackAssetJson (webpackPath) {
  return () => {
    if (fs.existsSync(webpackPath)) {
      return JSON.parse(fs.readFileSync(webpackPath));
    } else {
      return {};
    }
  }
}

export function webpackAssetPath ({
  assetJsonFunction: assetJsonFunction,
  production: production,
  buildPath: buildPath,
  webpackHost: webpackHost,
  webpackPort: webpackPort
}) {
  let assetPaths = assetJsonFunction();
  return (asset) => {
    const name = asset.slice(0, path.extname(asset).length * -1);
    const extension = path.extname(asset).slice(1);
    if (!production) {
      return `//${webpackHost}:${webpackPort}/${buildPath}/${asset}`;
    } else if (assetPaths[name] && assetPaths[name][extension]) {
      return assetPaths[name][extension];
    } else {
      return asset;
    }
  };
}
