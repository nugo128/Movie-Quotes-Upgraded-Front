<template>
  <Form
    @submit="submit"
    v-slot="{ meta }"
    class="flex flex-col gap-2 bg-[#222030] px-20 py-16 rounded z-[100]"
  >
    <div class="flex flex-col justify-center items-center">
      <h2 class="text-white text-3xl">{{ $t('login') }}</h2>
      <p class="text-[#6C757D] max-w-[400px] text-center">{{ $t('welcome_back') }}</p>
    </div>
    <AuthInput
      name="username"
      type="text"
      :label="$t('loginform.username_label')"
      require="*"
      :placeholder="$t('loginform.name_placeholder')"
      rule="required|min:3"
    />
    <AuthInput
      name="password"
      type="password"
      :label="$t('loginform.password_label')"
      require="*"
      :placeholder="$t('loginform.login_password_placeholder')"
      rule="required"
    />
    <div class="flex justify-between mt-2">
      <div class="flex gap-2">
        <Field name="remember_me" type="checkbox" value="true"></Field>
        <label for="remember_me" class="text-white">{{ $t('loginform.remember_me') }}</label>
      </div>
      <h3 class="underline text-[#0D6EFD] cursor-pointer">{{ $t('forgot_password') }}</h3>
    </div>
    <button class="bg-[#E31221] py-2 mt-3 mb-1" :class="{ ['pointer-events-none']: !meta.valid }">
      <p class="text-white">{{ $t('sign_in') }}</p>
    </button>
    <button class="border-[1px] rounded flex items-center justify-center" type="button">
      <img src="@/assets/images/google-icon.png" alt="google icon" class="w-10 p-2" />
      <p class="text-white">{{ $t('sign_in_google') }}</p>
    </button>

    <div class="flex justify-center mt-5">
      <h2 class="text-[#6C757D]">
        {{ $t('dont_have_account') }}
        <span class="underline text-[#0D6EFD] cursor-pointer" @click="toggleRegistration">{{
          $t('sign_up')
        }}</span>
      </h2>
    </div>
  </Form>
</template>

<script setup>
import { Form, Field } from 'vee-validate'
import AuthInput from './AuthInput.vue'
import { defineEmits } from 'vue'
const emits = defineEmits(['showRegistration'])
const toggleRegistration = () => {
  emits('showRegistration', true)
}
const submit = async (value, actions) => {
  console.log(value, actions)
}
</script>
