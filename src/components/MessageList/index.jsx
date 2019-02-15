import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import Message from './Message'
import Scrollbar from '../Scrollbar'
import './styles.css'

export default class MessageList extends Component {
  static propTypes = {
    messages: PropTypes.array,
    theme: PropTypes.object.isRequired
  }

  static getDerivedStateFromProps = () => {
    const node = ReactDOM.findDOMNode(this)
    this.shouldScrollToBottom =
      node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
  }

  componentDidUpdate = () => {
    const node = ReactDOM.findDOMNode(this)
    node.scrollTop = node.scrollHeight
  }

  renderMessages = () => {
    const { messages, theme } = this.props

    return messages.map(message => (
      <Message
        key={message.id}
        messageSender={message.senderId}
        messageText={message.text}
        senderStyle={theme.fontSecondary}
        messageStyle={theme.fontPrimary}
      />
    ))
  }
  render() {
    return (
      <ul className="message-list">
        <Scrollbar thumbColor={this.props.theme.primaryBackground}>
          {this.renderMessages()}
        </Scrollbar>
      </ul>
    )
  }
}
