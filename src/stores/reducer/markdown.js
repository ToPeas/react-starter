/**
 * Created by topeas on 2017/6/7.
 */

import { fromJS } from 'immutable'
import { createReducer } from 'redux-immutablejs'
import * as actionTypes from '../const/actionType'
import api from '../../api/index'
import { message } from 'antd'
const initStates = fromJS({
  markdownContent: '',
})

const reducers = {
  [actionTypes.MARKDOWN_EDIT](state, action) {
    const {markdownContent} = action.payload
    return state.merge({
      markdownContent,
    })
  },
}

export const sendMarkdown = data => async dispatch => {
  console.log(data)
  const res = await api.post('/posts', {...data})
  if (res.code === 0) {
    message.success('文章创建成功')
    return dispatch({
      type: actionTypes.MARKDOWN_EDIT,
      payload: {
        markdownContent: data
      },
    })
  } else {
    message.error('文章创建失败')
  }

}

export default createReducer(initStates, reducers)
