/**
 * Created by mac on 2017/6/16.
 */

import React from 'react'
import {BrowserRouter as Router, Link, Redirect, Route} from 'react-router-dom'
import {message} from 'antd'


const token = sessionStorage.getItem('token')


console.log('', token)


const PrivateRoute = ({ component: Component, ...rest }) => {
  if (!token) message.error('token不存在,请重新登录')

  return (<Route {...rest} render={props => (
    token ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>)
}
export default PrivateRoute