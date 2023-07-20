<template>
  <Form @submit="submit" v-slot="{ meta }" class="flex flex-col gap-3 px-20 rounded z-[100]">
    <div class="flex flex-col justify-center items-center md:gap-4 gap-2">
      <h2 class="text-white text-base md:text-3xl">{{ $t('login') }}</h2>
      <p class="text-text-gray text-xs md:text-base [400px] text-center">
        {{ $t('welcome_back') }}
      </p>
    </div>
    <AuthInput
      name="username"
      type="text"
      :label="$t('loginform.username_label')"
      :placeholder="$t('loginform.name_placeholder')"
      rule="required|min:3"
    />
    <AuthInput
      name="password"
      type="password"
      :label="$t('loginform.password_label')"
      :placeholder="$t('loginform.login_password_placeholder')"
      rule="required"
    />
    <h2 class="text-red-500 text-sm">{{ errors }}</h2>
    <div class="flex justify-between mt-2">
      <div class="flex gap-2">
        <Field name="remember_me" type="checkbox" value="true"></Field>
        <label for="remember_me" class="text-white text-[0.6rem] md:text-base">{{
          $t('loginform.remember_me')
        }}</label>
      </div>
      <h3
        class="underline text-[#0D6EFD] cursor-pointer text-[0.6rem] md:text-base"
        @click="toggleReset"
      >
        {{ $t('forgot_password') }}
      </h3>
    </div>
    <button
      class="bg-light-red py-2 md:mt-3 mt-1 mb-1 rounded-sm"
      :class="{ ['pointer-events-none']: !meta.valid }"
    >
      <p class="text-white md:text-base text-xs">{{ $t('sign_in') }}</p>
    </button>
    <button
      class="border-[1px] rounded-sm flex items-center justify-center py-2"
      type="button"
      @click="googleAuth"
    >
      <img src="@/assets/images/google-icon.png" alt="google icon" class="md:w-10 w-8 px-2" />
      <p class="text-white md:text-sm text-xs">{{ $t('sign_in_google') }}</p>
    </button>

    <div class="flex justify-center md:mt-5 mt-2">
      <h2 class="text-text-gray md:text-sm text-xs">
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
import { useRouter } from 'vue-router'
import { defineEmits, ref } from 'vue'
import { userLogin, googleLogin } from '@/services/index'
import { useLocaleStore } from '@/stores/localeStore'
const errors = ref('')
const localeStore = useLocaleStore()
const router = useRouter()
const emits = defineEmits(['showRegistration', 'showReset'])
const toggleRegistration = () => {
  emits('showRegistration', true)
}
const toggleReset = () => {
  emits('showReset', true)
}
const googleAuth = async () => {
  try {
    const response = await googleLogin()
    window.location.href = response.data.message
  } catch (error) {
    console.error(error)
  }
}
const submit = async (value) => {
  try {
    await userLogin(value)
    router.replace({ path: '/newsfeed' })
  } catch (error) {
    console.error(JSON.parse(error.request.response).message[localeStore.lang])
    errors.value = JSON.parse(error.request.response).message[localeStore.lang]
  }
}
</script>
