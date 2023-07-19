<template>
  <Field v-slot="{ field }" :name="name" :rules="rule" :validate-on-input="true">
    <textarea
      v-bind="field"
      :name="name"
      class="h-20 w-full bg-transparent border border-[#6C757D] p-2 rounded md:text-xl md:my-2"
      :placeholder="placeholder"
      :value="inputData"
      @input="inputHandler"
    />
    <span class="absolute right-12 mt-2 text-lg">{{ language }}</span>
  </Field>
  <div class="mb-3">
    <ErrorMessage class="text-red-400 text-sm pl-5 md:w-[400px]" :name="name" />
  </div>
</template>
<script setup>
import { Field, ErrorMessage } from 'vee-validate'
import { defineProps, ref } from 'vue'
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
  },
  rule: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: false
  }
})
const inputData = ref(props.value)
const inputHandler = (e) => {
  inputData.value = e.target.value
}
</script>
