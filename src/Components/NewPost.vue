<template>
  <div>
    <h2 class="text-center pt-8">Write New Quote</h2>
    <div class="w-full h-[1px] bg-[#EFEFEF33] mt-4 bg-opacity-20"></div>
  </div>
  <div class="flex flex-col gap-6 px-8">
    <div class="flex gap-5 items-center">
      <img :src="user.profile_picture" alt="user profile picture" class="w-15 h-15 rounded-full" />
      <h2>{{ user.name }}</h2>
    </div>
    <img alt="" />
    <Form @submit="submit">
      <text-area
        name="quote_en"
        placeholder="Start create new quote"
        language="eng"
        rule="required"
      ></text-area>
      <text-area
        name="quote_ka"
        placeholder="ახალი ციტატა"
        language="ქარ"
        rule="required"
      ></text-area>
      <photo-upload></photo-upload>
      <div class="flex pl-3">
        <img src="../assets/images/movieCamera.svg" class="absolute z-0 mt-4" alt="" />
        <Field
          id=""
          as="select"
          class="z-50 select w-full focus:appearance-none focus:outline-none text-white bg-transparent mt-2 py-5 px-12 mb-10"
          name="movie_id"
        >
          <option class="bg-black mb-2" selected disabled value="">Choose Movie</option>
          <option class="bg-black px-0" v-for="movie in movieStore.movies" :value="movie.id">
            {{ movie.title }}
          </option>
        </Field>
      </div>
      <button class="w-full bg-[#E31221] py-3 rounded mb-10">POST</button>
    </Form>
  </div>
</template>

<script setup>
import { Form, Field } from 'vee-validate'
import textArea from './textArea.vue'
import PhotoUpload from './PhotoUpload.vue'
import { useMovieStore } from '../stores/movie'
import { useUsersStore } from '../stores/user'
import { onBeforeMount, ref, defineEmits } from 'vue'
import axios from '@/config/axios/index.js'
const emits = defineEmits(['posted'])
const formData = new FormData()
const userStore = useUsersStore()

const submit = async (val) => {
  for (let value in val) {
    formData.set(value, val[value])
  }
  movieStore.addFile(val.image)
  formData.set('thumbnail', movieStore.file)
  await axios.post('/api/newPost', formData)
  emits('posted')
}
const movieStore = useMovieStore()

const user = ref([])
onBeforeMount(async () => {
  const response = await axios.get('/api/user')
  movieStore.getMovie()
  user.value = response.data
  user.value.profile_picture = userStore.getUrl(response.data.profile_picture)
})
</script>
<style scoped>
.select {
  border: 0;
  background: none;
  appearance: none;
  -webkit-appearance: none;
}
</style>
