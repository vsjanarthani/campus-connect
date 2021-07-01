import React, { createContext, useReducer, useContext } from 'react'
import jwtDecode from 'jwt-decode'

const AuthStateContext = createContext()
const AuthDispatchContext = createContext()

let user = null
const token = localStorage.getItem('token')
if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp < Date.now() / 1000) {
    localStorage.removeItem('token')
  } else {
    user = decodedToken
  }
} else console.log('No token found')

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        user: action.payload,
      }
    case 'SIGNUP':
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        user: action.payload,
      }
    case 'LOGOUT':
      localStorage.removeItem('token')
      return {
        ...state,
        user: null,
      }
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user })

  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>
        {children}
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  )
}

export const useAuthState = () => useContext(AuthStateContext)
export const useAuthDispatch = () => useContext(AuthDispatchContext)