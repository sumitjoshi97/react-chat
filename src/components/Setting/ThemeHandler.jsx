import React from 'react'
import PropTypes from 'prop-types'
import * as themes from '../../utils/theme'

const ThemeHandler = props => (
  <div className="settings-themes">
    <h2 className="header-secondary" style={props.style}>
      Select a theme
    </h2>
    <div className="themes">
      <div
        className="theme-box dark"
        onClick={() => props.handleTheme(themes.DARK_THEME)}
      />
      <div
        className="theme-box blue"
        onClick={() => props.handleTheme(themes.BLUE_THEME)}
      />
      <div
        className="theme-box red"
        onClick={() => props.handleTheme(themes.RED_THEME)}
      />
    </div>
  </div>
)

ThemeHandler.propTypes = {
  handleTheme: PropTypes.func.isRequired,
}

export default ThemeHandler
