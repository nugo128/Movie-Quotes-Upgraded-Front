<template>
  <div class="fixed w-full h-screen flex justify-center items-center z-[60]">
    <registration />
  </div>
  <div class="bg-black flex flex-col gap-64 pb-[180px]">
    <div class="flex justify-between px-8 py-4">
      <h3 class="text-[#DDCCAA]">{{ $t('header.movie_quotes') }}</h3>
      <div class="flex gap-6">
        <language-select></language-select>
        <button class="bg-[#E31221] text-white px-7 py-1 rounded">
          {{ $t('header.sign_up') }}
        </button>
        <button class="text-white px-7 py-1 border-[1px]">{{ $t('header.log_in') }}</button>
      </div>
    </div>

    <div class="flex flex-col items-center">
      <h2
        :class="`text-[#DDCCAA] text-[60px] ${
          this.$i18n.locale === 'en' ? 'w-[800px]' : 'w-[1200px]'
        } text-center font-light`"
      >
        {{ $t('main_text.find_any_quote') }}
      </h2>
      <button class="bg-[#E31221] text-white p-3 rounded mt-5">
        {{ $t('main_text.get_started') }}
      </button>
    </div>
  </div>
  <landing-quote
    image="bg-[url('@/assets/images/interstelar.png')]"
    :quote="$t('interstellar_quote')"
    :movie="$t('interstellar')"
    :scroll="scroll"
    width="w-[760px]"
  >
  </landing-quote>
  <landing-quote
    image="bg-[url('@/assets/images/tenabaums.png')]"
    :quote="$t('royal_tenebaums_quote')"
    :movie="$t('royal_tenebaums')"
    :scroll="scroll"
    width="w-[850px]"
  >
  </landing-quote>
  <landing-quote
    image="bg-[url('@/assets/images/LOTR.png')]"
    :quote="$t('royal_tenebaums_quote')"
    :movie="$t('royal_tenebaums')"
    :scroll="scroll"
    width="w-[850px]"
  >
  </landing-quote>
  <div class="bg-black p-2">
    <h2 class="ml-20 text-[#DDCCAA]">© 2022 movie quotes. All rights reserved.</h2>
  </div>
</template>

<script setup>
import Registration from '../Components/Registration.vue'
import LanguageSelect from '../Components/LanguageSelect.vue'
import LandingQuote from '../Components/LandingQuote.vue'
import { ref } from 'vue'
let scroll = ref(false)

window.addEventListener('scroll', () => {
  if (window.innerHeight * 0.78 <= window.scrollY) {
    scroll.value = true
  } else {
    scroll.value = false
  }
})
</script>
