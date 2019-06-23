import React from 'react'
import PropTypes from 'prop-types'

const TypingIndicator = ({ currentUsersTyping, currentRoomId, color }) => {
  const usersTyping = currentUsersTyping.filter(
    user => user.roomId === currentRoomId
  )

  const indicator =
    usersTyping.length > 0
      ? usersTyping.length > 1
        ? `${usersTyping[0].name} and ${usersTyping[1].name},... are typing`
        : `${usersTyping[0].name} is typing`
      : null

  return (
    <p className="typing-indicator" style={{ color }}>
      {indicator}
    </p>
  )
}

TypingIndicator.propTypes = {
  currentUsersTyping: PropTypes.array.isRequired,
  currentRoomId: PropTypes.string,
  color: PropTypes.string,
}

export default TypingIndicator
