<template>
  <Field v-slot="{ field, errors, value }" :name="name" :rules="rule" :validate-on-input="true">
    <textarea
      v-bind="field"
      :name="name"
      class="mb-3 h-14 w-full bg-transparent border border-[#6C757D] p-2 rounded"
      :placeholder="placeholder"
    />
    <span class="absolute right-12 mt-2">{{ language }}</span>
  </Field>
</template>
<script setup>
import { Field } from 'vee-validate'
import { defineProps } from 'vue'
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  }
})
</script>
