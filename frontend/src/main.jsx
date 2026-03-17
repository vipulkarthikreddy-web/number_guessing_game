import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/**
 * main.jsx - Application Entry Point
 *
 * This is the first file Vite loads. It:
 * 1. Finds the <div id="root"> in index.html
 * 2. Mounts the entire React app inside it
 * 3. React.StrictMode helps catch bugs during development
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
