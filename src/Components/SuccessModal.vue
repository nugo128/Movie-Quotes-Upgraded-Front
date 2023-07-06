<template>
  <div
    class="md:bg-transparent py-5 px-10 md:bg-none bg-gradient-to-br from-black to-gray-900 flex flex-col items-center md:justify-center justify-start text-white gap-7 rounded-lg"
  >
    <img src="@/assets/images/check.png" alt="" class="md:w-14 w-12" />
    <h2 class="text-2xl md:text-3xl">{{ mainText }}</h2>
    <p class="text-center md:text-sm text-xs font-light">
      {{ secondaryText }}
    </p>
    <router-link
      v-if="linkText"
      :to="{ name: 'news_feed' }"
      class="bg-[#E31221] md:w-full md:px-0 text-center py-2 px-4 rounded-md md:text-base text-xs"
    >
      {{ linkText }}
    </router-link>
    <button
      v-if="login"
      class="bg-[#E31221] md:w-full md:px-0 text-center py-2 px-4 rounded-md md:text-base text-xs"
      @click="showLogin"
    >
      {{ login }}
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
const emits = defineEmits(['showLogin'])
const showLogin = () => {
  emits('showLogin', true)
}
defineProps({
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
    required: false
  },
  login: {
    type: String,
    required: false
  }
})
</script>
