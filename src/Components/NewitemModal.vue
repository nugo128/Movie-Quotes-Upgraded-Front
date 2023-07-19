<template>
  <div
    class="fixed w-full h-full bg-[#11101A] md:bg-transparent md:h-screen flex justify-center z-[999] overflow-y-auto pb-20"
  >
    <div
      class="relative w-900 md:mt-24 bg-[#11101A] md:h-max h-full z-[999] flex flex-col md:justify-center justify-start text-white gap-6"
    >
      <img
        class="absolute right-8 top-8 cursor-pointer"
        src="../assets/images/close.svg"
        @click="clickHandler"
      />
      <slot></slot>
    </div>
    <div class="bg-black bg-opacity-20 fixed w-full h-full" @click="clickHandler"></div>
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
