import React, { useContext } from 'react'
import { Store } from '../../store/Store'
import './styles.css'

const Header = ({ toggleSettings }) => {
  const { state } = useContext(Store)
  const { theme } = state

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
        onClick={toggleSettings}
      >
        settings
      </button>
    </div>
  )
}

export default Header
