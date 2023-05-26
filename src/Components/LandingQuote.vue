<template>
  <div class="relative fit h-screen">
    <div :class="handleScroll" class="h-[100vh] pt-[50%] pl-[10%] lg:pt-[200px] lg:pl-44">
      <div>
        <h2>{{ quote }}</h2>
        <h3>{{ scroll }}</h3>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
  scroll: { type: Boolean, required: true },
  image: { type: String, required: true },
  quote: { type: String, required: true },
  movie: { type: String, required: true }
})
const handleScroll = computed(() => {
  if (props.scroll) {
    return `paralax ${props.image}`
  }
  return props.image
})
</script>

<style>
.fit {
  background-size: 100% 100%;
}
.paralax {
  background-attachment: fixed;
}
</style>
