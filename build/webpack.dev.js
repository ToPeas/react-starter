/**
 * Created by mac on 2017/4/21.
 */

const webpack = require('webpack')
const merge = require('webpack-merge')
const BaseConf = require('./webpack.base')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HappyPack = require('happypack')
const os = require('os')
let happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = merge(BaseConf, {
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      },
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../index.html'),
      favicon:'../favicon.ico',
      inject: true
    }),
  ],
})