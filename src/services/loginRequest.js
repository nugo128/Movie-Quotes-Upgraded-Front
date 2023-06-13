import axios from '@/config/axios/index.js'

export async function userLogin(data) {
  await axios.get('/sanctum/csrf-cookie')
  const response = await axios.post('api/login', data)
  if (response.statusText === 'OK') {
    return true
  }

  return false
}
