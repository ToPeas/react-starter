import React, { Component } from 'react'

export default class Hello extends Component {
  state = {id: 2}

  handleClick () {
    this.setState({
      id: 3
    })
  }

  render () {
    return (
      <footer>
        <div onClick={this.handleClick.bind(this)} className="topeas">think</div>
        <p className='cc'>flower</p>
        <p id="cc">{this.state.id}</p>
      </footer>
    )
  }
}
