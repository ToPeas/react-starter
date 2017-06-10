/**
 * Created by mac on 2017/6/8.
 */

import React, { Component } from 'react'
import App  from '../containers/App.jsx'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import Hello from '../components/Hello'

export default class Root extends Component {
  render () {
    const {history} = this.props
    return (
      <BrowserRouter >
        <div>
          <h1>你好，世界</h1>
          <ul>
            <li><Link to="/login">Home</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
          <Route path="/" exact component={App}/>
          <Route path="/login" component={Hello}/>
          <Route path="/about" component={App}/>
        </div>
      </BrowserRouter>
    )
  }
}
