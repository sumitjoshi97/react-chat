import React, { Component } from 'react'

import UserLogin from '../views/UserLogin'
import ChatScreen from '../views/ChatScreen'
class App extends Component {
  state = {
    currentUsername: '',
    currentScreen: 'UserLogin'
  }

  onUsernameSubmit = username => {
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    })
      .then(response =>
        this.setState({
          currentUsername: username,
          currentScreen: 'ChatScreen'
        })
      )
      .catch(err => console.error(err))
  }

  render() {
    if (this.state.currentScreen === 'ChatScreen')
      return <ChatScreen currentUsername={this.state.currentUsername} />
    else return <UserLogin onSubmit={this.onUsernameSubmit} />
  }
}

export default App
