import * as actionTypes from './actionTypes'
import { setError, setClearError } from './errorActions'

const setCurrentUser = user => ({
  type: actionTypes.SET_CURRENT_USER,
  currentUser: user,
})

const setCurrentRoom = room => ({
  type: actionTypes.SET_CURRENT_ROOM,
  currentRoom: room,
})

const addToCurrentUsersTyping = user => ({
  type: actionTypes.ADD_TO_CURRENT_USERS_TYPING,
  user,
})

const removeFromCurrentUsersTyping = user => ({
  type: actionTypes.REMOVE_FROM_CURRENT_USERS_TYPING,
  user,
})

const setClearCurrentUsersTyping = () => ({
  type: actionTypes.SET_CLEAR_CURRENT_USERS_TYPING,
})

const addMessage = message => ({
  type: actionTypes.ADD_MESSAGE,
  message,
})

const setClearMessages = () => ({
  type: actionTypes.SET_CLEAR_MESSAGES,
})

const forceUpdate = () => ({
  type: actionTypes.FORCE_UPDATE,
})

export const connectToChatkit = async (chatManager, dispatch) => {
  try {
    await dispatch(setClearError())
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

    const currentRoom = await currentUser.roomStore.rooms[
      Object.keys(currentUser.roomStore.rooms)[0]
    ]

    await dispatch(setCurrentRoom(currentRoom))
  } catch (err) {
    await dispatch(setError())
  }
}

const subscribeUserToRoom = async (user, roomId, dispatch) => {
  try {
    await dispatch(setClearError())
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
    await dispatch(setError())
  }
}

export const handleCurrentRoom = async (user, roomId, dispatch) => {
  try {
    await dispatch(setClearError())
    const userRooms = user.roomStore.rooms
    const currentRoom =
      userRooms[Object.keys(userRooms).find(id => id === roomId)]
    await dispatch(setClearCurrentUsersTyping())
    await subscribeUserToRoom(user, roomId, dispatch)
    await dispatch(setCurrentRoom(currentRoom))
  } catch (err) {
    await dispatch(setError())
  }
}

export const sendMessage = async (user, room, message, dispatch) => {
  try {
    await dispatch(setClearError())
    await user.sendSimpleMessage({
      text: message,
      roomId: room.id,
    })
  } catch (err) {
    await dispatch(setError())
  }
}

export const sendTypingEvent = async (user, roomId) => {
  if (user.hasOwnProperty('isTypingIn')) {
    await user.isTypingIn({ roomId })
  }
}

export const addRoom = async (user, roomName, dispatch) => {
  try {
    await dispatch(setClearError())
    const room = await user.createRoom({ name: roomName })
    await subscribeUserToRoom(user, room.id, dispatch)
    await dispatch(setClearCurrentUsersTyping())
    await dispatch(setCurrentRoom(room))
  } catch (err) {
    await dispatch(setError())
  }
}

export const addMemberToRoom = async (user, room, member, dispatch) => {
  try {
    await dispatch(setClearError())
    await user.addUserToRoom({
      userId: member,
      roomId: room.id,
    })
  } catch (err) {
    await dispatch(setError())
  }
}
