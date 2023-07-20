import axios from '@/config/axios/index.js'
export default {
  getCategories: async function () {
    const response = await axios.get('/api/category')
    this.categories = response.data
  },
  getUserMovies: async function () {
    const response = await axios.get('/api/user-movies')
    this.userMovies = response.data
  },
  getMovie: async function () {
    const response = await axios.get('/api/movies')
    this.movies = response.data
  }
}
