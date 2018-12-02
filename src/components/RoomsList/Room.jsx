import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Room extends Component {
  static propTypes = {
    roomName: PropTypes.string
  }

  render() {
    return (
      <li className={this.props.classes} onClick={this.props.setCurrentRoom}>
        {this.props.roomName}
      </li>
    )
  }
}
