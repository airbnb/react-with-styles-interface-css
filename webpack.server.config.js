const { resolve } = require('path');

module.exports = {
  context: resolve('src'),
  entry: { compile: './compile', cli: './cli' },
  output: { path: resolve('dist'), filename: '[name].js', libraryTarget: 'commonjs2' },
  target: 'node',
  externals: /^[^.]/,
  module: {
    noParse: /noParse.js/,
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: { cacheDirectory: 'babelCache' },
        },
      },
    ],
  },
};
