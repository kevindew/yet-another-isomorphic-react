import express from 'express';
import routes from './routes';
import path from 'path';
import * as assets from './assets';

const app = express();

app.set('production', process.env.NODE_ENV === 'production');
app.set('port', process.env.PORT || 3000);
app.set('webpackHost', process.env.WEBPACK_HOST || 'localhost');
app.set('webpackPort', process.env.WEBPACK_PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.locals.production = app.get('production');
app.locals.webpackHost = app.get('webpackHost');
app.locals.webpackPort = app.get('webpackPort');
app.locals.webpackAssetPath = assets.webpackAssetPath({
  assetJsonFunction: assets.loadWebpackAssetJson(path.join(__dirname, '../../webpack-assets.json')),
  production: app.get('production'),
  buildPath: 'build',
  webpackHost: app.get('webpackHost'),
  webpackPort: app.get('webpackPort')
});

routes(app);

export default app;
