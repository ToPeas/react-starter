/**
 * Created by topeas on 2017/5/11.
 */
import {createStore, applyMiddleware, compose,} from 'redux'
import thunk from 'redux-thunk'
import {createLogger,} from 'redux-logger'
import reducers from './stores'

import {createBrowserHistory} from 'history'
import {routerMiddleware, connectRouter} from 'connected-react-router'

export const history = createBrowserHistory()


// chrome的react devtool 的扩展
/* eslint-disable no-undef */

const enhancerCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const logger = createLogger()

const configStore = (initialState) => {
  const middleware = [thunk, logger, routerMiddleware(history)]
  // const enhancers = []
  const store = createStore(connectRouter(history)(reducers), initialState, enhancerCompose(
    applyMiddleware(...middleware),
    // ...enhancers,
  ))

  if (module.hot) {
    module.hot.accept('./stores/index', () => store.replaceReducer(require('./stores/index').default))
  }
  return store
}

export default configStore
