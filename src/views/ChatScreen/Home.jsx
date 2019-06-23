import React from 'react'
import PropTypes from 'prop-types'
import Header from '../../components/Header'
import RoomsList from '../../components/RoomsList'
import MembersList from '../../components/MembersList'
import Messagelist from '../../components/MessageList'
import TypingIndicator from '../../components/TypingIndicator'
import SendMessageForm from '../../components/SendMessageForm'

const Home = props => {
  const {
    currentUser,
    currentRoom,
    messages,
    currentUsersTyping,
    dialog,
    theme,
  } = props

  return (
    <>
      <Header theme={theme} handleSettings={props.handleSettings} />
      <div className="chat-screen">
        <RoomsList
          handleDialog={props.handleDialog}
          theme={theme}
          currentUser={currentUser}
          currentRoom={currentRoom}
          dispatch={props.dispatch}
        />

        <div className="chat" style={{ background: theme.secondaryBackground }}>
          <Messagelist messages={messages} theme={theme} />
          <div className="chat-form">
            <TypingIndicator
              currentUsersTyping={currentUsersTyping}
              currentRoomId={currentRoom.id}
              color={theme.fontSecondary}
            />
            <SendMessageForm
              theme={theme}
              handleTypingIndicator={props.handleTypingIndicator}
              handleMessageForm={props.handleMessageForm}
            />
          </div>
        </div>

        <MembersList
          handleDialog={props.handleDialog}
          theme={theme}
          members={currentRoom.users}
        />
      </div>
      {dialog}
    </>
  )
}

Home.propTypes = {
  currentUser: PropTypes.object,
  currentRoom: PropTypes.object,
  messages: PropTypes.array,
  currentUsersTyping: PropTypes.array,
  dialog: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  theme: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  handleSettings: PropTypes.func.isRequired,
  handleDialog: PropTypes.func.isRequired,
  handleMessageForm: PropTypes.func.isRequired,
  handleTypingIndicator: PropTypes.func.isRequired,
}

export default Home
