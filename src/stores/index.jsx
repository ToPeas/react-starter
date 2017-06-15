/**
 * Created by topeas on 2017/5/11.
 */

// import { combineReducers } from 'redux'
import { combineReducers } from 'redux-immutable'
import markdown from './reducer/markdown'
import admin from './reducer/admin'
import posts from './reducer/posts'

export default combineReducers({
  markdown,
  admin,
  posts,
})
