import React, { createContext, useReducer } from 'react'
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
}

export const Store = createContext(initialState)

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, isAuth: true, userId: action.username }
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.currentUser }
    case 'LOGOUT_SUCCESS':
      return initialState
    case 'SET_CURRENT_ROOM':
      return { ...state, currentRoom: action.currentRoom }
    case 'SET_MESSAGES':
      return { ...state, messages: action.messages }
    case 'SET_CLEAR_MESSAGES':
      return { ...state, messages: [] }
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.message] }
    case 'SET_CLEAR_CURRENT_USERS_TYPING':
      return { ...state, currentUsersTyping: [] }
    case 'ADD_TO_CURRENT_USERS_TYPING':
      return {
        ...state,
        currentUsersTyping: [...state.currentUsersTyping, action.user],
      }
    case 'REMOVE_FROM_CURRENT_USERS_TYPING':
      return {
        ...state,
        currentUsersTyping: state.currentUsersTyping.filter(
          user => user.name !== action.user.name
        ),
      }
    case 'CHANGE_THEME':
      return { ...state, theme: action.theme }
    case 'FORCE_UPDATE':
      return { ...state, forceUpdateCount: state.forceUpdateCount + 1 }
    default:
      return state
  }
}

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
}
