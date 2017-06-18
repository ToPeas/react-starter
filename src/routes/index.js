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
import Main from '../containers/Main'
import Dashborad from '../containers/Dashborad'
import Article from '../containers/Article'
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
      <Switch>
        <Route exact path="/" component={Index}/>
        <PrivateRoute exact path="/dashborad" component={Main}/>
        <PrivateRoute path="/article" component={Article}/>
        <PrivateRoute exact path="/admin" component={Admin}/>
        <Route exact path="/login" component={Login}/>
        <Route render={() => (<NotFound />)}/>
      </Switch>
    </div>
  </ConnectedRouter>
)

export default Root
