/**
 * Created by mac on 2017/6/8.
 */

import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import App from '../pages/App'
import Admin from '../pages/Admin'

const Rrror = () => {
  return (
    <div>404页面</div>
  )

}

const Root = () => (
  <Router>
    <div>
      <header>我是你爹</header>
      <Route path="/" exact component={App}/>
      <Route path="/admin" component={Rrror}/>
    </div>
  </Router>
)

export default Root