<template>
  <div class="relative full h-screen">
    <div
      class="absolute top-0 left-0 md:h-[1000px] h-full w-full z-40 bg-gradient-to-b from-black via-transparent"
    ></div>
    <div
      class="absolute top-0 left-0 h-full md:w-[1000px] z-40 bg-gradient-to-r from-black via-transparent"
    ></div>
    <div
      :class="handleScroll"
      class="h-screen md:pt-[50%] pt-40 md:pl-[10%] pl-5 lg:pt-[200px] lg:pl-44 full"
    >
      <div class="flex text-white mt-20">
        <p class="mr-10 text-white text-3xl z-50 hidden md:inline-block">____</p>
        <div class="bg-white w-4 h-[2px] md:hidden mt-2 mr-2"></div>
        <div class="flex flex-col gap-5 text-white z-50">
          <h2 class="md:text-[3.125rem] text-sm leading-tight" :class="width">{{ quote }}</h2>
          <h3 class="md:text-3xl text-xs">{{ movie }}</h3>
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
