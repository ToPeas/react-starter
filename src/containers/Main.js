/**
 * Created by topeas on 2017/6/18.
 */

import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
const { Header, Content, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu
import styles from '../style/pages/dashborad.less'

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
    mode: 'inline',
  }
  onCollapse = (collapsed) => {
    console.log(collapsed)
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    })
  }

  render () {
    return (
      <Layout className={styles.index}>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['2']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
            <SubMenu key="sub1" title={<span><Icon type="user"/>subnav 1</span>}>
              <Menu.Item key="1"><Link to="/article/create">创建文章</Link></Menu.Item>
              <Menu.Item key="2"><Link to='/article/edit'>修改文章</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="laptop"/>subnav 2</span>}>
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" title={<span><Icon type="notification"/>subnav 3</span>}>
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
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
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            ©2017 Created by ToPeas
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
const mapStateToProp = (state) => {
  return { state }
}

const mapDispatchToProp = (dispatch) => {
  return { dispatch }
}

export default connect(mapStateToProp, mapDispatchToProp)(withRouter(SiderDemo))