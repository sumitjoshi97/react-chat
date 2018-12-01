import React from 'react'
import PropTypes from 'prop-types'

import Message from './Message'
import './styles.css'

const MessageList = ({ messages }) => {
  return (
    <ul className='message-list'>
      {messages.map(message => (
        <Message
          key={message.id}
          messageSender={message.senderId}
          messageText={message.text}
        />
      ))}
    </ul>
  )
}

MessageList.propTypes = {
  messages: PropTypes.array
}

export default MessageList
