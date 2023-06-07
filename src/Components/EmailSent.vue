<template>
  <div
    class="w-[560px] p-16 bg-[#222030] z-[100] flex flex-col items-center justify-center text-white gap-10"
  >
    <img src="@/assets/images/email-sent.png" alt="" class="w-14" />
    <h2 class="text-3xl">{{ sent }}</h2>
    <p class="text-center text-sm font-light">
      {{ check }}
    </p>
    <a
      href="https://mail.google.com/mail"
      target="_blank"
      class="bg-[#E31221] w-full text-center py-2"
      >{{ visitEmail }}</a
    >
  </div>
</template>
<script setup>
import { defineProps } from 'vue'
const props = defineProps({
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
