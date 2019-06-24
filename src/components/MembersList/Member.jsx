import React from 'react'
import PropTypes from 'prop-types'

const Member = ({ memberName, memberPresence, ...props }) => {
  const presenceStyle =
    memberPresence.state === 'online'
      ? { background: props.memberOnlineColor }
      : { background: props.memberOfflineColor }

  return (
    <li className="list-item">
      <span className="presence" style={presenceStyle} />
      {memberName}
    </li>
  )
}

Member.propTypes = {
  memberName: PropTypes.string.isRequired,
  memberPresence: PropTypes.object.isRequired,
  memberOfflineColor: PropTypes.string.isRequired,
  memberOnlineColor: PropTypes.string.isRequired,
}

export default Member
