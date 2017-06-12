/**
 * Created by topeas on 2017/5/11.
 */

import { fromJS } from 'immutable'
import { createReducer } from 'redux-immutablejs'
import * as actionTypes from '../const/actionType'
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

export const getIndexData = config => async (dispatch) => {
  const { data } = await api.get('/topics', config)
  return dispatch({
    type: actionTypes.INDEX_GET,
    payload: {
      ...data,
    },
  })
}

export default createReducer(initStates, reducers)
