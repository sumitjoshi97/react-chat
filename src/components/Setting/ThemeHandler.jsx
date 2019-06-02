import React from 'react'
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

export default ThemeHandler
