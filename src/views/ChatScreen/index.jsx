import React, { useState, useContext, useEffect } from 'react'
import Chatkit from '@pusher/chatkit-client'

import { Store } from '../../store/Store'

import Dialog from '../../components/Dialog'
import Header from '../../components/Header'
import RoomsList from '../../components/RoomsList'
import MembersList from '../../components/MembersList'
import Messagelist from '../../components/MessageList'
import TypingIndicator from '../../components/TypingIndicator'
import SendMessageForm from '../../components/SendMessageForm'
import Setting from '../../components/Setting'
import './styles.css'
import {
  connectToChatkit,
  addRoom,
  addMemberToRoom,
  sendMessage,
  sendTypingEvent,
} from '../../store/Actions'

const ChatScreen = () => {
  const { state, dispatch } = useContext(Store)
  const {
    isAuth,
    userId,
    currentUser,
    currentRoom,
    messages,
    currentUsersTyping,
    theme,
  } = state
  const [isDialogActive, toggleDialog] = useState(false)
  const [activeDialog, setDialog] = useState('')
  const [isSettingActive, toggleSettingPane] = useState(false)

  const chatManager = new Chatkit.ChatManager({
    instanceLocator: process.env.REACT_APP_CHATKIT_INSTANCE,
    userId: userId,
    tokenProvider: new Chatkit.TokenProvider({
      url: `${process.env.REACT_APP_SERVER_URI}/auth`,
    }),
  })

  useEffect(() => {
    isAuth && connectToChatkit(chatManager, dispatch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleMessageForm = message => {
    sendMessage(currentUser, currentRoom, message)
  }

  const handleDialog = (name = '') => {
    toggleDialog(!isDialogActive)
    setDialog(name)
  }

  const handleRoomDialog = room => {
    addRoom(currentUser, room, dispatch)
  }

  const handleMemberDialog = member => {
    addMemberToRoom(currentUser, currentRoom, member)
  }

  const onDialogSubmit =
    activeDialog === 'room' ? handleRoomDialog : handleMemberDialog

  const handleSettings = () => {
    toggleSettingPane(!isSettingActive)
  }

  const dialog = isDialogActive ? (
    <Dialog
      name={activeDialog}
      handleDialog={handleDialog}
      onSubmit={onDialogSubmit}
    />
  ) : null

  if (isSettingActive) {
    return (
      <Setting
        currentTheme={theme}
        handleSettings={handleSettings}
        dispatch={dispatch}
      />
    )
  } else {
    return (
      <>
        <Header theme={theme} handleSettings={handleSettings} />
        <div className="chat-screen">
          <RoomsList
            handleDialog={handleDialog}
            theme={theme}
            currentUser={currentUser}
            currentRoom={currentRoom}
            dispatch={dispatch}
          />

          <div
            className="chat"
            style={{ background: theme.secondaryBackground }}
          >
            <Messagelist messages={messages} theme={theme} />
            <div className="chat-form">
              <TypingIndicator
                currentUsersTyping={currentUsersTyping}
                currentRoomId={currentRoom.id}
                color={theme.fontSecondary}
              />
              <SendMessageForm
                theme={theme}
                handleTypingIndicator={() =>
                  sendTypingEvent(currentUser, currentRoom.id)
                }
                handleMessageForm={handleMessageForm}
              />
            </div>
          </div>

          <MembersList
            handleDialog={handleDialog}
            theme={theme}
            members={currentRoom.users}
          />
        </div>
        {dialog}
      </>
    )
  }
}

export default ChatScreen

// state = {
//   currentUser: {},
//   currentRoom: {},
//   messages: [],
//   usersWhoAreTyping: [],
//   isDialogActive: false,
//   dialogName: '',
//   isSettingActive: false,
//   currentTheme: 'blue'
// }

// componentDidMount() {
//   const chatManager = new Chatkit.ChatManager({
//     instanceLocator: process.env.REACT_APP_CHATKIT_INSTANCE,
//     userId: this.props.currentUsername,
//     tokenProvider: new Chatkit.TokenProvider({
//       url: `${process.env.REACT_APP_SERVER_URI}/auth`
//     })
//   })

//   chatManager
//     .connect({
//       onAddedToRoom: room => this.forceUpdate()
//     })
//     .then(currentUser => {
//       this.setState({ currentUser })

//       if (currentUser.rooms.length > 0) {
//         return currentUser.rooms.map(room =>
//           this.subscribeUserToRoom(currentUser, room.id)
//         )
//       } else {
//         return this.subscribeUserToRoom(
//           currentUser,
//           process.env.REACT_APP_GENERAL_ROOM_ID
//         ) //subscribe to general room for first time user
//       }
//     })
//     .then(() => {
//       const currentRoom = this.state.currentUser.rooms[0]
//       this.setState({ currentRoom })
//     })
//     .then(() => {
//       return this.fetchMessagesForCurrentRoom(this.state.currentRoom)
//     })
//     .catch(err => console.error(err))
// }

//   subscribeUserToRoom = (user, roomId) => {
//     return user.subscribeToRoom({
//       roomId,
//       messageLimit: 30,
//       hooks: {
//         onMessage: message => {
//           this.setState({
//             messages: [...this.state.messages, message]
//           })
//         },
//         onUserStartedTyping: user => {
//           this.setState({
//             usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]
//           })
//         },
//         onUserStoppedTyping: user => {
//           this.setState({
//             usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
//               username => username !== user.name
//             )
//           })
//         },
//         onPresenceChange: () => this.forceUpdate(),
//         onUserJoined: () => this.forceUpdate()
//       }
//     })
//   }

//   sendMessage = text => {
//     this.state.currentUser.sendMessage({
//       text,
//       roomId: this.state.currentRoom.id
//     })
//   }

//   sendTypingEvent = () => {
//     this.state.currentUser
//       .isTypingIn({ roomId: this.state.currentRoom.id })
//       .catch(error => console.error('error', error))
//   }

//   addRoom = name => {
//     this.state.currentUser
//       .createRoom({ name })
//       .then(room => {
//         console.log('add room', room, room.id)
//         this.subscribeUserToRoom(this.state.currentUser, room.id)
//         this.fetchMessagesForCurrentRoom(room)
//         this.setState({ currentRoom: room })
//       })
//       .catch(err => console.error(err))
//   }

//   addMemberToRoom = member => {
//     const { currentUser, currentRoom } = this.state
//     currentUser
//       .addUserToRoom({
//         userId: member,
//         roomId: currentRoom.id
//       })
//       .catch(err => console.error(err))
//   }

//   setCurrentRoom = roomId => {
//     const { currentUser } = this.state
//     const room = currentUser.rooms.find(room => room.id === roomId)
//     this.setState({
//       currentRoom: room,
//       usersWhoAreTyping: []
//     })
//     this.fetchMessagesForCurrentRoom(room)
//   }

//   fetchMessagesForCurrentRoom = room => {
//     return this.state.currentUser
//       .fetchMessages({
//         roomId: room.id,
//         limit: 30
//       })
//       .then(messages => this.setState({ messages }))
//       .catch(err => console.error(err))
//   }

//   toggleSettings = () => {
//     this.setState(prevState => ({
//       isSettingActive: !prevState.isSettingActive
//     }))
//   }

//   setTheme = theme => {
//     if (theme !== this.state.currentTheme) {
//       this.setState({ currentTheme: theme })
//     }
//   }
// }
