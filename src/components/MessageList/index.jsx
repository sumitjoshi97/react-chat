import React from 'react'
import PropTypes from 'prop-types'

import Message from './Message'
import './styles.css'

const MessageList = ({ messages, theme }) => {
  return (
    <ul className='message-list'>
      {messages.map(message => (
        <Message
          key={message.id}
          messageSender={message.senderId}
          messageText={message.text}
          senderStyle={theme.fontSecondary}
          messageStyle={theme.fontPrimary}
        />
      ))}
    </ul>
  )
}

MessageList.propTypes = {
  messages: PropTypes.array,
  theme: PropTypes.object.isRequired
}

export default MessageList
