import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

class Room extends PureComponent {
  static propTypes = {
    roomName: PropTypes.string,
    selectionColor: PropTypes.string.isRequired,
    hoverColor: PropTypes.string.isRequired
  }

  render() {
    const { isCurrentRoom, selectionColor, hoverColor } = this.props

    const styles = {
      roomStyles: {
        ':hover': {
          background: hoverColor
        }
      },
      currentRoomStyles: {
        background: selectionColor
      }
    }

    const roomStyle = isCurrentRoom
      ? { ...styles.roomStyles, ...styles.currentRoomStyles }
      : styles.roomStyles

    return (
      <li
        className='list-item'
        style={roomStyle}
        onClick={this.props.setCurrentRoom}
      >
        {this.props.roomName}
      </li>
    )
  }
}

export default Radium(Room)
