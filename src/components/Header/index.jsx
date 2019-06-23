import React from 'react'
import PropTypes from 'prop-types'

import './styles.css'

const Header = ({ theme, ...props }) => {
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

Header.propTypes = {
  theme: PropTypes.object.isRequired,
  handleSettings: PropTypes.func.isRequired,
}

export default Header
