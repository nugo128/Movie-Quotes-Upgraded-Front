<template>
  <Field v-slot="{ field }" :name="name" :rules="rule" :validate-on-input="true">
    <textarea
      v-bind="field"
      :name="name"
      class="md:h-14 h-20 w-full bg-transparent border border-[#6C757D] p-2 rounded"
      :placeholder="placeholder"
    />
    <span class="absolute right-12 mt-2">{{ language }}</span>
  </Field>
  <div class="mb-3">
    <ErrorMessage class="text-red-400 text-sm pl-5 md:w-[400px]" :name="name" />
  </div>
</template>
<script setup>
import { Field, ErrorMessage } from 'vee-validate'
import { defineProps } from 'vue'
defineProps({
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
  },
  rule: {
    type: String,
    required: true
  }
})
</script>
