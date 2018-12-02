import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles.css'

export class Setting extends Component {
  static propTypes = {
    setTheme: PropTypes.func.isRequired
  }

  onClick = theme => {
    this.props.setTheme(theme)
    this.props.toggleSettings()
  }
  render() {
    return (
      <div className='settings'>
        <div className='cancel' onClick={this.props.toggleSettings}>
          x
        </div>
        <h2 className='header'>Select a theme</h2>
        <div className='themes'>
          <div
            className='theme-box dark'
            onClick={() => this.onClick('dark')}
          />
          <div
            className='theme-box blue'
            onClick={() => this.onClick('blue')}
          />
          <div className='theme-box red' onClick={() => this.onClick('red')} />
        </div>
      </div>
    )
  }
}

export default Setting
