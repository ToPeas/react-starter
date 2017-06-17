/**
 * Created by mac on 2017/6/8.
 */

import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router/immutable'
import App from '../containers/App'
import About from '../containers/About'
import Admin from '../containers/Admin'
import NotFound from '../containers/NotFound'
import Login from '../containers/Login'
import PrivateRoute from './PrivateRoute'
import './routes.less'

const Index = () => (
  <div style={{ marginTop: '60px', textAlign: 'center' }}>一个没有牌面的首页</div>

)

const Miss = () => (
  <div style={{ marginTop: '60px', textAlign: 'center' }}>miss页面</div>

)

const Root = props => (
  <ConnectedRouter history={props.history}>
    <div>
      <h1>hello world</h1>
      <ul className="nav">
        {/* <li><Link to="/markdown">markdown页面</Link></li>*/}
        <li><Link to="/app">app</Link></li>
        <li><Link to="/miss">Miss页面</Link></li>
        <li><Link to="/admin">Admin页面</Link></li>
        <li><Link to="/login">登录页面</Link></li>
      </ul>
      <Switch>
        <Route exact path="/" component={Index}/>
        <PrivateRoute exact path="/app" component={App}/>
        <PrivateRoute exact path="/admin" component={Admin}/>
        <Route exact path="/login" component={Login}/>
        <PrivateRoute path="/miss" component={Miss}/>
        <Route render={() => (<NotFound />)}/>
      </Switch>
    </div>
  </ConnectedRouter>
)

export default Root
