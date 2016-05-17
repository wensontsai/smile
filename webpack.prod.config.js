'use strict';

var webpack = require('webpack');
var config = require('./webpack.base.config.js');
var update = require('react/lib/update');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

var CleanWebpackPlugin = require('clean-webpack-plugin');

var SCRIPTS_PATH = 'server/static/scripts';
var TEMPLATES_PATH = 'server/static';

config = update(config, {
  debug: { $set: true },
  entry: { $set: ['./client/entry'] },
  profile: { $set: false },
  devtool: { $set: '#source-map' },

  output: {
    $set: {
      path: SCRIPTS_PATH,
      pathInfo: true,
      publicPath: '/scripts/', // appended to script tag in index.html
      filename: 'bundle.[hash].min.js'
    }
  },

  plugins: {
    $push: [
      new CleanWebpackPlugin([SCRIPTS_PATH, TEMPLATES_PATH]),
      new webpack.optimize.DedupePlugin(),
      new webpack.DefinePlugin({
        'process.env':{
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        output: { comments: false },
        sourceMap: false,
        mangle: false 
      }),
      new HtmlWebpackPlugin({
        inject: true,
        filename: '../../static/index.html',
        template: 'client/views/index.tpl'
      }),
    ]
  },

  module: {
    loaders: {
      $push: [
        {
          test: /\.jsx?$/,
          loaders: [ 'babel' ],
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          loaders: [
              'style',
              'css',
              'autoprefixer?browsers=last 3 versions',
              'sass?outputStyle=expanded'
          ]
        }
      ]
    }
  },

});

module.exports = config;
