<template>
  <Field v-slot="{ field }" name="name" :validate-on-input="true">
    <div class="relative" @click="handleClicked">
      <label
        class="absolute top-1 left-4 z-0"
        :class="{ hidden: isTextAreaScrolled, 'text-white': !active, 'text-[#6C757D]': active }"
      >
        {{ lang === 'Eng' ? 'description' : 'ფილმის აღწერა' }}:
      </label>
      <div class="flex">
        <textarea
          v-bind="field"
          name=""
          class="h-20 w-full bg-transparent border border-gray-500 rounded pt-[0.1rem] pr-16"
          :class="lang === 'Eng' ? '' : 'pl-10'"
          style="text-indent: 7rem"
          :placeholder="placeholderValue"
          @scroll="handleTextAreaScroll"
        ></textarea>
        <span class="absolute right-4 top-2 text-[#6C757D]">{{ lang }}</span>
      </div>
    </div>
  </Field>
</template>

<script setup>
import { Field } from 'vee-validate'
import { ref } from 'vue'
defineProps({
  lang: {
    type: String,
    required: true
  },
  placeholderValue: { type: String, required: false }
})
const isTextAreaScrolled = ref(false)
const active = ref(false)
const handleClicked = () => {
  active.value = true
}
const handleTextAreaScroll = (event) => {
  const scrollTop = event.target.scrollTop
  if (scrollTop > 10) {
    isTextAreaScrolled.value = true
  } else {
    isTextAreaScrolled.value = false
  }
}
</script>
