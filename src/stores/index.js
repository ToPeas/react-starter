/**
 * Created by topeas on 2017/5/11.
 */

import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import markdown from './reducer/markdown'

export default combineReducers({
  markdown,
  routing: routerReducer,
})
