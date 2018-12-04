import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class Member extends PureComponent {
  static propTypes = {
    memberName: PropTypes.string.isRequired,
    memberOfflineColor: PropTypes.string.isRequired,
    memberOnlineColor: PropTypes.string.isRequired
  }

  render() {
    const { memberOnlineColor, memberOfflineColor, memberName } = this.props
    const presenceStyle =
      this.props.memberPresence.state === 'online'
        ? { background: memberOnlineColor }
        : { background: memberOfflineColor }
    return (
      <li className='list-item'>
        <span className='presence' style={presenceStyle} />
        {memberName}
      </li>
    )
  }
}
