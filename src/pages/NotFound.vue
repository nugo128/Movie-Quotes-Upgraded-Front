<template>
  <div class="flex flex-col gap-5 justify-center items-center h-screen">
    <img src="../assets/images/ghost.svg" class="w-28" alt="" />
    <svg
      width="117"
      height="14"
      viewBox="0 0 117 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="58.5" cy="7" rx="58.5" ry="7" fill="#F0F0F0" />
    </svg>
    <h2 class="text-white md:text-3xl text-2xl my-2">{{ $t('error.whoops') }}</h2>
    <p class="text-white md:text-xl text-md text-center">{{ $t('error.cant_find') }}</p>
    <router-link
      :to="url"
      class="text-white py-2 px-3 bg-light-red rounded-md my-10 text-sm lg:text-base"
    >
      {{ $t('error.return') }}
    </router-link>
  </div>
</template>
<script setup>
import { computed, onBeforeMount } from 'vue'
import { useUsersStore } from '../stores/userStore'
const store = useUsersStore()
const url = computed(() => {
  if (store.authUser.length) return { name: 'news_feed' }
  return { name: 'home' }
})
onBeforeMount(() => {
  if (!store.authUser.length) {
    store.getAuthUser
  }
})
</script>
