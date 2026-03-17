import React, { createContext, useContext, useState } from 'react'

/**
 * AuthContext - Global user state management.
 *
 * Stores the logged-in user object across all components.
 * Any component can call useAuth() to get/set the current user.
 */
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null) // null = not logged in

  const login = (userData) => setUser(userData)
  const logout = () => setUser(null)
  const updateUser = (updatedUser) => setUser(updatedUser)

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
