/**
 * Created by topeas on 2017/5/11.
 */
import axios from 'axios'
import config from '../config'

// 目前只写get测试的方法
export default {
  get(url) {
    return axios({
      method: 'get',
      url: `${config.url}${url}`,
    })
  },
}
