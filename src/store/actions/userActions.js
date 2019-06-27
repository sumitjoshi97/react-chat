import * as actionTypes from './actionTypes'
import { setError, setClearError } from './errorActions'

const loginSuccess = username => ({
  type: actionTypes.LOGIN_SUCCESS,
  username,
})

const logoutSuccess = () => ({
  type: actionTypes.LOGOUT_SUCCESS,
})

export const onUsernameSubmit = async (username, dispatch) => {
  try {
    await dispatch(setClearError())

    const URL = `${process.env.REACT_APP_SERVER_URI}/users`
    await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    })
    await dispatch(loginSuccess(username))
  } catch {
    await dispatch(setError())
  }
}

export const logoutUser = dispatch => {
  dispatch(logoutSuccess())
}
