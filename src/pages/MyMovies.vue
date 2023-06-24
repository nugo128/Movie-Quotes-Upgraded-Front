<template>
  <div>
    <profile-header></profile-header>
    <newitem-modal v-if="addNewMovie" :click="newMovieHandler">
      <new-movie @new-movie="displayNewMovie"></new-movie>
    </newitem-modal>
    <div>
      <user-navbar></user-navbar>
      <div class="pl-440 pt-28 pr-16">
        <div class="text-white flex items-center justify-between mb-16">
          <h2 class="text-lg">
            total num of movies <span>{{ movies.length }}</span>
          </h2>
          <div class="flex items-center gap-4">
            <search-bar @movieSearched="searchHandler" movie="true"></search-bar>
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
            :quotes="movie?.quote?.length"
            @click="seeDescription(movie)"
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
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const store = useMovieStore()
const movies = ref(store.userMovies)
const displayNewMovie = (val) => {
  addNewMovie.value = false
  movies.value.unshift(val.data)
}
const router = useRouter()
const addNewMovie = ref(false)
const newMovieHandler = () => {
  addNewMovie.value = !addNewMovie.value
}
const seeDescription = (movie) => {
  router.replace({ path: '/movie-description', query: { id: movie.id } })
}
const searchHandler = () => {
  store.getUserMovies()
  movies.value = store.userMovies
}
onBeforeMount(async () => {
  if (!store.userMovies.length) {
    store.getUserMovies()
    const response = await axios.get('/api/user-movies')
    movies.value = response.data
  }
  movies.value = store.userMovies
  if (!store.categories.length) {
    store.getCategories()
  }
  console.log(route?.query.delete)
  if (route?.query.delete) {
    let index = movies.value.find((movie) => movie.id == route?.query.delete)

    if (index) {
      let values = movies.value
      values.splice(values.indexOf(index), 1)
      movies.value = values
    }
  }
})
</script>
