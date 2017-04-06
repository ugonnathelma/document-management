const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/src/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  watch: true,
  entry: './client/src/index.jsx',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: ['style-loader', 'css-loader'] },
      { test: /\.(jpg|png|svg|jpeg)$/, loader: 'url-loader' },
      { test: /\.(ttf|eot|woff|woff2)$/, loader: 'file-loader' }
    ]
  },
  plugins: [HtmlWebpackPluginConfig, new ExtractTextPlugin('styles.css')]
};
