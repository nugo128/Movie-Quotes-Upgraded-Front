<template>
  <Form
    @submit="submit"
    v-slot="{ meta }"
    class="flex flex-col gap-2 bg-[#222030] px-20 py-16 rounded z-[100]"
  >
    <div class="flex flex-col justify-center items-center">
      <h2 class="text-white text-3xl">{{ $t('create_account') }}</h2>
      <p class="text-[#6C757D]">{{ $t('start_journey') }}</p>
    </div>
    <AuthInput
      name="name"
      type="text"
      :label="$t('form.name_label')"
      require="*"
      :placeholder="$t('form.name_placeholder')"
      rule="required|min:3|max:15|lowercase_num"
    />
    <AuthInput
      name="email"
      type="email"
      :label="$t('form.email_label')"
      require="*"
      :placeholder="$t('form.email_placeholder')"
      rule="required|email"
    />
    <AuthInput
      name="password"
      type="password"
      :label="$t('form.password_label')"
      require="*"
      :placeholder="$t('form.password_placeholder')"
      rule="required|min:8|max:15|lowercase_num"
    />
    <AuthInput
      name="confirmation"
      type="password"
      :label="$t('form.confirm_password_label')"
      require="*"
      :placeholder="$t('form.confirm_password_placeholder')"
      rule="required|confirmed:@password"
    />
    <button class="bg-[#E31221] py-2 mt-3 mb-1" :class="{ ['pointer-events-none']: !meta.valid }">
      <p class="text-white">{{ $t('get_started') }}</p>
    </button>
    <button class="border-[1px] rounded flex items-center justify-center" type="button">
      <img src="@/assets/images/google-icon.png" alt="google icon" class="w-10 p-2" />
      <p class="text-white">{{ $t('sign_up_google') }}</p>
    </button>

    <div class="flex justify-center mt-5">
      <h2 class="text-[#6C757D]">
        {{ $t('have_account') }}
        <span class="underline text-[#0D6EFD] cursor-pointer" @click="toggleLogin">{{
          $t('log_in')
        }}</span>
      </h2>
    </div>
  </Form>
</template>

<script setup>
import { Form } from 'vee-validate'
import axios from '@/config/axios/index.js'
import AuthInput from './AuthInput.vue'
import { defineEmits } from 'vue'
const emits = defineEmits(['registered', 'showLogin'])
const toggleLogin = () => {
  emits('showLogin', true)
}
const submit = async (value, actions) => {
  value['password_confirmation'] = value.confirmation
  await axios.get('/sanctum/csrf-cookie')
  await axios
    .post('api/register', value)
    .then((response) => {
      emits('registered', true)
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>
