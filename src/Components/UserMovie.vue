<template>
  <div class="pb-8">
    <img :src="poster" alt="" class="md:w-440 md:h-370 w-[22.375rem] h-[18.875rem] rounded-xl" />
    <h2 class="text-white md:text-3xl text-2xl break-words md:w-440 my-2">
      {{ JSON.parse(title)[localeStore.lang] }} (<span>{{ year }}</span
      >)
    </h2>
    <div class="flex gap-3">
      <h2 class="text-white text-2xl">{{ quotes ? quotes : 0 }}</h2>
      <img src="../assets/images/quoteIcon.svg" alt="" class="w-8 h-7" />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useUsersStore } from '@/stores/userStore'
import { useLocaleStore } from '@/stores/localeStore'
const localeStore = useLocaleStore()
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
