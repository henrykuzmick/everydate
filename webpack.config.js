var path = require('path');

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
  }
}

module.exports = config;