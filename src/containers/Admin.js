/**
 * Created by mac on 2017/6/9.
 */

import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd'
import { connect } from 'react-redux'
const { Header, Content, Footer, Sider, Tag } = Layout
import { getOne } from '../stores/reducer/posts'
const SubMenu = Menu.SubMenu
import '../style/admin.css'

const mapStateToProps = state => ({
  // immutable最原始的写法
  markdown: state.get('markdown').toJS(),
  state,
})

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({ getOne }, dispatch)

  return {
    ...actions, dispatch,
  }
}

class SiderDemo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: false,
      mode: 'inline',
    }
    this.handleClick = this.handleClick.bind(this)
  }

  onCollapse = (collapsed) => {
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    })
  }

  handleClick () {
    this.props.getOne({ id: '594129e87bd23be623ed6e25' })
  }

  componentWillMount () {
    console.log('', this)
  }

  render () {
    return (
      <Layout>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo"/>
          <Menu theme="dark" mode={this.state.mode} defaultSelectedKeys={[ '6' ]}>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user"/><span className="nav-text">User</span></span>}
            >
              <Menu.Item key="1">Tom</Menu.Item>
              <Menu.Item key="2">Bill</Menu.Item>
              <Menu.Item key="3">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team"/><span className="nav-text">Team</span></span>}
            >
              <Menu.Item key="4">Team 1</Menu.Item>
              <Menu.Item key="5">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="6">
              <span>
                <Icon type="file"/>
                <span className="nav-text">File</span>
              </span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}/>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '12px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Button onClick={this.handleClick}>发送请求</Button>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SiderDemo)
