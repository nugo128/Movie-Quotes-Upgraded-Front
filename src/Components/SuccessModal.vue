<template>
  <img src="@/assets/images/check.png" alt="" class="w-14" />
  <h2 class="text-3xl">{{ mainText }}</h2>
  <p class="text-center text-sm font-light">
    {{ secondaryText }}
  </p>
  <router-link :to="{ name: 'news_feed' }" class="bg-[#E31221] w-full text-center py-2">
    {{ linkText }}
  </router-link>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  mainText: {
    type: String,
    required: true
  },
  secondaryText: {
    type: String,
    required: true
  },
  linkText: {
    type: String,
    required: true
  }
})
</script>
