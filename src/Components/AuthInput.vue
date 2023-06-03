<template>
  <label class="w-full text-lg text-white font-normal" :for="name"
    >{{ label }} <span class="text-red-500">{{ require }}</span></label
  >
  <Field v-slot="{ field, errors, value }" :name="name" :rules="rule" :validate-on-input="true">
    <div class="flex items-center relative">
      <input
        :id="name"
        v-bind="field"
        class="w-[400px] h-10 bg-[#CED4DA] p-4 rounded-md outline-none"
        :class="{
          'border-2 border-red-500': !!errors?.length,
          'border-2 border-green-500': !errors?.length && value?.length > 0
        }"
        :type="type"
        :placeholder="placeholder"
      />
      <img
        v-if="!errors?.length && value?.length > 0"
        src="../assets/images/validated.svg"
        alt="validation passed"
        class="w-6 absolute right-3"
      />
      <img
        v-if="!!errors?.length"
        src="../assets/images/invalid.svg"
        alt="validation failed"
        class="w-6 absolute right-3"
      />
    </div>
  </Field>
  <ErrorMessage class="text-red-400 text-sm px-5 w-[400px]" :name="name" />
</template>

<script setup>
import { Field, ErrorMessage } from 'vee-validate'
const props = defineProps({
  name: { type: String, required: true },
  type: { type: String, required: true },
  label: { type: String, required: true },
  placeholder: { type: String, required: true },
  rule: { type: String, required: true },
  require: { type: String, required: false }
})
</script>
