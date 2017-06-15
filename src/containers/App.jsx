/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import logo from '../asset/imgs/logo.svg'
import '../style/pages/App.less'
import Markdown from '../components/Markdown'

const mapStateToProps = state => ({
  // immutable最原始的写法
  markdown: state.get('markdown').toJS(),
  state,
})

const mapDispatchToProps = dispatch =>
  // const actions = bindActionCreators({ getIndexData }, dispatch)
   ({ dispatch })

class App extends Component {

  goto() {
    this.props.dispatch(push('/about'))
  }

  render() {
    return (
      <div className="App">
        <h2>裴大哥爱你哟</h2>
        <div>
          <p>点击logo，进行redux的跳转</p>
          <img className="App-logo" src={logo} onClick={this.goto.bind(this)} alt="logo" />
        </div>
        <Markdown />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
