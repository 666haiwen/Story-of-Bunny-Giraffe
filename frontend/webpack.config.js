const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: [/\.jpg$/, /\.png$/],
        use: [ 'file-loader' ]
      }
    ]
  },
  devServer: {
    port: 8080,
    // proxy: {
    //   '/': 'http://localhost:8000'
    // },
    watchContentBase: true,
    historyApiFallback: true,
  }
};
