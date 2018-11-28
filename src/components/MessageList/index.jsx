import React, { Component } from 'react'

import './styles.css'

export default class MessageList extends Component {
  render() {
    return (
      <ul className='message-list'>
        {this.props.messages.map((message, index) => (
          <li key={index} className='message'>
            <span className='message-sender'>{message.senderId}</span>
            <p className='message-text'>{message.text}</p>
          </li>
        ))}
      </ul>
    )
  }
}
