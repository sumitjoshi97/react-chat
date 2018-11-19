import React, { Component } from 'react'

export default class ChatScreen extends Component {
  render() {
    return (
      <div>
        ChatScreen
        {this.props.currentUsername}
      </div>
    )
  }
}
