import React, { useState, useContext, useEffect } from 'react'
import Chatkit from '@pusher/chatkit-client'

import ChatScreen from './ChatScreen'
import Dialog from '../../components/Dialog'
import Setting from '../../components/Setting'
import './styles.css'

import { Store } from '../../store/Store'
import {
  connectToChatkit,
  addRoom,
  addMemberToRoom,
  sendMessage,
  sendTypingEvent,
} from '../../store/actions'
import ErrorNotification from '../../components/ErrorNotification'

const Home = () => {
  const { state, dispatch } = useContext(Store)
  const {
    isAuth,
    userId,
    currentUser,
    currentRoom,
    messages,
    currentUsersTyping,
    theme,
    isError,
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
    sendMessage(currentUser, currentRoom, message, dispatch)
  }

  const handleTypingIndicator = () => {
    sendTypingEvent(currentUser, currentRoom.id)
  }

  const handleDialog = (name = '') => {
    toggleDialog(!isDialogActive)
    setDialog(name)
  }

  const handleRoomDialog = room => {
    addRoom(currentUser, room, dispatch)
  }

  const handleMemberDialog = member => {
    addMemberToRoom(currentUser, currentRoom, member, dispatch)
  }

  const onDialogSubmit =
    activeDialog === 'room' ? handleRoomDialog : handleMemberDialog

  const handleSettings = () => {
    toggleSettingPane(!isSettingActive)
  }

  const errorNotification = isError && (
    <ErrorNotification dispatch={dispatch} theme={theme} />
  )

  const dialog = isDialogActive && (
    <Dialog
      name={activeDialog}
      theme={theme}
      handleDialog={handleDialog}
      onSubmit={onDialogSubmit}
    />
  )

  let renderScreen

  if (isSettingActive) {
    renderScreen = (
      <Setting
        currentTheme={theme}
        handleSettings={handleSettings}
        dispatch={dispatch}
      />
    )
  } else {
    renderScreen = (
      <ChatScreen
        currentUser={currentUser}
        currentRoom={currentRoom}
        messages={messages}
        currentUsersTyping={currentUsersTyping}
        dialog={dialog}
        dispatch={dispatch}
        handleSettings={handleSettings}
        handleDialog={handleDialog}
        handleTypingIndicator={handleTypingIndicator}
        handleMessageForm={handleMessageForm}
        theme={theme}
      />
    )
  }

  return (
    <>
      {renderScreen}
      {errorNotification}
    </>
  )
}

export default Home
