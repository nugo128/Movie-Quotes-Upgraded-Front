<template>
  <img src="@/assets/images/check.png" alt="" class="w-14" />
  <h2 class="text-3xl">{{ mainText }}</h2>
  <p class="text-center text-sm font-light">
    {{ secondaryText }}
  </p>
  <router-link
    v-if="linkText"
    :to="{ name: 'news_feed' }"
    class="bg-[#E31221] w-full text-center py-2"
  >
    {{ linkText }}
  </router-link>
  <button v-if="login" class="bg-[#E31221] w-full text-center py-2" @click="showLogin">
    {{ login }}
  </button>
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
