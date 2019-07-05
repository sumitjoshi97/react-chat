import React, { useState, useContext } from 'react'

import ErrorNotification from '../../components/ErrorNotification'
import { Store } from '../../store/Store'
import { onUsernameSubmit } from '../../store/actions'
import './styles.css'

const UserLogin = () => {
  const { state, dispatch } = useContext(Store)

  const [name, setName] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    name.trim().length > 0 && onUsernameSubmit(name, dispatch)
  }

  const errorNotification = state.isError && (
    <ErrorNotification theme={state.theme} dispatch={dispatch} />
  )

  return (
    <div className="user-login">
      <form onSubmit={handleSubmit} className="login-form">
        <h1 className="header">Login</h1>
        <input
          type="text"
          placeholder="What's your name??"
          onChange={e => setName(e.target.value)}
          className="input"
        />
        <input type="submit" className="input button" value="Login" />
      </form>
      {errorNotification}
    </div>
  )
}

export default UserLogin
