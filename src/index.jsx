import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'react-redux'
// import App from './pages/App'
import configStore from './store'
import './style/index.css'
import Root from './routes'

// console.log(React)
// if (module.hot) {
//   module.hot.accept()
// }

const store = configStore()


const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};
//
// ReactDOM.render(
//   <AppContainer>
//     <Provider store={store}>
//       <Root />
//     </Provider>
//   </AppContainer>,
//   document.getElementById('root'),
// )
render(Root)

if (module.hot) {
  module.hot.accept('./routes', () => {
    const newApp = require('./routes').default;
    render(newApp);
  });
}

// if (module.hot) module.hot.accept('./pages/App', () => render(App))
