<template>
  <div class="flex flex-col gap-5 justify-center items-center h-screen">
    <img src="../assets/images/permission.svg" class="w-48" alt="" />
    <h2 class="text-white md:text-3xl text-2xl my-2">{{ $t('error.not_pass') }}</h2>
    <p class="text-white md:text-xl text-md text-center">{{ $t('error.no_permission') }}</p>
    <router-link
      :to="url"
      class="text-white py-2 px-3 bg-[#E31221] rounded-md my-10 text-sm lg:text-base"
    >
      {{ $t('error.return') }}
    </router-link>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useUsersStore } from '../stores/user'
const store = useUsersStore()
const url = computed(() => {
  if (store.authUser.length) return { name: 'news_feed' }
  return { name: 'home' }
})
</script>
