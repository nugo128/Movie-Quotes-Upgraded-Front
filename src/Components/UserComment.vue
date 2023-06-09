<template>
  <div>
    <div class="flex items-center gap-6">
      <img :src="profilePicture" alt="profile" class="w-12" />
      <div>
        <h2 class="text-white">{{ commentAuthor }}</h2>
      </div>
    </div>
    <div class="ml-[74px]">
      <p class="text-white">
        {{ comment }}
      </p>
      <div class="w-full h-[1px] bg-[#EFEFEF4D] my-6"></div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
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
</script>
