import axios from '@/config/axios/index.js'

export async function userLogin(data) {
  await axios.get('/sanctum/csrf-cookie')
  const response = await axios.post('api/login', data)
  if (response.statusText === 'OK') {
    return true
  }

  return response
}
export async function userLogOut() {
  const response = await axios.get('/api/logout')
  if (response.statusText === 'OK') {
    return true
  }

  return response
}

export async function register(data) {
  await axios.get('/sanctum/csrf-cookie')
  const response = await axios.post('api/register', data)
  if (response.statusText === 'OK') {
    return true
  }

  return response
}

export async function googleLogin() {
  await axios.get('/sanctum/csrf-cookie')
  const response = await axios.get('/api/auth/google')

  return response
}
export async function resetPassword(data) {
  const response = await axios.post('/api/forgot-password', data)
  if (response.statusText === 'OK') {
    return true
  }

  return response
}

export async function newPassword(data) {
  const response = await axios.post('/api/reset-password', data)
  if (response.statusText === 'OK') {
    return true
  }

  return response
}

export async function like(data) {
  const response = await axios.post('api/like', data)
  if (response.statusText === 'OK') {
    return true
  }

  return response
}
export async function removeLike(data) {
  const response = await axios.post('/api/remove-like', data)
  if (response.statusText === 'OK') {
    return true
  }

  return response
}
export async function getLikes(data) {
  const response = await axios.post('/api/get-likes', data)
  if (response.status === 200) {
    return true
  }

  return false
}
export async function comments(data) {
  const response = await axios.post('api/comment', data)
  if (response.statusText === 'OK') {
    return true
  }

  return response
}
