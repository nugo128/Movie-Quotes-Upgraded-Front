<template>
  <nav class="pl-[70px] mt-24 flex flex-col gap-11 fixed">
    <div class="flex gap-6 items-center">
      <img :src="user.profile_picture" alt="" class="w-[60px] rounded-full" />
      <div>
        <h2 class="text-white mb-1 font-bold">{{ user.name }}</h2>
        <p class="text-white text-sm font-normal cursor-pointer">{{ $t('newsfeed.edit') }}</p>
      </div>
    </div>

    <div class="flex items-center gap-11 cursor-pointer">
      <img src="../assets/images/home.svg" alt="" />
      <h2 class="text-white text-xl mb-1">{{ $t('newsfeed.news_feed') }}</h2>
    </div>
    <div class="flex items-center gap-11 cursor-pointer">
      <img src="../assets/images/movie.svg" alt="" />
      <h2 class="text-white text-xl mb-1">{{ $t('newsfeed.movies_list') }}</h2>
    </div>
  </nav>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import axios from '@/config/axios/index.js'
const user = ref([])
onBeforeMount(async () => {
  const response = await axios.get('/api/user')

  user.value = response.data
})
</script>
