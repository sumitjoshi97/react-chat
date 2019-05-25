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

