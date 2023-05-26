<template>
  <div class="bg-black flex flex-col gap-64 pb-[180px]">
    <div class="flex justify-between px-8 py-4">
      <h3 class="text-[#DDCCAA]">MOVIE QUOTES</h3>
      <div class="flex gap-6">
        <select name="" id="" class="bg-black text-white">
          <option value="en">Eng</option>
          <option value="ka">Geo</option>
        </select>
        <button class="bg-[#E31221] text-white px-7 py-1 rounded">sign up</button>
        <button class="text-white px-7 py-1 border-[1px]">log in</button>
      </div>
    </div>

    <div class="flex flex-col items-center">
      <h2 class="text-[#DDCCAA] text-[60px]">Find any quote in</h2>
      <h2 class="text-[#DDCCAA] text-[60px]">millions of movie lines</h2>
      <button class="bg-[#E31221] text-white p-3 rounded mt-5">Get started</button>
    </div>
  </div>
  <landing-quote
    image="bg-[url('@/assets/images/interstelar.png')]"
    quote="“You have to leave somethig 
behind to go forward”"
    movie="Interstellar,2014"
    :scroll="scroll"
    width="w-[760px]"
  >
  </landing-quote>
  <landing-quote
    image="bg-[url('@/assets/images/tenabaums.png')]"
    quote="I think we’re just gonna have
  to be secretly in love with earch other
  and leave it that"
    movie="The Royal Tenenbaums,2001 "
    :scroll="scroll"
    width="w-[850px]"
  >
  </landing-quote>
  <landing-quote
    image="bg-[url('@/assets/images/LOTR.png')]"
    quote="I think we’re just gonna have
  to be secretly in love with earch other
  and leave it that"
    movie="The Royal Tenenbaums,2001 "
    :scroll="scroll"
    width="w-[850px]"
  >
  </landing-quote>
  <div class="bg-black p-2">
    <h2 class="ml-20 text-[#DDCCAA]">© 2022 movie quotes. All rights reserved.</h2>
  </div>
</template>

<script setup>
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
