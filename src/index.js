import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import configStore, { history } from './store'
import './style/index.less'
import App from './routes/index'

const store = configStore()
console.log('', store)

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

export default store
if (module.hot) {
  module.hot.accept('./routes/index', () => {
    const newApp = require('./routes/index').default
    render(newApp)
  })
}

