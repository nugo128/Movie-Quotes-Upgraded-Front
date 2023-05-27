<template>
  <Form @submit.prevent="" class="flex flex-col gap-2 bg-[#222030] px-20 py-16 rounded z-[100]">
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
    />
    <AuthInput
      name="email"
      type="email"
      :label="$t('form.email_label')"
      require="*"
      :placeholder="$t('form.email_placeholder')"
    />
    <AuthInput
      name="password"
      type="text"
      :label="$t('form.password_label')"
      require="*"
      :placeholder="$t('form.password_placeholder')"
    />
    <AuthInput
      name="confirm-password"
      type="text"
      :label="$t('form.confirm_password_label')"
      require="*"
      :placeholder="$t('form.confirm_password_placeholder')"
    />
    <button class="bg-[#E31221] py-2 mt-3 mb-1">
      <p class="text-white">{{ $t('get_started') }}</p>
    </button>
    <button class="border-[1px] rounded flex items-center justify-center">
      <img src="@/assets/images/google-icon.png" alt="google icon" class="w-10 p-2" />
      <p class="text-white">{{ $t('sign_up_google') }}</p>
    </button>

    <div class="flex justify-center mt-5">
      <h2 class="text-[#6C757D]">
        {{ $t('have_account') }}
        <span class="underline text-[#0D6EFD] cursor-pointer">{{ $t('log_in') }}</span>
      </h2>
    </div>
  </Form>
</template>

<script setup>
import { Field, Form, ErrorMessage } from 'vee-validate'
import AuthInput from './AuthInput.vue'
</script>
