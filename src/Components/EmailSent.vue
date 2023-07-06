<template>
  <div
    class="md:bg-transparent py-5 w-11/12 md:bg-none bg-gradient-to-br from-black to-gray-900 flex flex-col items-center md:justify-center justify-start text-white gap-7 rounded-lg"
  >
    <img src="@/assets/images/email-sent.png" alt="" class="w-14" />
    <h2 class="text-2xl md:text-3xl">{{ sent }}</h2>
    <p class="text-center md:text-sm text-xs font-light">
      {{ check }}
    </p>
    <a
      href="https://mail.google.com/mail"
      target="_blank"
      class="bg-[#E31221] md:w-full text-center py-2 rounded-md"
      :class="skip ? 'w-64' : 'w-48 '"
      >{{ visitEmail }}</a
    >
    <h3 v-if="skip" @click="skipReset" class="cursor-pointer text-[#6C757D]">{{ skip }}</h3>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue'
const emits = defineEmits(['skip'])
const skipReset = () => {
  emits('skip')
}

defineProps({
  sent: {
    type: String,
    required: true
  },
  check: {
    type: String,
    required: true
  },
  visitEmail: {
    type: String,
    required: true
  },
  skip: {
    type: String,
    required: false
  }
})
</script>
