/**
 * Created by topeas on 2017/5/11.
 */

import { fromJS } from 'immutable'
import { createReducer } from 'redux-immutablejs'
import * as actionTypes from '../const/actionType'
// import * as reducerTypes from '../const/reducerType'
import api from '../../api/index'

const initStates = fromJS({
  showWording: 'hello world',
  showLoading: false,
  topics: {},
})

const reducers = {
  [actionTypes.INDEX_GET](state, action) {
    return state.mergeDeep({
      showWording: '我被改变了',
      showLoading: true,
      topics: {
        ...action.payload,
      },
    })
  },
}

// 仔细想想用变量的做暴露出来的函数，在容器组件里面引入的时候不好扩展运算
// export const action = {
//   [reducerTypes.INDEX_REDUCER](config){
//     return async dispatch => {
//       const {data: {data, code}} = await api.get('topics', config)
//       // 状态码放在这里处理
//       if (code === 200) {
//         return dispatch({
//           type: actionTypes.INDEX_GET,
//           ...data,
//         })
//       }
//     }
//   }
// }

export const getIndexData = config => async (dispatch) => {
  const { data } = await api.get('/topics', config)
    // 状态码放在这里处理
    // if (code === 200) {
  return dispatch({
    type: actionTypes.INDEX_GET,
    payload: {
      ...data,
    },
  })
    // }
}

// export const action = {
//   [reducerTypes.INDEX_REDUCER](config){
//
//   }
// }

export default createReducer(initStates, reducers)
