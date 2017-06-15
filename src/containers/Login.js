/**
 * Created by topeas on 2017/6/15.
 */

import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { login, register } from '../stores/reducer/admin'
import  './login.less'

const mapStateToProps = (state) => {
  return {
    admin: state.get('admin').toJS(),
  }
}

const mapDispatchToProps = dispatch => {
  const actions = bindActionCreators({ login }, dispatch)
  return { ...actions }
}

const FormItem = Form.Item

class Login extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { username, password } = values
        this.props.login({ username, password })
      }
    })
  }

  render () {

    const { getFieldDecorator } = this.props.form
    return (
      <section>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('username', {
              rules: [ { required: true, message: 'Please input your username!' } ],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }}/>} placeholder="Username"/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [ { required: true, message: 'Please input your Password!' } ],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }}/>} type="password" placeholder="Password"/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <a className="login-form-forgot" href="">Forgot password</a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="">register now!</a>
          </FormItem>
        </Form>
      </section>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(Login)
export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm)
