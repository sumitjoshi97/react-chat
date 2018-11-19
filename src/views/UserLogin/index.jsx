import React, { Component } from 'react'

export default class UserLogin extends Component {
  state = {
    username: ''
  }

  onChange = e => {
    this.setState({ username: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.onSubmit(this.state.username)
    this.setState({ username: '' })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="What is your name??"
            onChange={this.onChange}
          />
          <input type="submit" />
        </form>
      </div>
    )
  }
}
