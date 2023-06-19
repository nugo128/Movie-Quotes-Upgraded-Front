<template>
  <div class="fixed w-full h-screen flex justify-center z-[60]">
    <div
      class="relative w-[900px] mt-24 bg-[#11101A] h-max z-[999] flex flex-col justify-center text-white gap-6"
    >
      <img
        class="absolute right-2 top-8 cursor-pointer"
        src="../assets/images/close.svg"
        @click="clickHandler"
      />
      <slot></slot>
    </div>
    <div class="bg-black bg-opacity-20 absolute w-full h-full" @click="clickHandler"></div>
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
