import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Room from './Room'

export default class RoomsList extends Component {
  static propTypes = {
    theme: PropTypes.object.isRequired
  }

  renderRooms = () => {
    const { rooms } = this.props
    if (rooms) {
      return this.props.rooms.map(room => (
        <Room
          key={room.id}
          roomName={room.name}
          classes={
            this.props.currentRoom.id === room.id
              ? 'list-item current-room'
              : 'list-item'
          }
          setCurrentRoom={() => this.props.setCurrentRoom(room.id)}
        />
      ))
    }
  }

  render() {
    const { theme } = this.props

    const styles = {
      listStyles: {
        background: theme.primaryBackground,
        color: theme.fontPrimary
      },
      buttonStyles: {
        background: theme.secondaryBackground,
        color: theme.fontPrimary
      }
    }
    return (
      <div className='column' style={styles.listStyles}>
        <ul className='list'>
          <li className='list-header'>Your Rooms</li>
          {this.renderRooms()}
        </ul>
        <button
          className='add-btn'
          style={styles.buttonStyles}
          onClick={() => this.props.toggleDialog('room')}
        >
          create Room
        </button>
      </div>
    )
  }
}
