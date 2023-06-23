<template>
  <div>
    <profile-header></profile-header>

    <div>
      <user-navbar></user-navbar>
      <div class="pl-440 pt-28 pr-16 flex flex-col gap-8">
        <h2 class="text-white text-lg">Movie description</h2>
        <div class="flex gap-2">
          <img src="../assets/images/LOTR.png" class="w-[800px] h-[400px] rounded-xl" alt="" />
          <div class="w-600 pl-4 flex flex-col gap-6">
            <div class="flex justify-between">
              <h2 class="text-[#DDCCAA] text-xl">Movie title and <span>year</span></h2>
              <div class="flex gap-4 bg-[#24222F] py-2 px-7 rounded-xl">
                <img src="../assets/images/edit.svg" class="w-5 h-5 cursor-pointer" alt="" />
                <div class="h-full w-[1px] bg-[#EFEFEF33]"></div>
                <img src="../assets/images/delete.svg" class="w-5 h-5 cursor-pointer" alt="" />
              </div>
            </div>
            <div class="flex gap-4 flex-wrap">
              <h3 class="bg-[#6C757D] w-max px-3 py-1 rounded-md">Drama</h3>
            </div>
            <div>
              <h2 class="text-[#CED4DA]">Director: <span class="text-white">vinme</span></h2>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia exercitationem ea
              quidem quos ducimus iusto ipsa magni dignissimos, odio accusantium aliquam quasi?
              Molestiae officia illum error quas illo, eveniet inventore!
            </p>
          </div>
        </div>
        <div class="flex gap-4 items-center">
          <h2 class="text-white text-xl">Quotes (total <span>7</span>)</h2>
          <div class="h-7 w-[1px] bg-[#EFEFEF33]"></div>
          <button
            @click="newMovieHandler"
            class="py-2 px-4 bg-[#E31221] rounded-lg flex gap-2 items-center"
          >
            <img src="../assets/images/plus.svg" alt="" />Add quote
          </button>
        </div>
        <div class="flex flex-col gap-10">
          <movie-quotes></movie-quotes>
          <movie-quotes></movie-quotes>
          <movie-quotes></movie-quotes>
          <movie-quotes></movie-quotes>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import profileHeader from '../Components/profileHeader.vue'
import UserNavbar from '../Components/UserNavbar.vue'
import MovieQuotes from '../Components/MovieQuotes.vue'
</script>
