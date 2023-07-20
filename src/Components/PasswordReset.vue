<template>
  <Form @submit="submit" v-slot="{ meta }" class="flex flex-col gap-5 px-20 rounded z-[100]">
    <div class="flex flex-col justify-center items-center gap-3">
      <h2 class="text-white md:text-3xl text-2xl">{{ header }}</h2>
      <p class="text-text-gray max-w-[25rem] text-center md:text-sm text-xs">
        {{ secondaryText }}
      </p>
    </div>
    <slot></slot>
    <p v-if="errors && meta.valid" class="text-red-500 text-sm -mt-4">{{ errors }}</p>
    <button
      class="bg-light-red md:py-2 py-1 md:mt-3 mt-1 mb-1 rounded-sm"
      :class="{ ['pointer-events-none']: !meta.valid }"
    >
      <p class="text-white">{{ buttonText }}</p>
    </button>

    <div class="flex justify-center mt-5 gap-2 cursor-pointer" @click="toggleLogin">
      <img src="@/assets/images/back.svg" alt="" />
      <p class="text-text-gray">{{ $t('send_email.back') }}</p>
    </div>
  </Form>
</template>

<script setup>
import { Form } from 'vee-validate'
import { defineEmits, defineProps, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { resetPassword, newPassword } from '../services/index'
import { useLocaleStore } from '../stores/localeStore'
const localeStore = useLocaleStore()
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
const errors = ref('')
const emits = defineEmits(['showLogin', 'showEmail', 'showSuccess'])
const toggleLogin = () => {
  emits('showLogin', true)
}
const submit = async (value) => {
  if (value.email) {
    try {
      await resetPassword(value)
      emits('showEmail', true)
    } catch (error) {
      errors.value = JSON.parse(error.request.response).errors.email[0][[localeStore.lang]]
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
