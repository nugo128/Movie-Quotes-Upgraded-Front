<template>
  <div class="mb-10">
    <div class="flex items-center gap-5 mb-4">
      <img src="../assets/images/profile.png" alt="profile picture" class="w-[52px]" />
      <h2 class="text-white text-lg">Nugo Rostiashvili</h2>
    </div>
    <h2 class="text-white mb-7">
      <span>“Follow your dream.”</span>
      <span class="text-[#DDCCAA]">Billy Elliot. (2000)</span>
    </h2>
    <img src="../assets/images/LOTR.png" alt="quote picture" />
    <div class="flex gap-5 mt-6">
      <div class="flex gap-2 items-center">
        <span class="text-white">3</span>
        <img src="../assets/images/comment.svg" alt="comment icon" class="cursor-pointer" />
      </div>
      <div class="flex gap-2 items-center">
        <span class="text-white">10</span>
        <img src="../assets/images/like.svg" alt="like icon" class="cursor-pointer" />
      </div>
    </div>
    <div class="w-full h-[1px] bg-[#EFEFEF4D] my-6"></div>
    <user-comment></user-comment>
    <div class="flex gap-6">
      <img src="../assets/images/profile.png" alt="" class="w-[52px]" />
      <form action="POST" class="w-full">
        <input
          type="text"
          :placeholder="$t('newsfeed.comment')"
          class="bg-[#24222F] w-full h-14 p-7 outline-none"
        />
      </form>
    </div>
  </div>
</template>

<script setup>
import UserComment from './UserComment.vue'
</script>
