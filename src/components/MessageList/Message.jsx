import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class Message extends PureComponent {
  static propTypes = {
    messageSender: PropTypes.string,
    messageText: PropTypes.string
  }

  render() {
    const { messageSender, messageText } = this.props

    return (
      <li className='message'>
        <span
          className='message-sender'
          style={{ color: this.props.senderStyle }}
        >
          {messageSender}
        </span>
        <p className='message-text' style={{ color: this.props.messageStyle }}>
          {messageText}
        </p>
      </li>
    )
  }
}
