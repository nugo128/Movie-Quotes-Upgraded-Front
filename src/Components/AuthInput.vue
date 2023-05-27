<template>
  <label class="w-full font-bold text-lg text-white" :for="name"
    >{{ label }} <span class="text-red-500">{{ require }}</span></label
  >
  <Field
    :name="name"
    :type="type"
    class="w-[360px] h-10 bg-[#CED4DA] p-4 rounded-md"
    :placeholder="placeholder"
  />
  <ErrorMessage class="text-red-400 text-sm px-5" :name="name" />
</template>

<script setup>
import { Field, Form, ErrorMessage } from 'vee-validate'
const props = defineProps({
  name: { type: String, required: true },
  type: { type: String, required: true },
  label: { type: String, required: true },
  placeholder: { type: String, required: true },
  require: { type: String, required: false }
})
</script>
