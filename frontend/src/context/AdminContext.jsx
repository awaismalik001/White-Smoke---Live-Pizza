import { createContext, useState, useEffect } from 'react'

export const AdminContext = createContext()

export function AdminProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('ws_admin_token') || null)

  const isAuthenticated = Boolean(token)

  const login = (newToken) => {
    localStorage.setItem('ws_admin_token', newToken)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem('ws_admin_token')
    setToken(null)
  }

  return (
    <AdminContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AdminContext.Provider>
  )
}
