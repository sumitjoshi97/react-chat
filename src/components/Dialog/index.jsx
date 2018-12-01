import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles.css'

export default class Dialog extends Component {
  static propTypes = {
    toggleDialog: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
  }

  state = {
    text: ''
  }

  onInputChange = e => {
    this.setState({ text: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.onSubmit(this.state.text)
    this.props.toggleDialog()
  }

  render() {
    return (
      <div className='main'>
        <form onSubmit={this.onSubmit} className='dialog-form'>
          <button onClick={this.props.toggleDialog} className='cancel'>
            x
          </button>
          <h1 className='header'>{`Add new ${this.props.name}`}</h1>
          <input
            type='text'
            placeholder='Type here..'
            onChange={this.onInputChange}
            className='input dialog-input'
          />
          <input type='submit' className='input button dialog-add-btn' value='Add' />
        </form>
      </div>
    )
  }
}
