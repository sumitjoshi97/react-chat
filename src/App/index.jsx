import React, { useContext } from 'react'

import UserLogin from '../views/UserLogin'
import ChatScreen from '../views/ChatScreen'

import { Store } from '../store/Store'

const App = () => {
  const { state } = useContext(Store)

  return (
    <div className="app">{state.isAuth ? <ChatScreen /> : <UserLogin />}</div>
  )
}

export default App
