/**
 * Created by ToPeas on 2017/4/11 => 19:08 in webpack-seed.
 */

const koa = require('koa')
const DevConf = require('./build/webpack.dev')
const webpack = require('webpack')
const Dev = require('koa-webpack')
// const path = require('path')
const opn = require('opn')


// 获取配置信息
require('dotenv').config()

const app = new koa()

DevConf.entry.app = ['webpack-hot-middleware/client', DevConf.entry.app]


const compiler = webpack(DevConf)

app.use(Dev({
  compiler,
  dev: {
    stats: {
      colors: true
    },
  },
  hot: {
    log: false,
    heartbeat: 2000
  }
}))

const port = +process.env.PORT || 8888

console.log('环境模式', process.env.ENV)

app.listen(port, () => {
  opn(`http://localhost:${port}`)
  console.log(`server started at http://localhost:${port}`)
})
