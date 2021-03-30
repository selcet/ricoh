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
          test: /\.(sass|scss)$/,
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
          test: /\.html$/,
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
        template: './src/index.html',
        minify: isProd,
      }),
    ],
    stats: {
      colors: true,
    },
  };
};
