/**
 * Created by topeas on 2017/5/11.
 */

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import test from './reducer/test'

export default combineReducers({
  test,
  routing: routerReducer,
})
