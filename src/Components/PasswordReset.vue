<template>
  <Form @submit="submit" v-slot="{ meta }" class="flex flex-col gap-3 px-20 rounded z-[100]">
    <div class="flex flex-col justify-center items-center">
      <h2 class="text-white text-3xl">{{ $t('send_email.forgot_password') }}</h2>
      <p class="text-[#6C757D] max-w-[400px] text-center">
        {{ $t('send_email.forgot_password_description') }}
      </p>
    </div>
    <AuthInput
      name="email"
      type="email"
      :label="$t('send_email.email_label')"
      :placeholder="$t('send_email.email_placeholder')"
      rule="required|email"
    />

    <button class="bg-[#E31221] py-2 mt-3 mb-1" :class="{ ['pointer-events-none']: !meta.valid }">
      <p class="text-white">{{ $t('send_email.send') }}</p>
    </button>

    <div class="flex justify-center mt-5 gap-2 cursor-pointer" @click="toggleLogin">
      <img src="@/assets/images/back.svg" alt="" />
      <p class="text-[#6C757D]">{{ $t('send_email.back') }}</p>
    </div>
  </Form>
</template>

<script setup>
import { Form } from 'vee-validate'
import AuthInput from './AuthInput.vue'
import { defineEmits } from 'vue'
const emits = defineEmits(['showLogin'])
const toggleLogin = () => {
  emits('showLogin', true)
}
const submit = async (value, actions) => {
  console.log(value)
}
</script>
