<template>
  <div class="relative full h-screen">
    <div
      class="absolute top-0 left-0 h-[1000px] w-full z-40 bg-gradient-to-b from-black via-transparent"
    ></div>
    <div
      class="absolute top-0 left-0 h-full w-[1000px] z-40 bg-gradient-to-r from-black via-transparent"
    ></div>
    <div :class="handleScroll" class="h-[100vh] pt-[50%] pl-[10%] lg:pt-[200px] lg:pl-44 full">
      <div class="flex text-white mt-20">
        <p class="mt-5 mr-2 z-50">____</p>
        <div class="flex flex-col gap-5 text-white z-50">
          <h2 class="text-[50px]" :class="width">{{ quote }}</h2>
          <h3 class="text-3xl">{{ movie }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
  scroll: { type: Boolean, required: true },
  movie: { type: String, required: true },
  image: { type: String, required: true },
  quote: { type: String, required: true },
  width: { type: String, required: true }
})
const handleScroll = computed(() => {
  if (props.scroll) {
    return `paralax ${props.image}`
  }
  return props.image
})
</script>

<style>
.full {
  background-size: 100% 100%;
}
.paralax {
  background-position: center center;
  background-attachment: fixed;
}
</style>
