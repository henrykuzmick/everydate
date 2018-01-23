var path = require('path');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var config = {
  entry: './src/index.js',
  output: {
    filename: 'everydate.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin()
  ]
}

module.exports = config;