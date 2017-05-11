import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './pages/App.jsx'
import { configStore } from './store'
import './style/index.css'

const store = configStore()

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)
