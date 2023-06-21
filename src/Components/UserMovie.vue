<template>
  <div>
    <img :src="poster" alt="" class="w-440 h-370 rounded-xl" />
    <h2 class="text-white text-3xl break-words w-440">
      {{ title }} (<span>{{ year }}</span
      >)
    </h2>
    <div class="flex gap-3">
      <h2 class="text-white text-2xl">{{ quotes }}</h2>
      <img src="../assets/images/quoteIcon.svg" alt="" class="w-8 h-7" />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useUsersStore } from '../stores/user'
const store = useUsersStore()
const props = defineProps({
  title: {
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
  quotes: {
    type: Number,
    required: true
  }
})
const poster = ref(store.getUrl(props.thumbnail))
</script>
