import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.css'

export default class SendMessageForm extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    onSubmit: PropTypes.func
  }

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
    const { theme } = this.props

    const styles = {
      inputStyles: {
        background: theme.tertiaryBackground,
        color: theme.fontPrimary
      },
      buttonStyles: {
        background: theme.primaryBackground,
        color: theme.fontPrimary
      }
    }

    return (
      <form onSubmit={this.onSubmit} className='message-form'>
        <input
          type='text'
          placeholder='Enter message to send..'
          onChange={this.onChange}
          value={this.state.text}
          className='message-input'
          style={styles.inputStyles}
        />
        <input
          type='submit'
          className='message-send button'
          style={styles.buttonStyles}
          value='send..'
        />
      </form>
    )
  }
}
