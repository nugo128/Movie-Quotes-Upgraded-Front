import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/config/axios/index.js'
export const useMovieStore = defineStore('movies', () => {
  const movies = ref([])
  const userMovies = ref([])
  const upload = ref('Upload Image')
  const file = ref(null)
  const categories = ref([])
  const getMovie = async () => {
    const response = await axios.get('/api/movies')
    movies.value = response.data
  }
  const addFile = (img) => {
    upload.value = 'Image Uploaded'
    file.value = img
  }
  const getUserMovies = async () => {
    const response = await axios.get('/api/user-movies')
    userMovies.value = response.data
  }
  const clear = () => {
    userMovies.value = []
  }
  const searchedMovies = (val) => {
    clear()
    userMovies.value.push(...val)
  }
  const getCategories = async () => {
    const response = await axios.get('/api/category')
    categories.value = response.data
  }
  return {
    file,
    upload,
    movies,
    userMovies,
    categories,
    getUserMovies,
    getMovie,
    addFile,
    getCategories,
    searchedMovies
  }
})
