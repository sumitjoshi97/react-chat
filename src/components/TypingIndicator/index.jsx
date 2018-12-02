import React from 'react'

const TypingIndicator = ({ usersWhoAreTyping }) => {
  const indicator =
    usersWhoAreTyping.length > 0
      ? usersWhoAreTyping.length > 1
        ? `${usersWhoAreTyping[0]} and ${usersWhoAreTyping[1]},... are typing`
        : `${usersWhoAreTyping[0]} is typing`
      : null

  return <p className='typing-indicator'>{indicator}</p>
}

export default TypingIndicator
