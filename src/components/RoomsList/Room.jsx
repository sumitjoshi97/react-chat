import React, { Component } from 'react'
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

}

export default Radium(Room)
