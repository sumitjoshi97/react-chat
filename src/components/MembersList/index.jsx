import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Member from './Member'

export default class MembersList extends Component {
  static propTypes = {
    members: PropTypes.array,
    toggleDialog: PropTypes.func.isRequired
  }

  renderMembers = () => {
    const { members } = this.props
    if (members) {
      return this.props.members.map(member => (
        <Member
          key={member.id}
          memberName={member.name}
          memberPresence={member.presence}
        />
      ))
    }
  }

  render() {
    return (
      <div className='column'>
        <ul className='list'>
          <li className='list-header'>Members list</li>
          {this.renderMembers()}
        </ul>
        <button
          className='add-btn'
          onClick={() => this.props.toggleDialog('member to room')}
        >
          Add
        </button>
      </div>
    )
  }
}
