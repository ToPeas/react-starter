/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import logo from '../asset/imgs/logo.svg'
import {getIndexData} from '../stores/reducer/reduceApp'
import '../style/pages/App.css'
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
    console.log(this)
    return this.props.getIndexData()
  }

  render() {
    // console.log('',)
    return (
      <div className="App">
        <div className="App-header">
          <p>点击logo</p>
          <img src={logo} className="App-logo" onClick={this.handleClick.bind(this)} alt="logo"/>
        </div>
        <h2>裴大哥爱你哟</h2>
        <Hello cc="裴大哥爱你"/>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Markdown/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
