/**
 * Created by mac on 2017/6/8.
 */

import React, {Component} from 'react'
import App  from '../containers/App.jsx'
import {Route, Link} from 'react-router-dom'
import {ConnectedRouter} from 'connected-react-router'

import About from '../containers/About.jsx'

export default class Root extends Component {
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <div>
          <h1>hello world</h1>
          <ul>
            <li><Link to="/app">App页面</Link></li>
            <li><Link to="/about">About页面</Link></li>
          </ul>
          <Route exact path="/app" component={App}/>
          <Route exact path="/about" component={About}/>
        </div>
      </ConnectedRouter>
    )
  }
}