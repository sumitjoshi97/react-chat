import React, { Component } from 'react'

import './styles.css'

export default class UserLogin extends Component {
  state = {
    username: ''
  }

  onChange = e => {
    this.setState({ username: e.target.value })
  }

  onSubmit = e => {
    const { username } = this.state
    e.preventDefault()

    if (username.trim().length > 0) {
      this.props.onSubmit(this.state.username)
      this.setState({ username: '' })
    }
  }
  render() {
    return (
      <div className='user-login'>
        <form onSubmit={this.onSubmit} className='login-form'>
          <h1 className='header'>Login</h1>
          <input
            type='text'
            placeholder='What is your name??'
            onChange={this.onChange}
            className='input'
          />
          <input type='submit' className='input button' />
        </form>
      </div>
    )
  }
}
