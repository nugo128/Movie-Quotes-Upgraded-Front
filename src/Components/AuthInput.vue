<template>
  <div>
    <label class="w-full md:text-lg text-xs text-white font-normal" :for="name"
      >{{ label }} <span class="text-red-500">{{ require }}</span></label
    >
    <Field v-slot="{ field, errors, value }" :name="name" :rules="rule" :validate-on-input="true">
      <div class="flex items-center relative">
        <input
          :id="name"
          v-bind="field"
          class="md:w-[25rem] md:h-10 h-10 bg-[#CED4DA] md:p-4 p-1 md:pr-16 md:rounded-sm outline-none w-[19rem] pr-12 pl-2 text-[0.6rem] md:text-[0.8rem] text-black rounded-md"
          :class="{
            'border-2 border-red-500': !!errors?.length,
            'border-2 border-green-500': !errors?.length && value?.length > 0,
            'md:w-[37.5rem]': width?.length > 0
          }"
          :type="type !== 'password' ? type : inputType"
          :placeholder="placeholder"
          @input="inputValue"
        />
        <img
          v-if="!errors?.length && value?.length > 0"
          src="../assets/images/validated.svg"
          alt="validation passed"
          class="md:w-6 w-4 absolute right-3"
        />
        <img
          v-if="!!errors?.length"
          src="../assets/images/invalid.svg"
          alt="validation failed"
          class="md:w-6 w-4 absolute right-3"
        />
        <img
          v-if="type === 'password'"
          src="../assets/images/eye.svg"
          alt="show-hide icon"
          class="md:w-6 w-3 absolute cursor-pointer"
          :class="
            !!errors?.length || (!errors?.length && value?.length > 0) ? 'right-9' : 'right-3'
          "
          @click="showPasswordHandler"
        />
      </div>
    </Field>
    <ErrorMessage class="text-red-400 md:text-sm text-[0.6rem] :px-5 md:w-[25rem]" :name="name" />
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from 'vee-validate'
import { ref, defineEmits } from 'vue'
const emits = defineEmits(['inputValue'])
const inputValue = (event) => {
  emits('inputValue', event.target.value)
}
const props = defineProps({
  name: { type: String, required: true },
  type: { type: String, required: true },
  label: { type: String, required: true },
  placeholder: { type: String, required: true },
  rule: { type: String, required: true },
  require: { type: String, required: false },
  width: { type: String, required: false }
})
const inputType = ref(props.type)
const showPasswordHandler = () => {
  inputType.value === 'password' ? (inputType.value = 'text') : (inputType.value = 'password')
  console.log(inputType.value)
}
</script>
