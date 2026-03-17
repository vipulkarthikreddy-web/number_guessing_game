import React, { useState } from 'react'
import { startGame, makeGuess, abandonGame } from '../api/gameApi.js'
import { getUserStats } from '../api/authApi.js'
import { useAuth } from '../context/AuthContext.jsx'
import StatsCard from './StatsCard.jsx'

function Game() {
  const { user, logout, updateUser } = useAuth()
  const [gameId, setGameId]       = useState(null)
  const [guess, setGuess]         = useState('')
  const [message, setMessage]     = useState('')
  const [attempts, setAttempts]   = useState(0)
  const [gameOver, setGameOver]   = useState(false)
  const [loading, setLoading]     = useState(false)
  const [showStats, setShowStats] = useState(false)

  const refreshStats = async () => {
    try {
      const data = await getUserStats(user.id)
      if (data.success) updateUser(data.user)
    } catch (_) {}
  }

  const handleStartGame = async () => {
    if (gameId && !gameOver && attempts > 0) {
      try { await abandonGame(gameId) } catch (_) {}
      await refreshStats()
    }
    setLoading(true)
    try {
      const data = await startGame(user.id)
      setGameId(data.gameId)
      setMessage(data.message)
      setAttempts(0)
      setGuess('')
      setGameOver(false)
    } catch {
      setMessage('Could not connect to backend. Is Spring Boot running?')
    } finally {
      setLoading(false)
    }
  }

  const handleGuess = async () => {
    if (!guess || isNaN(guess) || guess < 1 || guess > 100) {
      setMessage('Please enter a valid number between 1 and 100.')
      return
    }
    setLoading(true)
    try {
      const data = await makeGuess(gameId, guess)
      setMessage(data.message)
      setAttempts(data.attempts)
      setGameOver(data.gameOver)
      setGuess('')
      if (data.gameOver) await refreshStats()
    } catch {
      setMessage('Error submitting guess. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && gameId && !gameOver) handleGuess()
  }

  return (
    <div className="game-page">

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-brand">🎯 Number Game</div>
        <div className="nav-right">
          <button className="nav-btn" onClick={() => setShowStats(s => !s)}>
            📊 {showStats ? 'Hide Stats' : 'My Stats'}
          </button>
          <div className="nav-user">👤 {user?.username}</div>
          <button className="nav-btn nav-logout" onClick={logout}>Logout</button>
        </div>
      </nav>

      {/* Stats Panel */}
      {showStats && (
        <div className="stats-panel">
          <h3 className="stats-heading">Your Stats — {user?.username}</h3>
          <StatsCard user={user} />
        </div>
      )}

      {/* Game Card */}
      <div className="game-container">
        <h1 className="game-title">Number Guessing Game</h1>
        <p className="game-subtitle">
          Guess a number between <strong>1</strong> and <strong>100</strong>
        </p>

        <button className="btn btn-start" onClick={handleStartGame} disabled={loading}>
          {gameId && !gameOver ? '🔄 New Game' : '🚀 Start Game'}
        </button>

        {gameId && !gameOver && (
          <div className="guess-section">
            <p className="game-id-label">Game ID: <span>{gameId}</span></p>
            <div className="input-row">
              <input
                type="number"
                className="guess-input"
                placeholder="Your guess (1–100)..."
                value={guess}
                min="1" max="100"
                onChange={(e) => setGuess(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
              />
              <button
                className="btn btn-guess"
                onClick={handleGuess}
                disabled={loading || !guess}
              >
                {loading ? '...' : 'Guess'}
              </button>
            </div>
          </div>
        )}

        {message && (
          <div className={`message-box ${gameOver ? 'message-success' : ''}`}>
            <p>{message}</p>
          </div>
        )}

        {gameId && attempts > 0 && (
          <div className="attempts-counter">
            Attempts: <strong>{attempts}</strong>
          </div>
        )}

        {gameOver && (
          <button className="btn btn-start" onClick={handleStartGame} style={{ marginTop: '1rem' }}>
            🔄 Play Again
          </button>
        )}
      </div>
    </div>
  )
}

export default Game
