import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit-client'

import Header from '../../components/Header'
import RoomsList from '../../components/RoomsList'
import MembersList from '../../components/MembersList'
import Messagelist from '../../components/MessageList'
import SendMessageForm from '../../components/SendMessageForm'

import './styles.css'

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
  addRoom = name => {
    this.state.currentUser
      .createRoom({ name })
      .then(room => {
        this.subscribeUserToRoom(this.state.currentUser, room)
        this.fetchMessagesForCurrentRoom(room)
        this.setState({ currentRoom: room })
      })
      .catch(err => console.error(err))
  }

  addMemberToRoom = member => {
    const { currentUser, currentRoom } = this.state
    currentUser
      .addUserToRoom({
        userId: member,
        roomId: currentRoom.id
      })
      .catch(err => console.error(err))
  }

  setCurrentRoom = roomId => {
    const { currentUser } = this.state
    const room = currentUser.rooms.find(room => room.id === roomId)
    this.setState({
      currentRoom: room,
      usersWhoAreTyping: []
    })
    this.fetchMessagesForCurrentRoom(room)
  }

  fetchMessagesForCurrentRoom = room => {
    return this.state.currentUser
      .fetchMessages({
        roomId: room.id,
        limit: 10
      })
      .then(messages => this.setState({ messages }))
      .catch(err => console.error(err))
  }

  render() {
    const { usersWhoAreTyping } = this.state
    return (
      <>
        <Header />
        <div className='chat-screen'>
          <RoomsList />

          <div className='chat'>
            <Messagelist messages={this.state.messages} />
            {/* <p>
          {usersWhoAreTyping.length > 0
            ? JSON.stringify(this.state.usersWhoAreTyping)
            : null}
        </p> */}
            <SendMessageForm
              onSubmit={this.sendMessage}
              onChange={this.sendTypingEvent}
            />
          </div>

          <MembersList />
        </div>
      </>
    )
  }
}
