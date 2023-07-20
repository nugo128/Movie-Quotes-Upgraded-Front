import { defineStore } from 'pinia'
import actions from './actions'
import getters from './getters'

export const useMovieStore = defineStore('movies', {
  state: () => ({
    movies: [],
    movieDescription: {},
    userMovies: [],
    upload: 'Upload Image',
    file: null,
    categories: []
  }),
  actions,
  getters
})
