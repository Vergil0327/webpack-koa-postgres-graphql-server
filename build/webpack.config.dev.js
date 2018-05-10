const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
  entry: ['webpack/hot/poll?1000', path.resolve(path.join(__dirname, '../src/server'))],
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'server.build.js',
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});