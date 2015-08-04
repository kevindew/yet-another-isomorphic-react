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
  production: production
}) {
  let assetPaths = assetJsonFunction();
  return (asset) => {
    if (!production) {
      assetPaths = assetJsonFunction();
    }
    const name = asset.slice(0, path.extname(asset).length * -1);
    const extension = path.extname(asset).slice(1);
    if (assetPaths[name] && assetPaths[name][extension]) {
      return assetPaths[name][extension];
    } else {
      return asset;
    }
  };
}
