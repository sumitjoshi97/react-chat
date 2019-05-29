import React from 'react'
import './styles.css'

const Header = ({ user, theme, ...props }) => {
  const headerStyles = {
    background: theme.primaryBackground,
    color: theme.fontPrimary,
  }

  return (
    <div className="app-header" style={headerStyles}>
      <div className="app-name">#react-CHAT</div>
      <button
        className="settings-header"
        style={{ color: theme.fontPrimary }}
        onClick={props.handleSettings}
      >
        settings
      </button>
    </div>
  )
}

export default Header
