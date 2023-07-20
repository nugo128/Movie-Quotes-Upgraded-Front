<template>
  <div>
    <div class="flex items-center md:gap-6 gap-4">
      <img
        :src="store.getUrl(profilePicture)"
        alt="profile"
        class="md:w-12 md:h-12 w-10 h-10 rounded-full"
      />
      <div>
        <h2 class="text-white text-sm md:text-base">{{ commentAuthor }}</h2>
      </div>
    </div>
    <div class="md:ml-[4.625rem] mt-3">
      <p class="text-white break-words text-sm md:text-base">
        {{ comment }}
      </p>
      <div class="w-full h-[1px] bg-[#EFEFEF4D] my-6"></div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useUsersStore } from '../stores/userStore'
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
