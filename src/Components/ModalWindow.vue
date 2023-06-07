<template>
  <div class="fixed w-full h-screen flex justify-center items-center z-[60]">
    <slot></slot>
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
