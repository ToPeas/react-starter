/**
 * Created by mac on 2017/4/21.
 */

const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].js', // 执行webpack的时候输出的文件名
    chunkFilename: '[name].js'
  },
  resolve: {
    alias: {
      '~src': './src'
    },
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, '../src', path.resolve(__dirname, '../node_modules'))]
  },
  module: {
    rules: [
      {
        test: /\.js|\.jsx$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(tff|otf|eot|svg|woff2?)(\?.+)?$/,
        use: {
          loader: 'url-loader', options: {
            limit: 10000
          }
        },
      }
    ]
  },
}