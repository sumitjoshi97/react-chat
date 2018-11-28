import React, { Component } from 'react'

import './styles.css'

export default class SendMessageForm extends Component {
  state = {
    text: ''
  }

  onChange = e => {
    this.setState({ text: e.target.value })
    if (this.props.onChange) {
      this.props.onChange()
    }
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.onSubmit(this.state.text)
    this.setState({ text: '' })
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className='message-form'>
        <input
          type='text'
          placeholder='Enter message to send..'
          onChange={this.onChange}
          className='message-input'
        />
        <input type='submit' className='message-send' value='send..' />
      </form>
    )
  }
}
