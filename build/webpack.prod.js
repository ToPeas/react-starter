const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const BaseConf = require('./webpack.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = merge(BaseConf, {
	output: {
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/',
		filename: '[name].[chunkhash:5].js', // 执行webpack的时候输出的文件名
		chunkFilename: '[name].[chunkhash:5].js'
	},
	plugins: [
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
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			sourceMap: true
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(__dirname, '../index.html'),
			inject: true,
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