import React from 'react'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Game from './components/Game.jsx'

function AppContent() {
  const { user } = useAuth()
  return user ? <Game /> : <LoginPage />
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
