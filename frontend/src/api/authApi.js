import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/auth'

export const registerUser = async (username, password) => {
  const res = await axios.post(`${BASE_URL}/register`, { username, password })
  return res.data
}

export const loginUser = async (username, password) => {
  const res = await axios.post(`${BASE_URL}/login`, { username, password })
  return res.data
}

export const getUserStats = async (userId) => {
  const res = await axios.get(`${BASE_URL}/stats/${userId}`)
  return res.data
}
