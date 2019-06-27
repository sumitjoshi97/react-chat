import React, { createContext, useReducer } from 'react'
import * as actionTypes from './actions/actionTypes'
import * as themes from '../utils/theme'

const initialState = {
  isAuth: false,
  userId: '',
  currentUser: {},
  currentRoom: {},
  messages: [],
  currentUsersTyping: [],
  forceUpdateCount: 0,
  theme: themes.BLUE_THEME,
  isError: false,
}

export const Store = createContext(initialState)

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return { ...state, isAuth: true, userId: action.username }

    case actionTypes.LOGOUT_SUCCESS:
      return initialState

    case actionTypes.SET_CURRENT_USER:
      return { ...state, currentUser: action.currentUser }

    case actionTypes.SET_CURRENT_ROOM:
      return { ...state, currentRoom: action.currentRoom }

    case actionTypes.SET_CLEAR_MESSAGES:
      return { ...state, messages: [] }

    case actionTypes.ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.message] }

    case actionTypes.SET_CLEAR_CURRENT_USERS_TYPING:
      return { ...state, currentUsersTyping: [] }

    case actionTypes.ADD_TO_CURRENT_USERS_TYPING:
      return {
        ...state,
        currentUsersTyping: [...state.currentUsersTyping, action.user],
      }

    case actionTypes.REMOVE_FROM_CURRENT_USERS_TYPING:
      return {
        ...state,
        currentUsersTyping: state.currentUsersTyping.filter(
          user => user.name !== action.user.name
        ),
      }

    case actionTypes.CHANGE_THEME:
      return { ...state, theme: action.theme }

    case actionTypes.SET_ERROR:
      return { ...state, isError: true }

    case actionTypes.SET_CLEAR_ERROR:
      return { ...state, isError: false }

    case actionTypes.FORCE_UPDATE:
      return { ...state, forceUpdateCount: state.forceUpdateCount + 1 }

    default:
      return state
  }
}

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
}
