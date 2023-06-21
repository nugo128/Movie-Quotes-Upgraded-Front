<template>
  <div>
    <h2 class="text-center pt-8">Add movie</h2>
    <div class="w-full h-[1px] bg-[#EFEFEF33] mt-4 bg-opacity-20"></div>
  </div>
  <div class="flex flex-col gap-6 px-8">
    <div class="flex gap-5 items-center">
      <img
        :src="store.getUrl(user[0]?.profile_picture)"
        alt="user profile picture"
        class="w-15 h-15 rounded-full"
      />
      <h2>{{ user[0]?.name }}</h2>
    </div>
    <Form class="flex flex-col gap-4">
      <movie-input name="title_en" label="Movie name" lang="Eng"></movie-input>
      <movie-input name="title_ka" label="ფილმის სახელი" lang="ქარ"></movie-input>
      <movie-input name="year" label="Year/წელი"></movie-input>
      <movie-input name="director_en" label="Director" lang="Eng"></movie-input>
      <movie-input name="director_ka" label="რეჟისორი" lang="ქარ"></movie-input>
    </Form>
  </div>
</template>

<script setup>
import { useUsersStore } from '../stores/user'
import MovieInput from './MovieInput.vue'
import { ref, onBeforeMount } from 'vue'
import { Form } from 'vee-validate'
const store = useUsersStore()
const user = ref(store.authUser)
onBeforeMount(async () => {
  if (!user.value.length) {
    store.getAuthUser()
    user.value = store.authUser
  }
})
</script>
