/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import logo from '../asset/imgs/logo.svg'
import {getIndexData} from '../stores/reducer/reduceApp'
import '../style/pages/App.less'
import Hello from '../components/Hello'
import {push} from 'connected-react-router'

const mapStateToProps = state => ({
  test: state.test.toJS(),
})

const mapDispatchToProps = (dispatch) => {
  const jumpByredux = () => dispatch(push('/about'))
  const actions = bindActionCreators({ getIndexData, jumpByredux }, dispatch)
  return { ...actions, dispatch }
}

class App extends Component {
  handleClick() {
    return this.props.getIndexData()
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <p>点击第一个logo，发送一个异步的请求</p>
          <img className="App-logo" src={logo} onClick={this.handleClick.bind(this)} alt="logo"/>
        </div>
        <h2>裴大哥爱你哟</h2>
        <div>
          <p>点击第二个logo，进行redux的跳转</p>
          <img className="App-logo" src={logo} onClick={this.props.jumpByredux} alt="logo"/>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
