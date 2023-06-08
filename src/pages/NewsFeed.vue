<template>
  <div class="bg-black h-[100vh]">
    <profile-header></profile-header>
    <user-navbar></user-navbar>
  </div>
</template>
<script setup>
import axios from '@/config/axios/index.js'
import profileHeader from '../Components/profileHeader.vue'
import UserNavbar from '../Components/UserNavbar.vue'
import { onBeforeMount } from 'vue'
onBeforeMount(async () => {
  // await axios
  //   .get('/api/user')
  //   .then((response) => {
  //     console.log(response)
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
})
</script>
