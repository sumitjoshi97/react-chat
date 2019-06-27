import React, { useEffect } from 'react'

import { clearError } from '../../store/actions'
import './styles.css'

const ErrorNotification = ({ theme, ...props }) => {
  const errorStyles = {
    background: theme.primaryBackground,
    color: theme.fontPrimary,
  }

  useEffect(() => {
    setTimeout(() => {
      clearError(props.dispatch)
    }, 1600)
    return () => clearTimeout()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="error" style={errorStyles}>
      Something went wrong!! Try Again
    </div>
  )
}

export default ErrorNotification
