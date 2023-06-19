<template>
  <modal-window :click="registrationHandler" v-if="showRegistration">
    <registration-modal @registered="emailIsSent" @showLogin="toggleLogin" />
  </modal-window>
  <modal-window v-if="showEmailSent" :click="emailSentHandler">
    <email-sent
      :sent="$t('thank_you')"
      :check="$t('check_email')"
      :visitEmail="$t('go_to_email')"
    />
  </modal-window>
  <modal-window v-if="showSuccess" :click="successModalHandler">
    <success-modal
      :mainText="$t('thank_you')"
      :secondaryText="$t('activated')"
      :linkText="$t('go_to_newsfeed')"
    ></success-modal>
  </modal-window>
  <modal-window v-if="showLogin" :click="loginModalHandler">
    <login-modal
      @showRegistration="toggleRegistration"
      @showReset="togglePasswordResetEmail"
    ></login-modal>
  </modal-window>
  <modal-window v-if="showPasswordResetEmail" :click="resetModalHandler">
    <password-reset
      @showLogin="toggleLogin"
      @showEmail="emailIsSent"
      :button-text="$t('send_email.send')"
      :header="$t('send_email.forgot_password')"
      :secondary-text="$t('send_email.forgot_password_description')"
    >
      <AuthInput
        name="email"
        type="email"
        :label="$t('send_email.email_label')"
        :placeholder="$t('send_email.email_placeholder')"
        rule="required|email"
      />
    </password-reset>
  </modal-window>
  <modal-window v-if="showPasswordResetForm" :click="resetModalHandler">
    <password-reset
      @showLogin="toggleLogin"
      @showSuccess="resetSuccessfull"
      :header="$t('create_password.create')"
      :secondary-text="$t('create_password.password_instructions')"
      :button-text="$t('create_password.reset')"
    >
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
    </password-reset>
  </modal-window>
  <modal-window v-if="showResetEmailSent" :click="emailSentHandler">
    <email-sent
      :sent="$t('email_success.check')"
      :check="$t('email_success.send_instructions')"
      :visitEmail="$t('email_success.go_to_email')"
      :skip="$t('email_success.skip')"
      @skip="emailSentHandler"
    />
  </modal-window>
  <modal-window v-if="showSuccessPassword" :click="successModalHandler">
    <success-modal
      :mainText="$t('success.success')"
      :secondaryText="$t('success.password_changed')"
      :login="$t('success.login')"
      @show-login="toggleLogin"
    ></success-modal>
  </modal-window>

  <div class="bg-black flex flex-col gap-64 pb-[180px]">
    <div class="flex justify-between px-8 py-4">
      <h3 class="text-[#DDCCAA]">{{ $t('header.movie_quotes') }}</h3>
      <div class="flex gap-6">
        <language-select></language-select>
        <button class="bg-[#E31221] text-white px-7 py-1 rounded" @click="registrationHandler">
          {{ $t('header.sign_up') }}
        </button>
        <button class="text-white px-7 py-1 border-[1px]" @click="loginModalHandler">
          {{ $t('header.log_in') }}
        </button>
      </div>
    </div>

    <div class="flex flex-col items-center">
      <h2
        :class="`text-[#DDCCAA] text-[60px] ${
          this.$i18n.locale === 'en' ? 'w-[800px]' : 'w-[1200px]'
        } text-center font-light`"
      >
        {{ $t('main_text.find_any_quote') }}
      </h2>
      <button class="bg-[#E31221] text-white p-3 rounded mt-5" @click="registrationHandler">
        {{ $t('main_text.get_started') }}
      </button>
    </div>
  </div>
  <landing-quote
    image="bg-[url('@/assets/images/interstelar.png')]"
    :quote="$t('interstellar_quote')"
    :movie="$t('interstellar')"
    :scroll="scroll"
    width="w-[760px]"
  >
  </landing-quote>
  <landing-quote
    image="bg-[url('@/assets/images/tenabaums.png')]"
    :quote="$t('royal_tenebaums_quote')"
    :movie="$t('royal_tenebaums')"
    :scroll="scroll"
    width="w-[850px]"
  >
  </landing-quote>
  <landing-quote
    image="bg-[url('@/assets/images/LOTR.png')]"
    :quote="$t('royal_tenebaums_quote')"
    :movie="$t('royal_tenebaums')"
    :scroll="scroll"
    width="w-[850px]"
  >
  </landing-quote>
  <div class="bg-black p-2">
    <h2 class="ml-20 text-[#DDCCAA]">© 2022 movie quotes. All rights reserved.</h2>
  </div>
</template>

<script setup>
import RegistrationModal from '../Components/RegistrationModal.vue'
import LanguageSelect from '../Components/LanguageSelect.vue'
import LandingQuote from '../Components/LandingQuote.vue'
import EmailSent from '../Components/EmailSent.vue'
import AuthInput from '../Components/AuthInput.vue'
import ModalWindow from '../Components/ModalWindow.vue'
import SuccessModal from '../Components/SuccessModal.vue'
import LoginModal from '../Components/LoginModal.vue'
import PasswordReset from '../Components/PasswordReset.vue'
import axios from '@/config/axios/index.js'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
const scroll = ref(false)
const showRegistration = ref(false)
const showEmailSent = ref(false)
const route = useRoute()
const showSuccess = ref(false)
const showLogin = ref(false)
const showPasswordResetEmail = ref(false)
const showResetEmailSent = ref(false)
const showPasswordResetForm = ref(false)
const showSuccessPassword = ref(false)

if (route.path === '/verify' && route.query.token.length === 128) {
  axios
    .get(`/api/verify/${route.query.token}`)
    .then((response) => {
      showSuccess.value = true
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
}
if (route.path === '/reset' && route.query.token.length === 128) {
  showPasswordResetForm.value = true
}
const togglePasswordResetEmail = (reset) => {
  showPasswordResetEmail.value = reset
  showLogin.value = !reset
}
const loginModalHandler = () => {
  showLogin.value = !showLogin.value
}
const resetModalHandler = () => {
  showPasswordResetEmail.value = false
  showPasswordResetForm.value = false
}
const registrationHandler = () => {
  showRegistration.value = !showRegistration.value
}
const emailSentHandler = () => {
  showEmailSent.value = false
  showResetEmailSent.value = false
}
const successModalHandler = () => {
  showSuccess.value = false
  showSuccessPassword.value = false
}
const emailIsSent = (showEmail) => {
  showPasswordResetEmail.value
    ? (showResetEmailSent.value = showEmail)
    : (showResetEmailSent.value = false)
  showRegistration.value ? (showEmailSent.value = showEmail) : (showEmailSent.value = false)
  showRegistration.value = false
  showPasswordResetEmail.value = false
}
const resetSuccessfull = () => {
  showSuccessPassword.value = true
  showPasswordResetForm.value = false
}
const toggleLogin = (login) => {
  showRegistration.value = false
  showPasswordResetEmail.value = false
  showPasswordResetForm.value = false
  showSuccessPassword.value = false

  showLogin.value = login
}
const toggleRegistration = (registration) => {
  showRegistration.value = registration
  showLogin.value = !registration
}

window.addEventListener('scroll', () => {
  if (window.innerHeight * 0.78 <= window.scrollY) {
    scroll.value = true
  } else {
    scroll.value = false
  }
})
</script>
