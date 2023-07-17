<template>
  <div>
    <div class="flex items-center gap-6">
      <img :src="store.getUrl(profilePicture)" alt="profile" class="w-12 h-12 rounded-full" />
      <div>
        <h2 class="text-white">{{ commentAuthor }}</h2>
      </div>
    </div>
    <div class="ml-[74px]">
      <p class="text-white break-words">
        {{ comment }}
      </p>
      <div class="w-full h-[1px] bg-[#EFEFEF4D] my-6"></div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useUsersStore } from '../stores/user'
defineProps({
  comment: {
    type: String,
    required: true
  },
  commentAuthor: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    required: true
  }
})
const store = useUsersStore()
</script>
