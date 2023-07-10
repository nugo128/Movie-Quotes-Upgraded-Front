<template>
  <div>
    <div
      class="border border-[#6C757D] rounded-sm flex items-center px-4 gap-2"
      @click="activeLabelHandler"
    >
      <Field
        v-slot="{ field, errors, value }"
        :name="name"
        :rules="!placeholderValue ? 'required' : ''"
        :validate-on-input="true"
        class="border border-[#6C757D] rounded-sm"
      >
        <label
          :class="active ? 'text-white' : 'text-[#6C757D]'"
          class="text-lg whitespace-nowrap"
          :for="name"
          >{{ label }}:</label
        >
        <div class="flex w-full items-center relative">
          <input
            :id="name"
            v-bind="field"
            class="w-full h-12 bg-transparent border-none rounded-md outline-none md:pr-12 pr-6"
            :class="{
              'border-2 border-red-500': !!errors?.length,
              'border-2 border-green-500': !errors?.length && value?.length > 0
            }"
            type="text"
            :placeholder="placeholderValue"
            @input="inputValue"
          />
          <img
            v-if="!errors?.length && value?.length > 0"
            src="../assets/images/validated.svg"
            alt="validation passed"
            class="w-6 absolute md:right-3 right-0"
          />
          <img
            v-if="!!errors?.length"
            src="../assets/images/invalid.svg"
            alt="validation failed"
            class="w-6 absolute md:right-3 right-0"
          />
        </div>
      </Field>
      <h3 class="text-[#6C757D] w-8">{{ lang ? lang : '' }}</h3>
    </div>
    <ErrorMessage class="text-red-400 text-sm px-5 w-[400px]" :name="name" />
  </div>
</template>
<script setup>
import { Field, ErrorMessage } from 'vee-validate'
import { defineEmits, ref } from 'vue'
const emits = defineEmits(['inputValue'])
const active = ref(true)
const activeLabelHandler = () => {
  active.value = false
}
const inputValue = (event) => {
  emits('inputValue', event.target.value)
}
defineProps({
  name: { type: String, required: true },
  label: { type: String, required: true },
  lang: { type: String, required: false },
  placeholderValue: { type: String, required: false }
})
</script>
