'use strict';

const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'node_modules/assert/assert.js'),
  mode: 'development',
  output: {
    filename: 'assert.js',
    path: path.resolve(__dirname, 'test/tests/browser'),
    library: 'assert',
    libraryTarget: 'var'
  }
};
