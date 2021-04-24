const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

const imageLoader = {
  loader: 'url-loader',
  options: {
    esModule: false,
    limit: 8192,
    name: 'images/[name]-[hash].[ext]',
  },
};

module.exports = (mode) => {
  const isProd = mode === 'production';

  return {
    entry: [
      './src/index.js',
      './src/index.scss',
    ],
    mode,
    output: {
      path: path.resolve(process.cwd(), 'public'),
      filename: 'main.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer],
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.html$/i,
          use: {
            loader: 'html-loader',
            options: {
              interpolate: true,
              // minimize: isProd,
            },
          },
        },
        {
          test: /\.(png|jp(e*)g)$/,
          use: imageLoader,
        },
        {
          test: /\.svg$/,
          use: [
            imageLoader,
            'svgo-loader',
          ],
        },
      ],
    },
    plugins: [
      new StyleLintPlugin({
        configFile: '.stylelintrc',
        context: 'src',
        files: '**/*.scss',
        failOnError: false,
        quiet: false,
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      new CopyWebpackPlugin([
        {
          from: './src/web-manifest',
          to: './web-manifest',
        },
        {
          from: './src/favicon.ico',
          to: './favicon.ico',
        },
      ]),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        inject: true,
        template: './src/index.html',
        chunks: ['main'],
        minify: isProd,
      }),
      new HtmlWebpackPlugin({
        filename: 'authorization-log-in.html',
        inject: true,
        template: 'src/authorization-log-in.html',
        chunks: ['authorization-log-in'],
        minify: isProd,
      }),
      new HtmlWebpackPlugin({
        filename: 'authorization-reset-pass.html',
        inject: true,
        template: 'src/authorization-reset-pass.html',
        chunks: ['authorization-reset-pass'],
        minify: isProd,
      }),
      new HtmlWebpackPlugin({
        filename: 'authorization-reset-pass-check-email.html',
        inject: true,
        template: 'src/authorization-reset-pass-check-email.html',
        chunks: ['authorization-reset-pass-check-email'],
        minify: isProd,
      }),
      new HtmlWebpackPlugin({
        filename: 'authorization-reset-pass-change-pass.html',
        inject: true,
        template: 'src/authorization-reset-pass-change-pass.html',
        chunks: ['authorization-reset-pass-change-pass'],
        minify: isProd,
      }),
      new HtmlWebpackPlugin({
        filename: 'authorization-reset-pass-success.html',
        inject: true,
        template: 'src/authorization-reset-pass-success.html',
        chunks: ['authorization-reset-pass-success'],
        minify: isProd,
      }),
      new HtmlWebpackPlugin({
        filename: 'authorization-sign-up.html',
        inject: true,
        template: 'src/authorization-sign-up.html',
        chunks: ['authorization-sign-up'],
        minify: isProd,
      }),
      new HtmlWebpackPlugin({
        filename: 'authorization-sign-up-thanks.html',
        inject: true,
        template: 'src/authorization-sign-up-thanks.html',
        chunks: ['authorization-sign-up-thanks'],
        minify: isProd,
      })
    ],
    stats: {
      colors: true,
    },
  };
};
