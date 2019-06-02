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
        <div className="break" />
        <ThemeHandler handleTheme={handleTheme} style={fontStyles} />
        <button
        </div>
      </div>
    )
  }
}

export default Setting
