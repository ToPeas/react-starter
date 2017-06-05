import React, { Component } from 'react'

export default class Hello extends Component {
  handleClick () {

    console.log('111')
  }

  render () {
    return (
      <footer>
        <div onClick={this.handleClick.bind(this)} className="topeas">Martox</div>
        <p className='cc'>topeas</p>
      </footer>
    )
  }
}
