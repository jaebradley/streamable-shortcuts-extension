const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    content: './source/content',
    background: './source/background',
    shortcuts: './source/shortcuts',
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CopyWebpackPlugin([
      {
        from: '*',
        context: 'source',
        ignore: '*.js',
      },
    ]),
  ],
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(new UglifyJSPlugin());
} else {
  module.exports.devtool = 'source-map';
}
