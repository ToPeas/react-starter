/**
 * Created by topeas on 2017/6/15.
 */

import { fromJS } from 'immutable'
import { message } from 'antd'
import { createReducer } from 'redux-immutablejs'
import * as actionTypes from '../const/actionType'
import api from '../../api/index'
import store from '../../index'

const initStates = fromJS({
  posts: [],
  post: {
    summary: '',
    content: '',
    title: '',
  },
})
const reducers = {
  [actionTypes.GET_ONE_POST](state, action) {
    const { title, summary, content } = action.payload
    return state.merge({
      post: {
        title,
        summary,
        content,
      },
    })
  },
}

export const getOne = data => async (dispatch) => {
  const { id } = data
  const res = await api.get(`/posts/${id}`)
  console.log('', res)
  if (res.code === 0) {
    message.success('获取文章成功')
    const { title, summary, content } = res.data
    return dispatch({
      type: actionTypes.GET_ONE_POST,
      payload: {
        title,
        content,
        summary,
      },
    })
  } else if (res.code === 1) {
    message.error('token过期')
  }
  message.error('获取文章失败')
}

export default createReducer(initStates, reducers)
