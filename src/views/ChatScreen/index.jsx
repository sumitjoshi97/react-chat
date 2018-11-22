import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit-client'

import Messagelist from '../../components/MessageList'
import SendMessageForm from '../../components/SendMessageForm'

export default class ChatScreen extends Component {
  state = {
    messages: [],
    currentRoom: {},
    currentUser: {},
    usersWhoAreTyping: []
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: process.env.REACT_APP_CHATKIT_INSTANCE,
      userId: this.props.currentUsername,
      tokenProvider: new Chatkit.TokenProvider({
        url: 'http://localhost:3001/auth'
      })
    })

    chatManager
      .connect()
      .then(currentUser => {
        this.setState({ currentUser })
        return currentUser.subscribeToRoom({
          roomId: '21344503',
          messageLimit: 100,
          hooks: {
            onMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              })
            },
            onUserStartedTyping: user => {
              this.setState({
                usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]
              })
            },
            onUserStoppedTyping: user => {
              this.setState({
                usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                  username => username !== user.name
                )
              })
            },
            onPresenceChange: () => this.forceUpdate(),
            onUserJoined: () => this.forceUpdate()
          }
        })
      })
      .then(currentRoom => this.setState({ currentRoom }))
      .catch(err => console.error(err))
  }

  sendMessage = text => {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id
    })
  }

  sendTypingEvent = () => {
    this.state.currentUser
      .isTypingIn({ roomId: this.state.currentRoom.id })
      .catch(err => console.error(err))
  }

  render() {
    const { usersWhoAreTyping } = this.state
    return (
      <div>
        <h1>Chat</h1>
        {this.props.currentUsername}
        <Messagelist messages={this.state.messages} />
        <p>
          {usersWhoAreTyping.length > 0
            ? JSON.stringify(this.state.usersWhoAreTyping)
            : null}
        </p>
        <SendMessageForm
          onSubmit={this.sendMessage}
          onChange={this.sendTypingEvent}
        />
      </div>
    )
  }
}
