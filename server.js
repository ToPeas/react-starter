/**
 * Created by ToPeas on 2017/4/11 => 19:08 in webpack-seed.
 */

const Koa = require('koa')
const DevConf = require('./build/webpack.dev')
const webpack = require('webpack')
const Dev = require('koa-webpack')
// const path = require('path')
// const opn = require('opn')
const historyApiFallback = require('koa2-history-api-fallback')// 获取配置信息

/* eslint import/no-extraneous-dependencies: 0 */
require('dotenv').config()

const app = new Koa()
app.use(historyApiFallback())

DevConf.entry.app = ['react-hot-loader/patch', 'webpack-hot-middleware/client', DevConf.entry.app]

const compiler = webpack(DevConf)

app.use(Dev({
  compiler,
  dev: {
    stats: {
      colors: true,
    },
    noInfo: false,
    // quiet是决定打印的chunk的详细信息的
    // quiet: true,
  },
  hot: {
    log: false,
    heartbeat: 2000,
    quiet: true,
    noInfo: true,
  },
}))

const port = +process.env.PORT || 8890

// console.log('环境模式', process.env.ENV)

app.listen(port, () => {
  // opn(`http://localhost:${port}`)
  console.log(`server started at http://localhost:${port}`)
})
