const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const BaseConf = require('./webpack.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HappyPack = require('happypack')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin')
var WebpackChunkHash = require('webpack-chunk-hash')

module.exports = merge(BaseConf, {
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].[chunkhash:5].js', // 执行webpack的时候输出的文件名
    chunkFilename: '[name].[chunkhash:5].js',
  },
  plugins: [

    new HappyPack({
      id: 'jsx',
      threadPool: happyThreadPool,
      loaders: ['babel-loader'],
    }),
    // 打包的分析
    // new BundleAnalyzerPlugin(),
    //https://github.com/dwqs/blog/issues/52n
    new ParallelUglifyPlugin({
      workerCount: os.cpus().length,
      cacheDir: '.cache/',
      uglifyJS: {
        compress: {
          warnings: false,
          drop_debugger: true,
          drop_console: true
        },
        comments: false,
        sourceMap: true,
        mangle: true
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity,
    }),

    new webpack.HashedModuleIdsPlugin(),
    new WebpackChunkHash(),
    new ChunkManifestPlugin({
      filename: 'chunk-manifest.json',
      manifestVariable: 'webpackManifest',
      inlineManifest: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../index.html'),
      inject: true,
      chunks: ['manifest', 'vendor', 'app'],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),
  ],
  devtool: '#source-map',
})