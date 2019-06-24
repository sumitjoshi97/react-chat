import React from 'react'
import PropTypes from 'prop-types'
import { handleCurrentRoom } from '../../store/actions'
import Room from './Room'
import Scrollbar from '../Scrollbar'

const RoomsList = ({ currentUser, currentRoom, theme, ...props }) => {
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

  const renderRooms = () => {
    if (currentUser.hasOwnProperty('roomStore')) {
      return Object.values(currentUser.roomStore.rooms).map(room => (
        <Room
          key={room.id}
          roomName={room.name}
          isCurrentRoom={currentRoom.id === room.id}
          setCurrentRoom={() => {
            currentRoom.id !== room.id &&
              handleCurrentRoom(currentUser, room.id, props.dispatch)
          }}
          selectionColor={theme.secondaryBackground}
          hoverColor={theme.tertiaryBackground}
        />
      ))
    }
  }

  return (
    <div className="column" style={styles.listStyles}>
      <div className="list-header">Your Rooms</div>
      <ul className="list">
        <Scrollbar thumbColor={theme.secondaryBackground} autoHide>
          {renderRooms()}
        </Scrollbar>
      </ul>
      <button
        className="add-btn"
        style={styles.buttonStyles}
        onClick={() => props.handleDialog('room')}
      >
        create Room
      </button>
    </div>
  )
}

RoomsList.propTypes = {
  currentUser: PropTypes.object.isRequired,
  currentRoom: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  handleDialog: PropTypes.func.isRequired,
}

export default RoomsList
