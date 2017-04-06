const path = require('path');
const webpack = require('webpack');

export default {
  devtool: 'source-map',

  entry: [
    './client/src/index'
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'index_bundle.js',
    publicPath: '/public/'
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
        'API-HOST':'https://document-management-uofoegbu.herokuapp.com/'
      }
    })
  ],

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
  }
};
