import axios from '@/config/axios/index.js'

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
export async function comment(data) {
  const response = await axios.post('api/comment', data)
  if (response.statusText === 'OK') {
    return true
  }

  return response
}
