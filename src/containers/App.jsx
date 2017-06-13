/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import logo from '../asset/imgs/logo.svg'
import { getIndexData } from '../stores/reducer/reduceApp'
import '../style/pages/App.less'
import Hello from '../components/Hello'
import Markdown from '../components/Markdown'

const mapStateToProps = state => ({
  test: state.markdown.toJS(),
})

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({ getIndexData }, dispatch)
  return { ...actions, dispatch }
}

class App extends Component {
  handleClick() {
    return this.props.getIndexData()
  }

  goto() {
    this.props.dispatch(push('/about'))
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <p>点击第一个logo，发送一个异步的请求</p>
          <img className="App-logo" src={logo} onClick={this.handleClick.bind(this)} alt="logo" />
        </div>
        <h2>裴大哥爱你哟</h2>
        <div>
          <p>点击第二个logo，进行redux的跳转</p>
          <img className="App-logo" src={logo} onClick={this.goto.bind(this)} alt="logo" />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
