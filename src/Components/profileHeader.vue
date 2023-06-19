<template>
  <header class="px-16 pt-8 pb-4 bg-[#24222F] flex justify-between fixed right-0 w-full z-[999]">
    <h2 class="text-[#DDCCAA]">MOVIE QUOTES</h2>

    <div class="flex gap-10 items-center">
      <div class="relative cursor-pointer">
        <img src="../assets/images/bell.svg" alt="bell" />
        <span
          class="absolute left-4 bottom-4 bg-[#E33812] w-7 h-7 text-center rounded-full text-white text-lg"
          >3</span
        >
      </div>
      <language-select></language-select>
      <button
        class="text-white text-sm border border-white py-2 px-3 rounded-md"
        @click="logoutHandler"
      >
        {{ $t('newsfeed.logout') }}
      </button>
    </div>
  </header>
</template>

<script setup>
import LanguageSelect from './LanguageSelect.vue'
import { useRouter } from 'vue-router'
import { userLogOut } from '../services/loginRequest'
const router = useRouter()
const logoutHandler = async () => {
  try {
    await userLogOut()
    router.replace({ name: 'home' })
  } catch (error) {
    console.error(error)
  }
}
</script>
