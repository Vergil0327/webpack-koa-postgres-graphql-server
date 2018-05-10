const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const { NODE_ENV, POSTGRES_HOST } = process.env;

const ROOT_PATH = path.resolve(__dirname, '..');
const config = require('dotenv').config({
  path: path.join(ROOT_PATH, 'config', '.env'),
}).parsed;

module.exports = {
  mode: NODE_ENV,
  target: 'node',
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: true,
    __filename: true,
    __dirname: true,
  },
  externals: [
    nodeExternals({
      whitelist: [
        'webpack/hot/poll?1000',
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(graphql)$/,
        use: {
          loader: 'graphql-import-loader',
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(
      [
        path.resolve(ROOT_PATH, 'dist'),
      ],
      {
        root: ROOT_PATH,
      }
    ),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
        POSTGRES_USER: JSON.stringify(config.POSTGRES_USER),
        POSTGRES_PASSWORD: JSON.stringify(config.POSTGRES_PASSWORD),
        POSTGRES_HOST: JSON.stringify(POSTGRES_HOST),
        POSTGRES_PORT: Number(config.POSTGRES_PORT),
        POSTGRES_DB:
          NODE_ENV !== 'production'
            ? JSON.stringify(config.POSTGRES_DEV_DB)
            : JSON.stringify(config.POSTGRES_PROD_DB),
        POSTGRES_POOL_MIN: Number(config.POSTGRES_POOL_MIN),
        POSTGRES_POOL_MAX: Number(config.POSTGRES_POOL_MAX),
      },
    }),
  ],
};
