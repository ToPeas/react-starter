/**
 * Created by topeas on 2017/6/18.
 */

import React from 'react'
import Create from '../components/Airicle/create'
import Edit from '../components/Airicle/edit'
import { Route, Switch } from 'react-router-dom'
import Main from './Main'
import App from './App'

const DashBoard = () => {
  return (<div>
    <Main>
      <Switch>
        <Route exact path='/article/create' component={Create}/>
        <Route exact path='/article/edit' component={Edit}/>
      </Switch>
    </Main>
  </div>)
}

export default DashBoard
