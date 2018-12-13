import React, { Component } from 'react'

import UserLogin from '../views/UserLogin'
import ChatScreen from '../views/ChatScreen'

class App extends Component {
  state = {
    currentUsername: '',
    currentScreen: 'LoginScreen'
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
    return (
      <div className='app'>
        {this.state.currentScreen === 'ChatScreen' ? (
          <ChatScreen currentUsername={this.state.currentUsername} />
        ) : (
          <UserLogin onSubmit={this.onUsernameSubmit} />
        )}
      </div>
    )
  }
}

export default App
