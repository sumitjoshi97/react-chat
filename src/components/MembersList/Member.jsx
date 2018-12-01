import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class Member extends PureComponent {
  static propTypes = {
    memberName: PropTypes.string.isRequired
  }

  render() {
    const presenceStyle =
      this.props.memberPresence.state === 'online'
        ? { background: '#2e2' }
        : { background: '#2e2e2e' }
    return (
      <li className='list-item'>
        <span className='presence' style={presenceStyle} />
        {this.props.memberName}
      </li>
    )
  }
}
