import axios from '@/config/axios/index.js'

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
