<template>newsfeed</template>
<script setup>
import axios from '@/config/axios/index.js'
import { onBeforeMount } from 'vue'
axios.get('/')
onBeforeMount(async () => {
  await axios.get('/sanctum/csrf-cookie')
  await axios
    .get('/api/user')
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>
