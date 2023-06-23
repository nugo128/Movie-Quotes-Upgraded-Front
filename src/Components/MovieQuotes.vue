<template>
  <div class="bg-[#11101A] w-[800px] px-8 py-6 flex flex-col gap-6 rounded-md">
    <div class="flex justify-between relative">
      <img src="../assets/images/tenabaums.png" class="w-56 h-36 rounded-sm mr-8" alt="" />
      <h2 class="my-auto text-lg text-[#CED4DA]">
        "Frankly, aaaaaaaaaaaamy sad asd sad dsa sadsa d dsdasdasdasdasear, I don'tgive a damn."
      </h2>
      <span class="text-white text-lg" @click="toggleQuote">...</span>
      <div
        v-if="viewQuote"
        class="absolute bg-[#24222F] left-[44.5rem] top-8 px-10 py-8 rounded-lg flex flex-col gap-8 text-white w-64"
      >
        <div class="flex items-center gap-4">
          <img src="../assets/images/view.svg" class="w-5" alt="" />
          <p>View Quote</p>
        </div>
        <div class="flex items-center gap-4">
          <img src="../assets/images/edit.svg" class="w-5" alt="" />
          <p>edit</p>
        </div>
        <div class="flex items-center gap-4">
          <img src="../assets/images/delete.svg" class="w-5" alt="" />
          <p>delete</p>
        </div>
      </div>
    </div>
    <div class="w-full h-[1px] bg-[#EFEFEF33]"></div>
    <div class="flex gap-5">
      <div class="flex gap-3 items-center text-white">
        <span>3 </span>
        <img src="../assets/images/comment.svg" alt="" />
      </div>
      <div class="flex gap-3 items-center text-white">
        <span>10</span>
        <like-button color="red"></like-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import LikeButton from './LikeButton.vue'
import { ref } from 'vue'
const viewQuote = ref(false)
const toggleQuote = () => {
  viewQuote.value = !viewQuote.value
}
</script>
