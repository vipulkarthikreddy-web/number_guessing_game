import React, { useState } from 'react'
import { registerUser, loginUser } from '../api/authApi.js'
import { useAuth } from '../context/AuthContext.jsx'

function LoginPage() {
  const { login } = useAuth()
  const [tab, setTab] = useState('login') // 'login' | 'register'
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!username.trim() || !password.trim()) {
      setMessage('Please enter both username and password.')
      setIsError(true)
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const data = tab === 'login'
        ? await loginUser(username, password)
        : await registerUser(username, password)

      if (data.success) {
        setIsError(false)
        setMessage(data.message)
        setTimeout(() => login(data.user), 500) // brief delay to show success
      } else {
        setIsError(true)
        setMessage(data.message)
      }
    } catch (err) {
      setIsError(true)
      setMessage('Cannot connect to server. Is Spring Boot running?')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="page-center">
      <div className="auth-card">

        {/* Title */}
        <div className="auth-title-block">
          <div className="auth-icon">🎯</div>
          <h1 className="auth-title">Number Guessing Game</h1>
          <p className="auth-subtitle">Sign in to track your stats & compete!</p>
        </div>

        {/* Tabs */}
        <div className="tab-row">
          <button
            className={`tab-btn ${tab === 'login' ? 'tab-active' : ''}`}
            onClick={() => { setTab('login'); setMessage('') }}
          >
            Login
          </button>
          <button
            className={`tab-btn ${tab === 'register' ? 'tab-active' : ''}`}
            onClick={() => { setTab('register'); setMessage('') }}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <div className="auth-form">
          <div className="input-group">
            <label className="input-label">Username</label>
            <input
              type="text"
              className="auth-input"
              placeholder="Enter username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              className="auth-input"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {message && (
            <div className={`auth-message ${isError ? 'auth-error' : 'auth-success'}`}>
              {message}
            </div>
          )}

          <button
            className="btn btn-primary btn-full"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Please wait...' : tab === 'login' ? 'Login' : 'Create Account'}
          </button>
        </div>

        <p className="auth-footer">
          {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <span className="auth-link" onClick={() => { setTab(tab === 'login' ? 'register' : 'login'); setMessage('') }}>
            {tab === 'login' ? 'Register here' : 'Login here'}
          </span>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
