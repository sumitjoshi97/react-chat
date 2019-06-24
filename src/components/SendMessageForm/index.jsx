import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './styles.css'

const SendMessageForm = ({ theme, ...props }) => {
  const [message, setMessage] = useState('')

  const styles = {
    inputStyles: {
      background: theme.tertiaryBackground,
      color: theme.fontPrimary,
    },
    buttonStyles: {
      background: theme.primaryBackground,
      color: theme.fontPrimary,
    },
  }

  const handleChange = e => {
    props.handleTypingIndicator()

    setMessage(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    props.handleMessageForm(message)
    setMessage('')
  }

  return (
    <form onSubmit={handleSubmit} className="message-form">
      <input
        type="text"
        placeholder="Enter message to send.."
        onChange={handleChange}
        value={message}
        className="message-input"
        style={styles.inputStyles}
      />
      <input
        type="submit"
        className="message-send button"
        style={styles.buttonStyles}
        value="send.."
      />
    </form>
  )
}

SendMessageForm.propTypes = {
  theme: PropTypes.object.isRequired,
  handleMessageForm: PropTypes.func.isRequired,
  handleTypingIndicator: PropTypes.func.isRequired,
}

export default SendMessageForm
