import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Member from './Member'
import * as THEME from '../../utils/theme'

export default class MembersList extends Component {
  static propTypes = {
    members: PropTypes.array,
    toggleDialog: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired
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
    const { theme } = this.props

    const styles = {
      listStyles: {
        background: theme.primaryBackground,
        color: theme.fontPrimary
      },
      buttonStyles: {
        background: theme.secondaryBackground,
        color: theme.fontPrimary
      }
    }
    return (
      <div className='column' style={styles.listStyles}>
        <ul className='list'>
          <li className='list-header'>Members list</li>
          {this.renderMembers()}
        </ul>
        <button
          className='add-btn'
          style={styles.buttonStyles}
          onClick={() => this.props.toggleDialog('member to room')}
        >
          Add
        </button>
      </div>
    )
  }
}
