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

export const onChangeTheme = (currentTheme, theme, dispatch) => {
  if (theme !== currentTheme) {
    dispatch(changeTheme(theme))
  }
}

/////////////////////////////////////////////////////////////////
//chatkit actions

const setClearMessages = () => ({
  type: 'SET_CLEAR_MESSAGES',
})

const setCurrentRoom = room => ({
  type: 'SET_CURRENT_ROOM',
  currentRoom: room,
})

const setCurrentUser = user => ({
  type: 'SET_CURRENT_USER',
  currentUser: user,
})

const logoutSuccess = () => ({
  type: 'LOGOUT_SUCCESS',
})

const setClearCurrentUsersTyping = () => ({
  type: 'SET_CLEAR_CURRENT_USERS_TYPING',
})

const addToCurrentUsersTyping = user => ({
  type: 'ADD_TO_CURRENT_USERS_TYPING',
  user,
})

const removeFromCurrentUsersTyping = user => ({
  type: 'REMOVE_FROM_CURRENT_USERS_TYPING',
  user,
})

const addMessage = message => ({
  type: 'ADD_MESSAGE',
  message,
})

const forceUpdate = () => ({
  type: 'FORCE_UPDATE',
})

export const connectToChatkit = async (chatManager, dispatch) => {
  try {
    const currentUser = await chatManager.connect({
      onAddedToRoom: () => dispatch(forceUpdate()),
      onUserStartedTyping: (room, user) => {
        const userTyping = {
          name: user.name,
          roomId: room.id,
        }
        dispatch(addToCurrentUsersTyping(userTyping))
      },
      onUserStoppedTyping: (room, user) => {
        const userTyping = {
          name: user.name,
          roomId: room.id,
        }
        console.log(userTyping)
        dispatch(removeFromCurrentUsersTyping(userTyping))
      },
    })

    await dispatch(setCurrentUser(currentUser))

    const userRooms = currentUser.roomStore.rooms
    const currentRoomId =
      (await Object.keys(userRooms).length) > 0
        ? Object.keys(userRooms)[0]
        : process.env.REACT_APP_GENERAL_ROOM_ID

    await subscribeUserToRoom(currentUser, currentRoomId, dispatch)

    // if ((await Object.keys(userRooms).length) > 0) {
    //   Object.keys(userRooms).map(roomId =>
    //     subscribeUserToRoom(currentUser, roomId, dispatch)
    //   )
    // } else {
    //   await subscribeUserToRoom(
    //     currentUser,
    //     process.env.REACT_APP_GENERAL_ROOM_ID,
    //     dispatch
    //   )
    // }

    const currentRoom = await currentUser.roomStore.rooms[
      Object.keys(currentUser.roomStore.rooms)[0]
    ]

    await dispatch(setCurrentRoom(currentRoom))
  } catch (err) {
    console.error(err)
  }
}

export const subscribeUserToRoom = async (user, roomId, dispatch) => {
  try {
    await dispatch(setClearMessages())
    await user.subscribeToRoomMultipart({
      roomId,
      messageLimit: 30,
      hooks: {
        onMessage: message => dispatch(addMessage(message)),
        onPresenceChanged: () => dispatch(forceUpdate()),
        onUserJoined: () => dispatch(forceUpdate()),
      },
    })
  } catch (err) {
    console.log(err)
  }
}

export const logoutUser = dispatch => {
  dispatch(logoutSuccess())
}

//**************************** */ --  remove it later-- **************************************
// export const fetchMessagesForCurrentRoom = async (user, room, dispatch) => {
//   try {
//     const messages = await user.fetchMultipartMessages({
//       roomId: room.id,
//       limit: 20,
//     })
//     await dispatch(setMessages(messages))
//   } catch (err) {
//     console.log(err)
//   }
// }
// *********************************************************************************************

export const handleCurrentRoom = async (user, roomId, dispatch) => {
  try {
    const userRooms = user.roomStore.rooms
    const currentRoom =
      userRooms[Object.keys(userRooms).find(id => id === roomId)]
    await dispatch(setClearCurrentUsersTyping())
    await subscribeUserToRoom(user, roomId, dispatch)
    await dispatch(setCurrentRoom(currentRoom))
  } catch (err) {
    console.error(err)
  }
}

export const sendMessage = async (user, room, message) => {
  try {
    await user.sendSimpleMessage({
      text: message,
      roomId: room.id,
    })
  } catch (err) {
    console.log(err)
  }
}

export const sendTypingEvent = async (user, roomId) => {
  try {
    if (user.hasOwnProperty('isTypingIn')) {
      await user.isTypingIn({ roomId })
    }
  } catch (err) {
    console.log(err)
  }
}

export const addRoom = async (user, roomName, dispatch) => {
  try {
    const room = await user.createRoom({ name: roomName })
    await subscribeUserToRoom(user, room.id, dispatch)
    await dispatch(setClearCurrentUsersTyping())
    await dispatch(setCurrentRoom(room))
  } catch (err) {
    console.error(err)
  }
}

export const addMemberToRoom = async (user, room, member) => {
  try {
    await user.addUserToRoom({
      userId: member,
      roomId: room.id,
    })
  } catch (err) {
    console.error(err)
  }
}
