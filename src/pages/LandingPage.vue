<template>
  <modal-window :click="registrationHandler" v-if="showRegistration || route.query.registration">
    <registration-modal
      @registered="emailIsSent"
      @showLogin="toggleLogin"
      :currentWidth="currentWidth"
    />
  </modal-window>
  <modal-window v-if="showEmailSent || route.query.emailSent" :click="emailSentHandler">
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
  <modal-window v-if="showLogin || route.query.login" :click="loginModalHandler">
    <login-modal
      @showRegistration="toggleRegistration"
      @showReset="togglePasswordResetEmail"
      :currentWidth="currentWidth"
    ></login-modal>
  </modal-window>
  <modal-window v-if="showPasswordResetEmail || route.query.resetEmail" :click="resetModalHandler">
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
        :placeholder="$t('form.password_placeholder')"
        rule="required|min:8|max:15|lowercase_num"
      />
      <AuthInput
        name="confirmation"
        type="password"
        :label="$t('form.confirm_password_label')"
        :placeholder="$t('form.confirm_password_placeholder')"
        rule="required|confirmed:@password"
      />
    </password-reset>
  </modal-window>
  <modal-window v-if="showResetEmailSent || route.query.resetEmailSent" :click="emailSentHandler">
    <email-sent
      :sent="$t('email_success.check')"
      :check="$t('email_success.send_instructions')"
      :visitEmail="$t('email_success.go_to_email')"
      :skip="$t('email_success.skip')"
      @skip="emailSentHandler"
    />
  </modal-window>
  <modal-window
    v-if="showSuccessPassword || route.query.successPassword"
    :click="successModalHandler"
  >
    <success-modal
      :mainText="$t('success.success')"
      :secondaryText="$t('success.password_changed')"
      :login="$t('success.login')"
      @show-login="toggleLogin"
    ></success-modal>
  </modal-window>

  <div class="bg-black flex flex-col md:gap-64 gap-32 pb-[11.25rem]">
    <div class="flex justify-between items-center md:px-8 p-4">
      <h3 class="text-[#DDCCAA] text-xs md:text-base">{{ $t('header.movie_quotes') }}</h3>
      <div class="flex gap-2 md:gap-5">
        <language-select class="hidden md:flex"></language-select>
        <button
          class="text-white md:text-base text-xs md:px-7 text-[0.625rem] px-2 py-1 rounded border-[1px]"
          @click="loginModalHandler"
        >
          {{ $t('header.log_in') }}
        </button>
        <button
          class="bg-light-red text-white md:text-base text-[0.625rem] px-2 py-1 md:px-7 rounded"
          @click="registrationHandler"
        >
          {{ $t('header.sign_up') }}
        </button>
      </div>
    </div>

    <div class="flex flex-col items-center">
      <h2
        :class="`text-[#DDCCAA] md:text-[4.375rem] md:p-0 ${
          localeStore.lang === 'en' ? 'md:w-[55rem] px-16' : 'md:w-[75rem] px-6'
        } text-center font-light`"
      >
        {{ $t('main_text.find_any_quote') }}
      </h2>
      <button
        class="bg-light-red text-white md:p-3 py-1 px-3 rounded mt-5"
        @click="registrationHandler"
      >
        {{ $t('main_text.get_started') }}
      </button>
    </div>
  </div>
  <landing-quote
    image="bg-[url('@/assets/images/interstelar.png')]"
    :quote="$t('interstellar_quote')"
    :movie="$t('interstellar')"
    :scroll="scroll"
    width="md:w-[47.5rem] w-[16rem]"
  >
  </landing-quote>
  <landing-quote
    image="bg-[url('@/assets/images/tenabaums.png')]"
    :quote="$t('royal_tenebaums_quote')"
    :movie="$t('royal_tenebaums')"
    :scroll="scroll"
    width="md:w-[53rem] w-[16rem]"
  >
  </landing-quote>
  <landing-quote
    image="bg-[url('@/assets/images/LOTR.png')]"
    :quote="$t('royal_tenebaums_quote')"
    :movie="$t('royal_tenebaums')"
    :scroll="scroll"
    width="md:w-[53rem] w-[16rem]"
  >
  </landing-quote>
  <div class="bg-black p-2">
    <h2 class="md:ml-20 text-[#DDCCAA] text-[0.5rem] md:text-xl">
      {{ $t('rights_served') }}
    </h2>
  </div>
</template>

<script setup>
import RegistrationModal from '@/Components/RegistrationModal.vue'
import LanguageSelect from '@/Components/LanguageSelect.vue'
import LandingQuote from '@/Components/LandingQuote.vue'
import EmailSent from '@/Components/EmailSent.vue'
import AuthInput from '@/Components/AuthInput.vue'
import ModalWindow from '@/Components/ModalWindow.vue'
import SuccessModal from '@/Components/SuccessModal.vue'
import LoginModal from '@/Components/LoginModal.vue'
import { verifyUser } from '@/services/index'
import PasswordReset from '@/Components/PasswordReset.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { useLocaleStore } from '../stores/localeStore'
const router = useRouter()
const route = useRoute()
const localeStore = useLocaleStore()
const scroll = ref(false)
const showRegistration = ref(route.query.registration)
const showEmailSent = ref(route.query.emailSent)
const showSuccess = ref(false)
const showLogin = ref(route.query.login)
const showPasswordResetEmail = ref(route.query.resetEmail)
const showResetEmailSent = ref(route.query.resetEmailSent)
const showPasswordResetForm = ref(false)
const showSuccessPassword = ref(false)
const currentWidth = ref(window.innerWidth)
if (route.path === '/verify' && route.query.token.length === 128) {
  await verifyUser(route.query.token)
    .then(() => {
      showSuccess.value = true
    })
    .catch((error) => {
      console.log(error)
    })
}
if (route.path === '/reset' && route.query.token.length === 128) {
  showPasswordResetForm.value = true
}

const saveModal = (modalState, queryName) => {
  modalState ? router.replace({ name: 'home' }) : router.replace({ name: 'home', query: queryName })
}
const togglePasswordResetEmail = (reset) => {
  saveModal(showPasswordResetEmail.value, { resetEmail: true })
  showPasswordResetEmail.value = reset
  showLogin.value = !reset
}
const loginModalHandler = () => {
  saveModal(showLogin.value, { login: true })
  showLogin.value = !showLogin.value
}
const resetModalHandler = () => {
  router.replace({ name: 'home' })
  showPasswordResetEmail.value = false
  showPasswordResetForm.value = false
}
const registrationHandler = () => {
  saveModal(showRegistration.value, { registration: true })
  showRegistration.value = !showRegistration.value
}
const emailSentHandler = () => {
  router.replace({ name: 'home' })
  showEmailSent.value = false
  showResetEmailSent.value = false
}
const successModalHandler = () => {
  router.replace({ name: 'home' })
  showSuccess.value = false
  showSuccessPassword.value = false
}
const emailIsSent = (showEmail) => {
  showPasswordResetEmail.value
    ? (showResetEmailSent.value = showEmail)
    : (showResetEmailSent.value = false)
  saveModal(!showPasswordResetEmail.value, { resetEmailSent: true })

  showRegistration.value ? (showEmailSent.value = showEmail) : (showEmailSent.value = false)
  saveModal(!showRegistration.value, { emailSent: true })
  showRegistration.value = false
  showPasswordResetEmail.value = false
}
const resetSuccessfull = () => {
  router.replace({ name: 'home', query: { successPassword: true } })
  showSuccessPassword.value = true
  showPasswordResetForm.value = false
}
const toggleLogin = (login) => {
  saveModal(showLogin.value, { login: true })
  showRegistration.value = false
  showPasswordResetEmail.value = false
  showPasswordResetForm.value = false
  showSuccessPassword.value = false

  showLogin.value = login
}
const toggleRegistration = (registration) => {
  saveModal(showRegistration.value, { registration: true })
  showRegistration.value = registration
  showLogin.value = !registration
}

window.addEventListener('scroll', () => {
  if (window.innerHeight * 0.74 <= window.scrollY) {
    scroll.value = true
  } else {
    scroll.value = false
  }
})
window.addEventListener('resize', () => {
  currentWidth.value = window.innerWidth
})
</script>
