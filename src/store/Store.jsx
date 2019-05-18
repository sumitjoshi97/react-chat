import React, { createContext, useReducer } from 'react'

const initialState = {
  isLogin: false,
  username: '',
}

export const Store = createContext(initialState)

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, isLogin: true, username: action.username }
    default:
      return state
  }
}

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
}
