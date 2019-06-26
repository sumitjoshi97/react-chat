import React from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

const Room = ({ roomName, isCurrentRoom, ...props }) => {
  const styles = {
    roomStyles: {
      ':hover': {
        background: props.hoverColor,
      },
    },
    currentRoomStyles: {
      background: props.selectionColor,
    },
  }

  const roomStyle = isCurrentRoom
    ? { ...styles.roomStyles, ...styles.currentRoomStyles }
    : styles.roomStyles

  return (
    <li className="list-item" style={roomStyle} onClick={props.setCurrentRoom}>
      {roomName}
    </li>
  )
}

Room.propTypes = {
  roomName: PropTypes.string,
  isCurrentRoom: PropTypes.bool.isRequired,
  selectionColor: PropTypes.string.isRequired,
  hoverColor: PropTypes.string.isRequired,
  setCurrentRoom: PropTypes.func.isRequired,
}

export default Radium(Room)
