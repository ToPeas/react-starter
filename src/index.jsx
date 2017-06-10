import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import configStore from './store'
import './style/index.css'
import App from './routes/index'
import createHistory from 'history/createBrowserHistory'
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

