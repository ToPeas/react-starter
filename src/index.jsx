import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import App from './pages/App'
import configStore from './store'
import './style/index.css'

if (module.hot) {
  module.hot.accept()
}

const store = configStore()

const rootEl = document.getElementById('root')
const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    rootEl,
  )

render(App)
if (module.hot) module.hot.accept('./pages/App', () => render(App))
