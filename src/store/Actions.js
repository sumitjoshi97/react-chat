///////////////////////////////////////////////////////////////
// login

const loginSuccess = username => ({
  type: 'LOGIN_SUCCESS',
  username,
})

const loginFailure = () => ({
  type: 'LOGIN_FAILURE',
})

export const onUsernameSubmit = (username, dispatch) => {
  console.log('action', username)
  const URL = `${process.env.REACT_APP_SERVER_URI}/users`
  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  })
    .then(res => {
      console.log('success')
      return dispatch(loginSuccess(username))
    })
    .catch(err => dispatch(loginFailure))
}

//////////////////////////////////////////////////////////////
// Theme Actions

const changeTheme = theme => ({
  type: 'CHANGE_THEME',
  theme,
})

export const onChangeTheme = (theme, currentTheme) => dispatch => {
  if (theme !== currentTheme) {
    dispatch({ changeTheme })
  }
}
