import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import App from './pages/App'
import configStore from './store'
import './style/index.css'
// import 'normalize.css/normalize.css'
// import 'font-awesome/css/font-awesome.css'
// import 'react-mde/lib/styles/react-mde.scss'
// import 'react-mde/lib/styles/react-mde-command-styles.scss'
// import 'react-mde/lib/styles/markdown-default-theme.scss'
// import './styles/demo.scss';

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
