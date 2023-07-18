<template>
  <div>
    <profile-header></profile-header>
    <newitem-modal v-if="addNewMovie || route.query.addMovie" :click="newMovieHandler">
      <new-movie @new-movie="displayNewMovie"></new-movie>
    </newitem-modal>
    <div>
      <user-navbar class="hidden md:flex"></user-navbar>
      <div class="md:pl-440 pt-28 md:pr-16 w-screen flex flex-col px-8">
        <div class="text-white flex items-center justify-between md:mb-16 mb-10">
          <h2 class="text-lg flex md-flex-row flex-col md:gap-0 gap-3">
            <span>{{ $t('movies.my_list') }} </span>
            <span class="text-sm">({{ $t('movies.total') }} {{ movies.length }})</span>
          </h2>
          <div class="flex items-center gap-4">
            <search-bar
              @movieSearched="searchHandler"
              movie="true"
              class="md:block hidden"
            ></search-bar>
            <button
              @click="newMovieHandler"
              class="py-2 px-2 md:px-4 bg-[#E31221] rounded-lg flex gap-2 items-center -mt-4 md:mt-0 text-sm md:text-base"
            >
              <img src="../assets/images/plus.svg" alt="" />
              <span class="hidden md:block">{{ $t('movies.add_movie') }}</span>
              <span class="block md:hidden">{{ $t('movies.add') }}</span>
            </button>
          </div>
        </div>
        <div class="h-max flex flex-wrap gap-6 justify-center md:px-0">
          <user-movie
            v-for="movie in movies"
            :key="movie?.id"
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
import { getUMovies, getUser } from '../services/index'
import { useMovieStore } from '../stores/movie'
import { onBeforeMount, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const store = useMovieStore()
const movies = ref(store.userMovies)
const displayNewMovie = (val) => {
  addNewMovie.value = false
  router.replace({ path: '/my-movies' })
  movies.value.unshift(val.data)
}
const router = useRouter()
const addNewMovie = ref(route.query.addMovie)
const newMovieHandler = () => {
  addNewMovie.value
    ? router.replace({ path: '/my-movies' })
    : router.replace({ path: '/my-movies', query: { addMovie: true } })
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
  await getUser().catch(() => {
    router.replace({ path: '/no-permission' })
  })
  if (!store.userMovies.length) {
    store.getUserMovies()
    const response = await getUMovies()
    movies.value = response.data
  }
  movies.value = store.userMovies
  if (!store.categories.length) {
    store.getCategories()
  }
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
