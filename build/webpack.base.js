/**
 * Created by mac on 2017/4/21.
 */

const webpack = require('webpack')
const path = require('path')
const chalk = require('chalk')
const HappyPack = require('happypack')
const autoprefixer = require('autoprefixer')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const resolve = (dir) => {
  return path.resolve(__dirname, dir)
}

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/index.jsx'),
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
    extensions: ['.js', '.jsx', '.json'],
    modules: [resolve('../src'), resolve('../node_modules')]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        enforce: 'pre',
        use: [{
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        }],
        include: [resolve('./src')],
      },
      {
        test: /\.js|\.jsx$/,
        use: 'happypack/loader?id=jsx',
        exclude: /node_modules/,
      },

      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
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
  plugins: [
    new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer({
            browsers: ['last 2 version']
          })
        ]
      }
    }),
    new HappyPack({
      id: 'jsx',
      loaders: ['babel-loader?cacheDirectory=true'],
      // threadPool: happyThreadPool,
      verbose: true
    }),
    new ExtractTextPlugin('[name].[chunkhash:5].css'),

  ]
}