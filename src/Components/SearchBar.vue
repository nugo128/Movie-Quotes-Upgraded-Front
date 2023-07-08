<template>
  <div class="relative">
    <div class="flex gap-4">
      <div @click="appearSearch" class="flex gap-4 cursor-pointer">
        <img src="../assets/images/search.svg" class="w-6" lt="" />
        <h2 class="text-white md:block hidden" v-if="!search">{{ $t('newsfeed.search') }}</h2>
      </div>

      <Form v-if="search">
        <Field name="search" v-slot="{ field }">
          <input
            id="search"
            v-bind="field"
            class="w-[550px] bg-black placeholder-white text-white outline-none"
            type="text"
            @input="submit"
            :placeholder="movie ? 'Search movie' : $t('newsfeed.search_placeholder')"
          />
        </Field>
      </Form>
    </div>
    <div class="h-[0.5px] w-full bg-[#EFEFEF4D] mt-2 absolute" v-if="search"></div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { Form, Field } from 'vee-validate'
import axios from '@/config/axios/index.js'
import { usePostsStore } from '../stores/post'
import { useMovieStore } from '../stores/movie'
const props = defineProps({
  movie: {
    type: String,
    required: false
  }
})
const movieStore = useMovieStore()
const store = usePostsStore()
const search = ref(false)
const emits = defineEmits(['searched', 'movieSearched'])
const submit = async (e) => {
  if (e.target.value.length > 0) {
    if (!props.movie) {
      const resp = await axios.get('/api/search-post', {
        params: {
          search: e.target.value
        }
      })
      store.searchedPosts(resp.data)
      emits('searched')
    } else {
      const resp = await axios.get('/api/search-movie', {
        params: {
          search: e.target.value
        }
      })
      movieStore.searchedMovies(resp.data)
      emits('movieSearched')
    }
  } else {
    if (!props.movie) {
      store.getPosts()
    } else {
      emits('movieSearched')
    }
  }
}
const appearSearch = () => {
  search.value = !search.value
}
</script>
