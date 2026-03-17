import React from 'react'

/**
 * StatsCard - Displays user stats in a clean card grid.
 * Used in both the main game page header and standalone stats view.
 */
function StatsCard({ user }) {
  if (!user) return null

  const stats = [
    { label: 'Games Played', value: user.totalGames, color: '#00D8FF' },
    { label: 'Wins', value: user.totalWins, color: '#6DB33F' },
    { label: 'Win Rate', value: `${user.winRate}%`, color: '#FF6B9D' },
    { label: 'Best Score', value: user.bestScore > 0 ? `${user.bestScore} tries` : '—', color: '#F29111' },
  ]

  return (
    <div className="stats-grid">
      {stats.map((s) => (
        <div className="stat-box" key={s.label} style={{ borderColor: s.color }}>
          <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  )
}

export default StatsCard
