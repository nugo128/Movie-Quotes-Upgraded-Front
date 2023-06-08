<template>
  <div class="bg-black h-max">
    <profile-header></profile-header>
    <div class="pt-8 flex">
      <user-navbar></user-navbar>
      <div class="w-[900px] ml-[140px]">
        <div class="flex justify-between gap-10 w-full mb-11">
          <div class="flex gap-3">
            <img src="../assets/images/new-quote.svg" class="w-5" alt="" />
            <h2 class="text-white w-[180px]">Write new quote</h2>
          </div>
          <search-bar />
        </div>
        <user-post />
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from '@/config/axios/index.js'
import profileHeader from '../Components/profileHeader.vue'
import UserNavbar from '../Components/UserNavbar.vue'
import SearchBar from '../Components/SearchBar.vue'
import UserPost from '../Components/UserPost.vue'
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
