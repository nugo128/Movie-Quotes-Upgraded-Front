<template>
  <Form class="flex flex-col gap-2 bg-[#222030] px-20 py-16 rounded">
    <div class="flex flex-col justify-center items-center">
      <h2 class="text-white text-3xl">Create an account</h2>
      <p class="text-[#6C757D]">Start your journey</p>
    </div>
    <AuthInput
      name="name"
      type="text"
      label="Name"
      require="*"
      placeholder="At least 3 & max.15 lower case characters"
    />
    <AuthInput name="email" type="text" label="Email *" placeholder="Enter your email" />
    <AuthInput
      name="password"
      type="text"
      label="Password"
      require="*"
      placeholder="At least 8 & max.15 lower case characters"
    />
    <AuthInput
      name="confirm-password"
      type="text"
      label="Confirm password"
      require="*"
      placeholder="Confirm password"
    />
    <button class="bg-[#E31221] py-2 mt-3 mb-1"><p class="text-white">Get Started</p></button>
    <button class="border-[1px] rounded flex items-center justify-center">
      <img src="@/assets/images/google-icon.png" alt="google icon" class="w-10 p-2" />
      <p class="text-white">Sign up with Google</p>
    </button>

    <div class="flex justify-center mt-5">
      <h2 class="text-[#6C757D]">
        Already have an account? <span class="underline text-[#0D6EFD] cursor-pointer">Log in</span>
      </h2>
    </div>
  </Form>
</template>

<script setup>
import { Field, Form, ErrorMessage } from 'vee-validate'
import AuthInput from './AuthInput.vue'
</script>
