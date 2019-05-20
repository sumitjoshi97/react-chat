import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

import { Store } from '../../store/Store'
import './styles.css'

const Dialog = ({ name, ...props }) => {
  const { state } = useContext(Store)
  const { theme } = state
  const styles = {
    dialogStyles: {
      background: theme.secondaryBackground,
      color: theme.fontPrimary,
    },
    inputStyles: {
      background: theme.tertiaryBackground,
      color: theme.fontPrimary,
    },
    buttonStyles: {
      background: theme.primaryBackground,
      color: theme.fontPrimary,
    },
  }

  const [dialogInput, setDialogInput] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (dialogInput.trim().length > 0) {
      props.onSubmit(dialogInput)
      props.handleDialog()
    }
  }

  return (
    <div className="main">
      <form
        onSubmit={handleSubmit}
        className="dialog-form"
        style={styles.dialogStyles}
      >
        <button onClick={props.handleDialog} className="cancel">
          x
        </button>
        <h1 className="header">{`Add new ${name}`}</h1>
        <input
          type="text"
          placeholder="Type here.."
          value={dialogInput}
          onChange={e => setDialogInput(e.target.value)}
          className="input"
          style={styles.inputStyles}
        />
        <input
          type="submit"
          className="input button"
          style={styles.buttonStyles}
          value="Add"
        />
      </form>
    </div>
  )
}

Dialog.propTypes = {
  // toggleDialog: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
}

export default Dialog
