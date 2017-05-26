import React, { Component } from 'react'
import logo from '../logo.svg'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getIndexData } from '../stores/reducer/test'
import '../style/pages/App.css'

const mapStateToProps = state => ({
  test: state.test.toJS(),
})

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({getIndexData}, dispatch)
  return {...actions, dispatch}
}

class App extends Component {

  handleClick () {
    console.log(this)
    return this.props.getIndexData()
  }

  render () {
    return (
      <div className="App">
        <div className="App-header">
          <p>点击logo有惊喜</p>
          <img src={logo} className="App-logo" onClick={this.handleClick.bind(this)} alt="logo"/>
        </div>
        <h2>Welcome to React</h2>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
