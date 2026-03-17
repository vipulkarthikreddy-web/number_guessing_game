import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/game'

export const startGame = async (userId) => {
  const response = await axios.post(`${BASE_URL}/start`, { userId })
  return response.data
}

export const makeGuess = async (gameId, guess) => {
  const response = await axios.post(`${BASE_URL}/guess`, {
    gameId,
    guess: parseInt(guess),
  })
  return response.data
}

export const abandonGame = async (gameId) => {
  await axios.post(`${BASE_URL}/abandon`, { gameId })
}
