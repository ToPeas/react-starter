/**
 * Created by topeas on 2017/6/15.
 */

import { fromJS } from 'immutable'
import { message } from 'antd'
import { createReducer } from 'redux-immutablejs'
import { push } from 'connected-react-router'
import * as actionTypes from '../const/actionType'
import api from '../../api/index'

const initStates = fromJS({
  admin: {
    username: '',
  },
  token: '',
})
const reducers = {
  [actionTypes.USER_LOGIN](state, action) {
    const { username, token } = action.payload
    return state.merge({
      admin: {
        username,
      },
      token,
    })
  },
}

export const login = data => async (dispatch) => {
  const res = await api.post('/login', { ...data })
  if (res.code === 0) {
    message.success('登录成功')
    console.log('///////', document.cookie)
    dispatch({
      type: actionTypes.USER_LOGIN,
      payload: {
        username: data.username,
        token: res.data.token,
      },
    })
    return dispatch(push('/admin'))
  }
  message.error('登录失败')
}

export const register = data => async (dispatch) => {
  const res = await api.post('/register', { ...data })
  if (res.code === 0) {
    message.success('注册成功')
    dispatch({
      type: actionTypes.USER_LOGIN,
      payload: {
        username: data.username,
        token: res.token,
      },
    })
    return dispatch(push('/admin'))
  }
  message.error('注册失败')
}

export default createReducer(initStates, reducers)
