import React from 'react'
import PropTypes from 'prop-types'

import Message from './Message'
import Scrollbar from '../Scrollbar'
import './styles.css'

const MessageList = ({ messages, theme }) => {
  const messagesList = messages.map(message => (
    <Message
      key={message.id}
      messageSender={message.senderId}
      messageText={message.text}
      senderStyle={theme.fontSecondary}
      messageStyle={theme.fontPrimary}
    />
  ))
  return (
    <ul className='message-list'>
      <Scrollbar thumbColor={theme.primaryBackground}>{messagesList}</Scrollbar>
    </ul>
  )
}

MessageList.propTypes = {
  messages: PropTypes.array,
  theme: PropTypes.object.isRequired
}

export default MessageList
