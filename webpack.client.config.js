const { resolve } = require('path');

module.exports = {
  context: resolve('src'),
  entry: { index: './interface' },
  output: { path: resolve('dist'), filename: '[name].js', libraryTarget: 'commonjs2' },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { cacheDirectory: 'babelCache' },
        },
      },
    ],
  },
};
