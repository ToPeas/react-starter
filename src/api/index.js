/**
 * Created by topeas on 2017/5/11.
 */
import axios from 'axios'
import config from '../config'

export default {
  get(url) {
    return axios({
      method: 'get',
      url: `${config.url}${url}`,
    }).then(res => res.data)
  },
  post(url, payload){
    return axios({
      method: 'post',
      url: `${config.url}${url}`,
      data: {
        ...payload
      }
    }).then(res => res.data)
  }
}
