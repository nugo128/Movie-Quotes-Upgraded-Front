<template>
  <div class="mb-10">
    <div class="flex items-center gap-5 mb-4">
      <img :src="profilePicture" alt="profile picture" class="w-[52px]" />
      <h2 class="text-white text-lg">{{ username }}</h2>
    </div>
    <h2 class="text-white mb-7">
      <span>“{{ quote }}”</span>
      <span class="text-[#DDCCAA]"
        >{{ movie }} <span>({{ year }})</span></span
      >
    </h2>
    <img :src="thumbnail" alt="quote picture" class="w-full" />
    <div class="flex gap-5 mt-6">
      <div class="flex gap-2 items-center">
        <span class="text-white">{{ comment.length }}</span>
        <img src="../assets/images/comment.svg" alt="comment icon" class="cursor-pointer" />
      </div>
      <div class="flex gap-2 items-center">
        <span class="text-white">{{ numOfLikes }}</span>
        <img src="../assets/images/like.svg" alt="like icon" class="cursor-pointer" />
      </div>
    </div>
    <div class="w-full h-[1px] bg-[#EFEFEF4D] my-6"></div>
    <div v-for="comments in comment">
      <user-comment
        :comment="comments.comments"
        :commentAuthor="comments.user.name"
        :profilePicture="comments.user.profile_picture"
      ></user-comment>
    </div>
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
import { defineProps } from 'vue'
const props = defineProps({
  username: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    required: true
  },
  movie: {
    type: String,
    required: true
  },
  quote: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  comment: {
    type: Array,
    required: true
  },
  numOfLikes: {
    type: Number,
    required: true
  }
})
</script>
