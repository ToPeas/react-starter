/**
 * Created by topeas on 2017/5/11.
 */

// import { combineReducers } from 'redux'
import {combineReducers} from 'redux-immutable'
import markdown from './reducer/markdown'

export default combineReducers({
  markdown,
})
