import React from 'react'
import PropTypes from 'prop-types'

import Member from './Member'
import Scrollbar from '../Scrollbar'

const MembersList = ({ members, theme, ...props }) => {
  const styles = {
    listStyles: {
      background: theme.primaryBackground,
      color: theme.fontPrimary,
    },
    buttonStyles: {
      background: theme.secondaryBackground,
      color: theme.fontPrimary,
    },
  }

  const renderMembers = () => {
    if (members) {
      return members.map(member => {
        return (
          <Member
            key={member.id}
            memberName={member.name}
            memberPresence={member.presence}
            memberOfflineColor={theme.memberOffline}
            memberOnlineColor={theme.memberOnline}
          />
        )
      })
    }
  }

  return (
    <div className="column" style={styles.listStyles}>
      <div className="list-header">Members list</div>
      <ul className="list">
        <Scrollbar thumbColor={theme.secondaryBackground} autoHide>
          {renderMembers()}
        </Scrollbar>
      </ul>
      <button
        className="add-btn"
        style={styles.buttonStyles}
        onClick={() => props.handleDialog('member to room')}
      >
        Add
      </button>
    </div>
  )
}

MembersList.propTypes = {
  members: PropTypes.array,
  theme: PropTypes.object.isRequired,
  toggleDialog: PropTypes.func,
}

export default MembersList
