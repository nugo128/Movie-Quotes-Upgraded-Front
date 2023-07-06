<template>
  <div class="fixed w-full h-screen flex justify-center items-center z-[60]">
    <div
      class="md:w-[35rem] w-full relative md:p-16 py-10 bg-[#222030] z-[100] flex flex-col items-center justify-center text-white gap-10"
    >
      <img
        src="../assets/images/close.svg"
        alt=""
        class="md:hidden absolute top-2 right-2 cursor-pointer"
        @click="clickHandler"
      />
      <slot></slot>
    </div>
    <div class="bg-black bg-opacity-60 absolute w-full h-full" @click="clickHandler"></div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  click: {
    type: Function,
    required: true
  }
})

const clickHandler = () => {
  props.click()
}
</script>
