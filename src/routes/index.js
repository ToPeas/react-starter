/**
 * Created by mac on 2017/6/8.
 */

import React from 'react'
import {Route, Link, Switch} from 'react-router-dom'
import {ConnectedRouter} from 'connected-react-router/immutable'
import App from '../containers/App'
import About from '../containers/About'

const Root = props => (
  <ConnectedRouter history={props.history}>
    <div>
      <h1>hello world</h1>
      <ul>
        <li><Link to="/app">App页面</Link></li>
        <li><Link to="/about">About页面</Link></li>
        <li><Link to="/miss">Miss页面</Link></li>
      </ul>
      <Switch>
        <Route exact path="/app" component={App}/>
        <Route exact path="/about" component={About}/>
        <Route path="/miss" render={() => (<div>Miss</div>)}/>
      </Switch>
    </div>
  </ConnectedRouter>
)

export default Root
