const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devServer: {
    contentBase: './dist',
    port: '8151'
  },
  devtool: 'inline-source-map',
  entry: {
    index: './src/index.js',
  },
  mode: 'development',
  output: {
    clean: true,
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'exercise-1.5.1',
    }),
  ],

};
