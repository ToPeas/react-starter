/**
 * Created by topeas on 2017/5/11.
 */
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from './stores'

// chrome的react devtool 的扩展

/* eslint-disable no-undef */
const enhancerCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const logger = createLogger()

export default function configStore(initialState) {
  const middleware = [thunk, logger]
  // const enhancers = []
  return createStore(reducers, initialState, enhancerCompose(
    applyMiddleware(...middleware),
    // ...enhancers,
  ))
}
