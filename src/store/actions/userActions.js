import * as actionTypes from './actionTypes'

const loginSuccess = username => ({
  type: actionTypes.LOGIN_SUCCESS,
  username,
})

const logoutSuccess = () => ({
  type: actionTypes.LOGOUT_SUCCESS,
})

export const onUsernameSubmit = (username, dispatch) => {
  const URL = `${process.env.REACT_APP_SERVER_URI}/users`
  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  })
    .then(res => {
      dispatch(loginSuccess(username))
    })
    .catch(err => console.log(err))
}

export const logoutUser = dispatch => {
  dispatch(logoutSuccess())
}
