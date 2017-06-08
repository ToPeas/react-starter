/**
 * Created by mac on 2017/6/8.
 */

import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import App from '../pages/App'

export default class Root extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={App}/>
      </Router>
    );
  }
}