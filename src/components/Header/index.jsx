import React from 'react'

import './styles.css'

const Header = ({ toggleSettings, theme }) => {
  const headerStyles = {
    background: theme.primaryBackground,
    color: theme.fontPrimary
  }

  return (
    <div className='app-header' style={headerStyles}>
      <div className='app-name'>#react-CHAT</div>
      <button className='settings-header' onClick={toggleSettings}>
        settings
      </button>
    </div>
  )
}

export default Header
