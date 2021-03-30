const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./webpack.config.common.js');

module.exports = merge(
  common('development'),
  {
    devtool: 'source-map',
    devServer: {
      contentBase: 'src',
      watchContentBase: true,
      hot: true,
      open: true,
      port: process.env.PORT || 3000,
      host: process.env.HOST || 'localhost',
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
  },
);
