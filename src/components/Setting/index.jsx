import React from 'react'
import PropTypes from 'prop-types'
import Radium from 'radium'

import { onChangeTheme, logoutUser } from '../../store/actions'

import './styles.css'
import ThemeHandler from './ThemeHandler'

const Setting = ({ currentTheme, ...props }) => {
  const handleTheme = theme => {
    onChangeTheme(currentTheme, theme, props.dispatch)
  }

  const fontStyles = {
    color: currentTheme.fontPrimary,
  }

  const buttonStyles = {
    background: currentTheme.secondaryBackground,
    color: currentTheme.fontPrimary,
    ':hover': {
      background: currentTheme.primaryBackground,
    },
  }

  return (
    <div
      className="settings"
      style={{ background: currentTheme.secondaryBackground }}
    >
      <div className="cancel" onClick={props.handleSettings}>
        x
      </div>
      <div className="settings-content">
        <h2 className="header-primary" style={fontStyles}>
          Settings
        </h2>
        <div className="break" />
        <ThemeHandler handleTheme={handleTheme} style={fontStyles} />
        <button
          className="logout-btn"
          style={buttonStyles}
          onClick={() => logoutUser(props.dispatch)}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

Setting.propTypes = {
  currentTheme: PropTypes.object.isRequired,
  handleTheme: PropTypes.func.isRequired,
  handleSettings: PropTypes.func.isRequired,
}

export default Radium(Setting)
