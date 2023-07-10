<template>
  <div class="md:relative">
    <div class="flex gap-4">
      <div @click="appearSearch" class="flex gap-4 cursor-pointer">
        <img src="../assets/images/search.svg" class="w-6 md:-mt-7" />
        <h2 class="text-white md:block hidden" v-if="!search">{{ $t('newsfeed.search') }}</h2>
      </div>
      <Form v-if="search" class="md:block hidden">
        <Field name="search" v-slot="{ field }">
          <input
            id="search"
            v-bind="field"
            class="md:w-[34.375rem] w-15 bg-black placeholder-white text-white outline-none"
            type="text"
            @input="submit"
            :placeholder="
              movie
                ? 'Search movie'
                : `${$t('newsfeed.search_placeholder_1')}, ${$t('newsfeed.search_placeholder_2')}`
            "
          />
        </Field>
      </Form>
      <div v-if="search" class="md:hidden w-full h-screen z-[999] absolute left-0 top-0">
        <div class="h-4/5 bg-black">
          <div class="flex gap-8 px-8 py-6">
            <img src="../assets/images/back.svg" alt="" @click="toggleSearch" />
            <Form class="w-full">
              <Field name="search" v-slot="{ field }">
                <input
                  id="search"
                  v-bind="field"
                  class="bg-black placeholder-white text-white outline-none"
                  type="text"
                  @input="submit"
                  :placeholder="$t('newsfeed.search_mobile')"
                />
              </Field>
            </Form>
          </div>
          <div class="h-[0.5px] w-full bg-[#EFEFEF4D]"></div>

          <div class="flex flex-col gap-5 mt-6 ml-20">
            <p>{{ $t('newsfeed.search_placeholder_1') }}</p>
            <p>{{ $t('newsfeed.search_placeholder_2') }}</p>
          </div>
        </div>
        <div class="h-1/5 bg-transparent" @click="toggleSearch"></div>
      </div>
    </div>
    <div class="md:block hidden h-[0.5px] w-full bg-[#EFEFEF4D] mt-7 absolute" v-if="search"></div>
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
const toggleSearch = () => {
  search.value = !search.value
}
const movieStore = useMovieStore()
const store = usePostsStore()
const search = ref(false)
const emits = defineEmits(['searched', 'movieSearched'])
const submit = async (e) => {
  if (e?.target?.value?.length > 0) {
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
  submit('')
}
</script>
