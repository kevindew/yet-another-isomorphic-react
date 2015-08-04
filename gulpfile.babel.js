// built with bits from: https://github.com/jlongster/backend-with-webpack/blob/master/gulpfile.js

import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import path from 'path';
import nodemon from 'nodemon';
import WebpackDevServer from 'webpack-dev-server';
import AssetsPlugin from 'assets-webpack-plugin'

const production = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;
const webpackHost = process.env.WEBPACK_HOST || 'localhost';
const webpackPort = process.env.WEBPACK_PORT || 3001;

const commonLoaders = [ { test: /\.js$/, exclude: /node_modules/, loader: 'jsx-loader!babel' } ];

let webpackClient = {
  name: 'client',
  entry: [
    `webpack-dev-server/client?http://${webpackHost}:${webpackPort}`,
    'webpack/hot/only-dev-server',
    './app/client/main.js'
  ],
  output: {
    path: path.join(__dirname, 'public/build'),
    publicPath: `http://${webpackHost}:${webpackPort}/build/`,
    filename: '[hash].js'
  },
  module: {
    loaders: commonLoaders
  },
  plugins: [
    new AssetsPlugin(),
    new webpack.HotModuleReplacementPlugin({ quiet: true })
  ]
};

let webpackServer = {
  name: 'server',
  entry: './app/server/main.js',
  target: 'node',
  node: {
    __dirname: true,
    __filename: true
  },
  output: {
    path: path.join(__dirname, 'server/build'),
    filename: 'main.js',
    libraryTarget: "commonjs2"
  },
  externals: /^[a-z\-0-9]+$/,
  module: {
    loaders: commonLoaders
  }
};

gulp.task('build', (done) => {
  webpack([webpackClient, webpackServer]).run( (err, stats) => {
    if(err) {
      console.log('Error', err);
    } else {
      console.log(stats.toString());
    }

    if(done) {
      done();
    }
  });
});

gulp.task('default', ['webpack-dev-server', 'nodemon']);

gulp.task('webpack-dev-server', (done) => {
  new WebpackDevServer(webpack(webpackClient), {
    publicPath: webpackClient.output.publicPath,
    stats: {
      colors: true
    }
  }).listen(webpackPort, webpackHost, function(err) {
    if(err) throw new gutil.PluginError('webpack-dev-server', err);
    gutil.log("[webpack-dev-server]", `http://${webpackHost}:${webpackPort}/webpack-dev-server/index.html`);
    done();
  });
});

gulp.task('backend-watch', (done) => {
  var firedDone = false;
  webpack(webpackServer).watch(100, function(err, stats) {
    if (err) {
      throw new gutil.PluginError('backend-watch', err);
    }
    gutil.log('[backend-watch]', 'built');
    if(!firedDone) {
      firedDone = true;
      done();
    }
  });
});

gulp.task('nodemon', ['backend-watch'], (done) => {
  nodemon({
    script: path.join(__dirname, 'server'),
    watch: ['server/build/', 'server.js'],
    exec: 'babel-node',
    env: {
      PORT: port
    }
  }).on('restart', () => {
    gutil.log('[nodemon]', 'restarted');
  }).on('crash', () => {
    gutil.log('[nodemon]', 'crashed');
  });
  done();
});
