import * as actionTypes from './actionTypes'

const changeTheme = theme => ({
  type: actionTypes.CHANGE_THEME,
  theme,
})

export const onChangeTheme = (currentTheme, theme, dispatch) => {
  if (theme !== currentTheme) {
    dispatch(changeTheme(theme))
  }
}
