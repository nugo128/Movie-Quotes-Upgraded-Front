<template>
  <div>
    <profile-header></profile-header>
    <newitem-modal v-if="addNewMovie" :click="newMovieHandler">
      <new-movie></new-movie>
    </newitem-modal>
    <div>
      <user-navbar></user-navbar>
      <div class="pl-440 pt-28 pr-16">
        <div class="text-white flex items-center justify-between mb-16">
          <h2 class="text-lg">
            total num of movies <span>{{ movies.length }}</span>
          </h2>
          <div class="flex items-center gap-4">
            <search-bar></search-bar>
            <button
              @click="newMovieHandler"
              class="py-2 px-4 bg-[#E31221] rounded-lg flex gap-2 items-center"
            >
              <img src="../assets/images/plus.svg" alt="" />Add movie
            </button>
          </div>
        </div>
        <div class="h-max flex flex-wrap gap-12">
          <user-movie
            v-for="movie in movies"
            :key="movie.id"
            :title="movie.title"
            :year="movie.year"
            :thumbnail="movie.thumbnail"
            :quotes="movie.quote.length"
          ></user-movie>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import UserNavbar from '../Components/UserNavbar.vue'
import profileHeader from '../Components/profileHeader.vue'
import NewitemModal from '../Components/NewitemModal.vue'
import NewMovie from '../Components/NewMovie.vue'
import SearchBar from '../Components/SearchBar.vue'
import UserMovie from '../Components/UserMovie.vue'
import axios from '@/config/axios/index.js'
import { useMovieStore } from '../stores/movie'
import { onBeforeMount, ref } from 'vue'
const addNewMovie = ref(false)
const newMovieHandler = () => {
  addNewMovie.value = !addNewMovie.value
}
const store = useMovieStore()
store.getUserMovies()
const movies = ref(store.userMovies)

console.log(movies.value.length)
onBeforeMount(async () => {
  store.getUserMovies()
  movies.value = store.userMovies
  if (!movies.value.length) {
    const response = await axios.get('/api/user-movies')
    movies.value = response.data
  }
  if (!store.categories.length) {
    store.getCategories()
  }
})
</script>
