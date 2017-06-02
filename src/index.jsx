import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import App from './pages/App'
import configStore from './store'
import './style/index.css'

// console.log(React)
if (module.hot) {
  module.hot.accept()
}

const store = configStore()

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  document.getElementById('root'),
)
const render = ReactDOM.render

if (module.hot) module.hot.accept('./pages/App', () => render(App))
