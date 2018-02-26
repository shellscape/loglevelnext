'use strict';

const path = require('path');

const dev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: dev ? 'development' : 'production',
  devtool: dev ? 'inline-source-map' : false,
  output: {
    filename: `loglevelnext${dev ? '' : '.min'}.js`,
    path: path.resolve(__dirname, 'dist'),
    library: 'log',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
