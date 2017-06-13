/**
 * Created by topeas on 2017/5/11.
 */
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createBrowserHistory } from 'history'
import { routerMiddleware, connectRouter } from 'connected-react-router/immutable'
import reducers from './stores/index'

export const history = createBrowserHistory()

// chrome的react devtool 的扩展
/* eslint-disable no-undef */

const enhancerCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const logger = createLogger()

const configStore = (initialState) => {
  const middleware = [routerMiddleware(history), thunk, logger]
  const store = createStore(connectRouter(history)(reducers), initialState,
    enhancerCompose(applyMiddleware(...middleware)))

  if (module.hot) {
    module.hot.accept('./stores/index', () => store.replaceReducer(require('./stores/index').default))
  }
  return store
}

export default configStore
