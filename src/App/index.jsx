import React, { useContext } from 'react'

import UserLogin from '../views/UserLogin'
import Home from '../views/Home'

import { Store } from '../store/Store'

const App = () => {
  const { state } = useContext(Store)

  return (
    <div className="app">{state.isAuth ? <Home /> : <UserLogin />}</div>
  )
}

export default App
