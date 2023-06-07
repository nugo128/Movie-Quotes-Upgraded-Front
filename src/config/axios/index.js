import axios from 'axios'
axios.defaults.withCredentials = true

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

export default axiosInstance
