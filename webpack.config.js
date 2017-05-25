const path = require('path');
const env = require('./webpack/env.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const globals = {
  __ENV__: process.env.env
};

const cssLoader = {
  loader: 'css-loader',
  options: {
    minimize: globals.__ENV__ !== 'dev',
    autoprefixer: {browsers: ['last 2 versions'], remove: true},
    zindex: false
  }
};

module.exports = {
  entry: env.getEntry(globals.__ENV__),
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js'
  },
  devtool: env.getDevtool(globals.__ENV__),
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        loaders: 'babel-loader',
      },
      {
        test: /\.scss|css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            cssLoader,
            'resolve-url-loader',
            'sass-loader'
          ]
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=assets/[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
      {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader'},
    ]
  },
  plugins: env.getPluginsByEnv(globals)
};


