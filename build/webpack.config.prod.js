const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
  entry: path.resolve(path.join(__dirname, '../src/index')),
  output: { path: path.join(__dirname, '..', 'dist'), filename: 'server.build.js' },
});
