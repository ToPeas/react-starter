/**
* Created by topeas on 2017/5/11.
*/
import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux'
import thunk from 'redux-thunk'
import {
  createLogger,
} from 'redux-logger'
import reducers from './stores'

// chrome的react devtool 的扩展
/* eslint-disable no-undef */

const enhancerCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const logger = createLogger()

const configStore = (initialState) => {
  const middleware = [thunk, logger]
  // const enhancers = []
  const store = createStore(reducers, initialState, enhancerCompose(
    applyMiddleware(...middleware),
    // ...enhancers,
  ))

  if (module.hot) {
    module.hot.accept('./stores/index', () => store.replaceReducer(require('./stores/index').default))
  }
  return store
}

export default configStore
