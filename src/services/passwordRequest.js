import axios from '@/config/axios/index.js'

export async function resetPassword(data) {
  const response = await axios.post('/api/forgot-password', data)
  if (response.statusText === 'OK') {
    return true
  }

  return false
}

export async function newPassword(data) {
  const response = await axios.post('/api/reset-password', data)
  if (response.statusText === 'OK') {
    return true
  }

  return false
}
