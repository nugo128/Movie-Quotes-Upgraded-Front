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
export async function deleteQuotes(id) {
  return await axios.delete(`/api/delete-quote/${id}`)
}
export async function addMovie(data) {
  return await axios.post('/api/add-movie', data)
}
export async function editMovie(data) {
  return await axios.post('/api/update-movie', data)
}
export async function newPost(data) {
  return await axios.post('/api/newPost', data)
}
export async function editQuote(data) {
  return await axios.post('/api/edit-quote', data)
}
export async function getUser() {
  return await axios.get('/api/user')
}
export async function getNotification(user) {
  return await axios.get(`/api/get-notifications/${user}`)
}
export async function seenNotifications(data) {
  return await axios.post('/api/read-notifications', data)
}
export async function verifyUser(token) {
  await axios.get('/sanctum/csrf-cookie')
  return await axios.get(`/api/verify/${token}`)
}
export async function movieDescription(id) {
  return await axios.get('/api/movie-description', {
    params: {
      id
    }
  })
}
export async function deleteMovies(id) {
  return await axios.delete(`/api/delete-movie/${id}`)
}
export async function getUMovies() {
  return await axios.get('/api/user-movies')
}
export async function verifyEmail(token) {
  return await axios.get(`/api/verify-new-email/${token}`)
}
export async function editProfile(data) {
  return await axios.post('/api/editProfile', data)
}
export async function viewQuote(id) {
  return await axios.get('/api/view-quote', {
    params: {
      id
    }
  })
}
