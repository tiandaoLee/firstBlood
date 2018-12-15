const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const utils = require('./build/utils');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
module.exports = {
  watch: true,
  entry: ['./src/entry'],
  output: {
    path: path.join(__dirname, './dist/assets/'),
    filename: 'bundle.js',
    publicPath: `http://${utils.getIPAdress()}:8081/dist`,
  },
  resolve: {
    alias: {
      styles: path.resolve(__dirname, './src/styles')
    },
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          'style-loader?sourceMap',
          'css-loader?sourceMap&modules=true&localIdentName=[local]_[hash:base64:5]',
          'postcss-loader?sourceMap'
        ]
      },
      {
        test: /\.less$/,
        exclude: /node_modules|antd\.less/,
        loaders: [
          'style-loader?sourceMap',
          'css-loader?sourceMap&modules=true&localIdentName=[local]_[hash:base64:5]',
          'postcss-loader?sourceMap',
          'less-loader?sourceMap&javascriptEnabled=true&modules=true&localIdentName=[local]-[hash:base64:5]'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.BannerPlugin('这里是打包文件头部注释'),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: path.resolve(__dirname, 'index.html'),
      title: '第一个文件',
      showErrors: true,
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin()
  ]
}