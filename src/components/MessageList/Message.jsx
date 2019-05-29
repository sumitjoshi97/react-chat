import React from 'react'
import PropTypes from 'prop-types'

const Message = ({ messageSender, messageText, ...props }) => (
  <li className="message">
    <span className="message-sender" style={{ color: props.senderStyle }}>
      {messageSender}
    </span>
    <p className="message-text" style={{ color: props.messageStyle }}>
      {messageText}
    </p>
  </li>
)

Message.propTypes = {
  messageSender: PropTypes.string,
  messageText: PropTypes.string,
}

export default Message
