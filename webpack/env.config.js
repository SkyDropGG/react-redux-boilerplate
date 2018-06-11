const path = require('path');
const webpack = require('webpack');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

class WebpackEnv {

  static getPlugins(globals) {
    const env = globals.__ENV__;
    let plugins = [
      new webpack.DefinePlugin({webpackGlobal: JSON.stringify(globals)}),
      new webpack.NamedModulesPlugin(),
      new webpack.LoaderOptionsPlugin({
        test: /\.scss$/,
        debug: true,
        options: {
          postcss: function () {
            return [precss, autoprefixer];
          },
          context: path.join(__dirname, '..', 'src'),
          output: {
            path: path.join(__dirname, '..', 'dist')
          }
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        names: 'vendor',
        minChunks: Infinity
      }),
      new HtmlWebpackPlugin({
        hash: false,
        template: path.join(__dirname, '..', 'src', 'public', 'index.html')
      }),
      new ExtractTextPlugin('assets/styles.css')
    ];
    switch (env) {
      case 'dev':
        plugins = plugins.concat([
          new webpack.HotModuleReplacementPlugin(),
          new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /nb/),
        ]);
        break;
      case 'stage':
        plugins = plugins.concat([
          new webpack.optimize.OccurrenceOrderPlugin(true),
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false
            }
          })
        ]);
        break;
      case 'prod':
        plugins = plugins.concat([
          new webpack.optimize.OccurrenceOrderPlugin(true),
          new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false
            }
          })
        ]);
        break;
    }
    return plugins;
  }

  static getEntry(env) {
    let entry;
    switch (env) {
      case 'dev':
        entry = [
          'whatwg-fetch',
          'webpack-hot-middleware/client',
          './src/index.js'
        ];
        break;
      case 'stage':
        entry = {
          vendor: [
            'react',
            'react-dom',
            'react-router'],
          app: [
            'babel-polyfill',
            path.join(__dirname, '..', 'src', 'index.js')
          ]
        };
        break;
      case 'prod':
        entry = {
          vendor: [
            'react',
            'react-dom',
            'react-router'
          ],
          app: [
            'babel-polyfill',
            path.join(__dirname, '..', 'src', 'index.js')
          ]
        };
        break;
    }
    return entry;
  }

  static getDevtool(env) {
    let devtool = '';
    switch (env) {
      case 'dev':
        devtool = 'cheap-eval-source-map';
        break;
      case 'stage':
        devtool = 'cheap-module-source-map';
        break;
      case 'prod':
        devtool = 'cheap-module-source-map';
        break;
    }
    return devtool;
  }
}

module.exports = WebpackEnv;
