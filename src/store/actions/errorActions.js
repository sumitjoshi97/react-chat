import * as actionTypes from './actionTypes'

export const setError = () => ({
  type: actionTypes.SET_ERROR,
})

export const setClearError = () => ({
  type: actionTypes.SET_CLEAR_ERROR,
})

export const clearError = dispatch => {
  dispatch(setClearError())
}
