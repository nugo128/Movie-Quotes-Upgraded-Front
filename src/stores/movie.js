import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/config/axios/index.js'
export const useMovieStore = defineStore('movies', () => {
  const movies = ref([])
  const userMovies = ref([])
  const upload = ref('Upload Image')
  const file = ref(null)

  const getMovie = async () => {
    const response = await axios.get('/api/movies')
    movies.value = response.data
  }
  const addFile = (img) => {
    upload.value = 'Image Uploaded'
    file.value = img
  }
  const getUserMovies = async (data) => {
    const response = await axios.get('/api/user-movies')
    userMovies.value = response.data
  }
  return { file, upload, movies, userMovies, getUserMovies, getMovie, addFile }
})
