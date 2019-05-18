import React, { useContext } from 'react'

import UserLogin from '../views/UserLogin'
import ChatScreen from '../views/ChatScreen'

import { Store } from '../store/Store'

const App = () => {
  // state = {
  //   currentUsername: '',
  //   currentScreen: 'LoginScreen',
  // }

  // onUsernameSubmit = username => {
  //   fetch(`${process.env.REACT_APP_SERVER_URI}/users`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ username }),
  //   })
  //     .then(response =>
  //       this.setState({
  //         currentUsername: username,
  //         currentScreen: 'ChatScreen',
  //       })
  //     )
  //     .catch(err => console.error(err))
  // }

  const { state } = useContext(Store)

  return (
    <div className="app">
      {state.isLogin === true ? <ChatScreen /> : <UserLogin />}
    </div>
  )
}

export default App
