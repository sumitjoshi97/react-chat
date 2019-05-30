import React, { useEffect, useRef } from 'react'

import Message from './Message'
import Scrollbar from '../Scrollbar'
import './styles.css'

const MessageList = ({ messages, theme }) => {
  let messageEndRef = useRef(null)

  const scrollToBottom = () => {
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages])

  const renderMessages = () => {
    return messages.map(message => (
      <Message
        key={message.id}
        messageSender={message.senderId}
        messageText={message.parts[0].payload.content}
        senderStyle={theme.fontSecondary}
        messageStyle={theme.fontPrimary}
      />
    ))
  }

  return (
    <ul className="message-list">
      <Scrollbar thumbColor={theme.primaryBackground}>
        {renderMessages()}
        <div ref={messageEndRef} />
      </Scrollbar>
    </ul>
  )
}

export default MessageList
