/**
 * Created by topeas on 2017/5/11.
 */
import axios from 'axios'
import config from '../config'
const api = axios.create()
/* eslint-disable  no-useless-escape */
const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, '$1') || ''

api.defaults.baseURL = `${config.url}`
api.defaults.headers.common.Authorization = token  // need the token here
api.defaults.headers.post[ 'Content-Type' ] = 'application/json'
api.defaults.withCredentials = true

export default {
  get(url) {
    return api({
      method: 'get',
      url,
    }).then(res => res.data)
  },
  post(url, payload) {
    return api({
      method: 'post',
      url,
      data: {
        ...payload,
      },
    }).then(res => res.data)
  },
}
