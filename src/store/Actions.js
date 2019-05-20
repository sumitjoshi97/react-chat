///////////////////////////////////////////////////////////////
// login

const loginSuccess = username => ({
  type: 'LOGIN_SUCCESS',
  username,
})

const loginFailure = () => ({
  type: 'LOGIN_FAILURE',
})

export const onUsernameSubmit = (username, dispatch) => {
  const URL = `${process.env.REACT_APP_SERVER_URI}/users`
  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  })
    .then(res => {
      dispatch(loginSuccess(username))
    })
    .catch(err => dispatch(loginFailure))
}

//////////////////////////////////////////////////////////////
// Theme Actions

const changeTheme = theme => ({
  type: 'CHANGE_THEME',
  theme,
})

export const onChangeTheme = (theme, currentTheme, dispatch) => {
  if (theme !== currentTheme) {
    dispatch(changeTheme(theme))
  }
}

/////////////////////////////////////////////////////////////////
//chatkit actions

const setMessages = messages => ({
  type: 'SET_MESSAGES',
  messages,
})

const setCurrentRoom = room => ({
  type: 'SET_CURRENT_ROOM',
  currentRoom: room,
})

const setCurrentUser = user => ({
  type: 'SET_CURRENT_USER',
  currentUser: user,
})

const addMessage = message => ({
  type: 'ADD_MESSAGE',
  message,
})

export const connectToChatkit = (chatManager, dispatch) => {
  let currentUser
  let currentRoom

  chatManager
    .connect({
      onAddedToRoom: () => this.forceUpdate(),
      onUserJoinedRoom: () => this.forceUpdate(),
    })
    .then(user => {
      currentUser = user
      console.log(user)
      dispatch(setCurrentUser(currentUser))
    })
    .then(() => {
      if (currentUser.rooms.length > 0) {
        currentUser.rooms.map(room =>
          subscribeUserToRoom(currentUser, room.id, dispatch)
        )
      } else {
        //subscribe to general room for first time user
        subscribeUserToRoom(
          currentUser,
          process.env.REACT_APP_GENERAL_ROOM_ID,
          dispatch
        )
      }
    })
    .then(() => {
      currentRoom = currentUser.rooms[0]
      dispatch(setCurrentRoom(currentRoom))
    })
    .then(() => {
      fetchMessagesForCurrentRoom(currentRoom)
    })
    .catch(err => console.error(err))
}

export const subscribeUserToRoom = (user, roomId, dispatch) => {
  return user.subscribeToRoomMultipart({
    roomId,
    messageLimit: 30,
    hooks: {
      onMessage: message => dispatch(addMessage(message)),
      onPresenceChange: () => this.forceUpdate(),
      onUserJoined: () => this.forceUpdate(),
    },
  })
}

// {
//   this.setState({
//     messages: [...this.state.messages, message],
//   })
// },
// onUserStartedTyping: user => {
//   this.setState({
//     usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name],
//   })
// },
// onUserStoppedTyping: user => {
//   this.setState({
//     usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
//       username => username !== user.name
//     ),
//   })
// },

export const fetchMessagesForCurrentRoom = (currentUser, room, dispatch) => {
  currentUser
    .fetchMessages({
      roomId: room.id,
      limit: 30,
    })
    .then(messages => dispatch(setMessages(messages)))
}

export const handleCurrentRoom = (user, roomId, dispatch) => {
  const room = user.rooms.find(room => room.id === roomId)
  dispatch(setCurrentRoom(room))
  fetchMessagesForCurrentRoom(user, room, dispatch)
}

export const sendMessage = (user, text) => {
  user.sendMessage({
    text,
    roomId: this.state.currentRoom.id,
  })
}

export const sendTypingEvent = () => {
  this.state.currentUser
    .isTypingIn({ roomId: this.state.currentRoom.id })
    .catch(error => console.error('error', error))
}

export const addRoom = (user, roomName, dispatch) => {
  user
    .createRoom({ roomName })
    .then(room => {
      subscribeUserToRoom(user, room.id)
      fetchMessagesForCurrentRoom(room)
      dispatch(setCurrentRoom(room))
    })
    .catch(err => console.error(err))
}

export const addMemberToRoom = (user, room, member) => {
  user
    .addUserToRoom({
      userId: member,
      roomId: room.id,
    })
    .catch(err => console.error(err))
}
