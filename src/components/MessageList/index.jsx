import React, { useEffect, useRef } from 'react'

import Message from './Message'
import Scrollbar from '../Scrollbar'
import './styles.css'

// export default class MessageList extends Component {
//   static propTypes = {
//     messages: PropTypes.array,
//     theme: PropTypes.object.isRequired,
//   }

//   UNSAFE_componentWillUpdate = () => {
//     const node = ReactDOM.findDOMNode(this)
//     this.shouldScrollToBottom =
//       node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
//   }

//   componentDidUpdate = () => {
//     const node = ReactDOM.findDOMNode(this)
//     node.scrollTop = node.scrollHeight
//   }

// renderMessages = () => {
//   const { messages, theme } = this.props

//   return messages.map(message => (
//     <Message
//       key={message.id}
//       messageSender={message.senderId}
//       messageText={message.text}
//       senderStyle={theme.fontSecondary}
//       messageStyle={theme.fontPrimary}
//     />
//   ))
// }

// render() {
//   return (
//     <ul className="message-list">
//       <Scrollbar thumbColor={this.props.theme.primaryBackground}>
//         {this.renderMessages()}
//         <div ref={messageBottom} />
//       </Scrollbar>
//     </ul>
//   )
// }
// }

const MessageList = ({ messages, theme }) => {
  let messageEndRef = useRef(null)

  const scrollToBottom = () => {
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages])

  const renderMessages = () => {
    return messages.map(message => (
      <Message
        key={message.id}
        messageSender={message.senderId}
        messageText={message.parts[0].payload.content}
        senderStyle={theme.fontSecondary}
        messageStyle={theme.fontPrimary}
      />
    ))
  }

  return (
    <ul className="message-list">
      <Scrollbar thumbColor={theme.primaryBackground}>
        {renderMessages()}
        <div ref={messageEndRef} />
      </Scrollbar>
    </ul>
  )
}

export default MessageList
