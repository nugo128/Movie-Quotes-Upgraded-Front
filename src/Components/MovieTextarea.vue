<template>
  <Field
    v-slot="{ field }"
    :name="name"
    :rules="placeholderValue ? rule : 'required|' + rule"
    :validate-on-input="true"
  >
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
          class="h-20 w-full bg-transparent border border-gray-500 rounded md:pt-[0.1rem] pr-16 py-auto md:indent-28 indent-0 pt-8 pl-4"
          :class="lang === 'Eng' ? '' : 'md:indent-36'"
          :placeholder="placeholderValue"
          @scroll="handleTextAreaScroll"
        ></textarea>
        <span class="absolute right-4 top-2 text-[#6C757D]">{{ lang }}</span>
      </div>
    </div>
  </Field>
  <ErrorMessage class="text-red-400 text-sm px-5 md:w-[400px]" :name="name" />
</template>

<script setup>
import { Field, ErrorMessage } from 'vee-validate'
import { ref } from 'vue'
defineProps({
  lang: {
    type: String,
    required: true
  },
  placeholderValue: { type: String, required: false },
  name: { type: String, required: false },
  rule: { type: String, required: false }
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
