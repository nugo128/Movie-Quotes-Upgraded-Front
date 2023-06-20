<template>
  <Form @submit="submit" v-slot="{ meta }" class="flex flex-col gap-3 px-20 rounded z-[100]">
    <div class="flex flex-col justify-center items-center">
      <h2 class="text-white text-3xl">{{ header }}</h2>
      <p class="text-[#6C757D] max-w-[400px] text-center">
        {{ secondaryText }}
      </p>
    </div>
    <slot></slot>
    <button class="bg-[#E31221] py-2 mt-3 mb-1" :class="{ ['pointer-events-none']: !meta.valid }">
      <p class="text-white">{{ buttonText }}</p>
    </button>

    <div class="flex justify-center mt-5 gap-2 cursor-pointer" @click="toggleLogin">
      <img src="@/assets/images/back.svg" alt="" />
      <p class="text-[#6C757D]">{{ $t('send_email.back') }}</p>
    </div>
  </Form>
</template>

<script setup>
import { Form } from 'vee-validate'
import { defineEmits, defineProps } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { resetPassword, newPassword } from '../services/passwordRequest'
const route = useRoute()
const router = useRouter()
defineProps({
  header: {
    type: String,
    required: true
  },
  secondaryText: {
    type: String,
    required: true
  },
  buttonText: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['showLogin', 'showEmail', 'showSuccess'])
const toggleLogin = () => {
  emits('showLogin', true)
}
const submit = async (value) => {
  console.log(value)
  if (value.email) {
    try {
      await resetPassword(value)
      emits('showEmail', true)
    } catch (error) {
      console.error(error)
    }
  }
  if (value.password) {
    value['password_confirmation'] = value.confirmation
    value['token'] = route.query.token
    try {
      await newPassword(value)
      router.push({ name: 'home' })
      emits('showSuccess', true)
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
