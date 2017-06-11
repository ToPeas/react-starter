import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import configStore from './store'
<<<<<<< HEAD
=======
import createHistory from 'history/createBrowserHistory'
>>>>>>> 4389d28... :memo: :bug: 更新update
import './style/index.less'
import App from './routes/index'
import styles from './style/less/main.less'

const history = createHistory()

const store = configStore()

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component history={history}/>
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./routes/index', () => {
    const newApp = require('./routes/index').default
    render(newApp)
  })
}

