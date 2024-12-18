// webpack.config.js
const path = require('path');

module.exports = {
  mode: 'production', // или 'development', если хотите использовать dev-режим
  entry: './app/js/main.js',
  output: {
    filename: 'main.min.js',
    path: path.resolve(__dirname, 'app/js'),
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
