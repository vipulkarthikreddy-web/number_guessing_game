import axios from 'axios'

const BASE_URL = 'https://numberguessinggame-production-7ac2.up.railway.app/api/game'

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