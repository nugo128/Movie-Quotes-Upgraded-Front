<template>
  <label class="w-full text-lg text-white font-normal" :for="name"
    >{{ label }} <span class="text-red-500">{{ require }}</span></label
  >
  <Field
    :name="name"
    :type="type"
    class="w-[400px] h-10 bg-[#CED4DA] p-4 rounded-md"
    :placeholder="placeholder"
    :rules="rule"
  />
  <ErrorMessage class="text-red-400 text-sm px-5 w-[400px]" :name="name" />
</template>

<script setup>
import { Field, Form, ErrorMessage } from 'vee-validate'
const props = defineProps({
  name: { type: String, required: true },
  type: { type: String, required: true },
  label: { type: String, required: true },
  placeholder: { type: String, required: true },
  rule: { type: String, required: true },
  require: { type: String, required: false }
})
</script>
