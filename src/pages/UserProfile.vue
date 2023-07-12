<template>
  <modal-window v-if="showConfirmation" :click="toggleConfirmation">
    <email-sent
      :sent="$t('thank_you')"
      :check="$t('profile.check_email')"
      :visitEmail="$t('go_to_email')"
    />
  </modal-window>
  <div v-if="showSuccess" class="fixed w-full h-screen flex justify-center items-start z-[60]">
    <div
      class="md:w-600 md:ml-2 mx-2 md:mt-48 mt-28 md:p-6 px-1 py-4 bg-[#BADBCC] z-[100] flex items-center justify-between text-white gap-10"
    >
      <div class="flex gap-4">
        <img src="../assets/images/check.svg" class="w-5 md:w-6" alt="success" />
        <p class="text-[#0F5132] md:text-lg text-sm">{{ $t('profile.changes_updated') }}</p>
      </div>
      <img
        src="../assets/images/X.svg"
        alt="close"
        class="w-5 md:w-8 cursor-pointer"
        @click="toggleSuccess"
      />
    </div>
    <div class="bg-black bg-opacity-60 absolute w-full h-full" @click="toggleSuccess"></div>
  </div>
  <div>
    <profile-header></profile-header>
    <div class="pt-8">
      <user-navbar
        class="hidden md:block"
        :username="userInfo[0]?.name ? userInfo[0]?.name : user?.name"
        :profilePic="
          userInfo[0]?.profile_picture ? userInfo[0]?.profile_picture : user?.profile_picture
        "
      ></user-navbar>
      <div class="bg-black w-full mt-10 h-16 md:hidden flex items-center pl-8">
        <img src="../assets/images/back.svg" class="w-5" alt="" @click="cancel" />
      </div>
      <Form
        @submit="submit"
        v-slot="{ meta }"
        class="md:w-1000 md:ml-500 md:mt-24 text-black flex flex-col gap-16 px-8 pb-40 md:pb-5 md:px-0 bg-[#24222F] md:bg-transparent"
      >
        <h2 class="text-white text-lg hidden md:block">{{ $t('profile.my_profile') }}</h2>
        <div class="flex flex-col md:pl-40">
          <div class="flex flex-col items-center gap-2 mb-24 mr-10">
            <img
              :src="user.profile_picture"
              alt="profile picture"
              class="w-48 h-48 rounded-full mt-5"
            />

            <Field
              id="file"
              type="file"
              class="hidden"
              name="image"
              rules="image|required"
              @input="changePhoto"
              v-if="showUpload"
            />
            <label
              class="text-lg rounded px-3 py-1 cursor-pointer text-center ml-2 text-white"
              for="file"
              @click="uploadImage"
              >{{ $t('profile.upload_photo') }}</label
            >
          </div>

          <div class="flex flex-col mb-12 gap-12">
            <fake-input
              :name="$t('profile.username')"
              type="text"
              :value="userInfo[0]?.name ? userInfo[0]?.name : user?.name"
              :edit="showEditUsernameField"
            ></fake-input>

            <div class="w-[37.5rem] hidden md:block" v-if="editUsername">
              <AuthInput
                name="username"
                type="text"
                :label="$t('profile.username')"
                :placeholder="$t('profile.username_placeholder')"
                rule="required|min:3|max:15|lowercase_num"
                width="600"
              />
            </div>
            <editprofile-modal
              v-if="editUsername"
              :cancel="cancel"
              :valid="meta.dirty && meta.valid ? true : false"
              :submit="submit"
              ><AuthInput
                class="bg-[#24222F] px-8 mt-10 py-10"
                name="username"
                type="text"
                :label="$t('profile.username_placeholder')"
                :placeholder="$t('profile.username_placeholder')"
                rule="required|min:3|max:15|lowercase_num"
                width="600"
              />
            </editprofile-modal>
          </div>
          <div class="flex flex-col mb-12 gap-12">
            <fake-input
              :name="$t('profile.email')"
              type="email"
              :value="user?.email"
              :edit="showEditEmailField"
            ></fake-input>

            <div class="md:w-600 hidden md:block" v-if="editEmail">
              <AuthInput
                name="email"
                type="email"
                :label="$t('profile.new_email')"
                :placeholder="$t('profile.email_placeholder')"
                rule="required|email"
                width="600"
              />
            </div>
            <editprofile-modal
              v-if="editEmail"
              :cancel="cancel"
              :valid="meta.dirty && meta.valid ? true : false"
              :submit="submit"
            >
              <AuthInput
                name="email"
                type="email"
                class="bg-[#24222F] px-8 mt-10 py-10"
                :label="$t('profile.email_placeholder')"
                :placeholder="$t('profile.email_placeholder')"
                rule="required|email"
                width="600"
              />
            </editprofile-modal>
          </div>
          <div class="flex flex-col mb-12 gap-12">
            <fake-input
              :name="$t('profile.password')"
              type="password"
              value="password"
              :edit="showEditPasswordField"
            ></fake-input>

            <div class="hidden md:flex flex-col gap-12 w-600" v-if="editPassword">
              <div class="border-[1px] border-[#CED4DA33] p-6 flex flex-col gap-5">
                <h2 class="text-white">{{ $t('profile.password_validation') }}</h2>

                <div class="text-[#9C9A9A] flex flex-col gap-1">
                  <h3 :class="moreThan8 ? 'text-white' : ''">
                    <span :class="moreThan8 ? 'text-[#198754]' : ''">•</span>
                    {{ $t('profile.min_characters') }}
                  </h3>
                  <h3 :class="lessThanLowercase15 ? 'text-white' : ''">
                    <span :class="lessThanLowercase15 ? 'text-[#198754]' : ''">•</span>
                    {{ $t('profile.max_characters') }}
                  </h3>
                </div>
              </div>
              <AuthInput
                name="password"
                type="password"
                :label="$t('profile.new_password')"
                :placeholder="$t('profile.password_placeholder')"
                rule="required|min:8|max:15|lowercase_num"
                width="600"
                @input-value="handleInput"
              />
              <AuthInput
                name="password_confirmation"
                type="password"
                :label="$t('profile.confirm_password')"
                :placeholder="$t('profile.confirm_password')"
                rule="required|confirmed:@password"
                width="600"
              />
            </div>
            <editprofile-modal
              v-if="editPassword"
              :cancel="cancel"
              :valid="meta.dirty && meta.valid ? true : false"
              :submit="submit"
            >
              <div class="border-[1px] border-[#CED4DA33] p-6 flex flex-col gap-5">
                <h2 class="text-white">{{ $t('profile.password_validation') }}</h2>

                <div class="text-[#9C9A9A] flex flex-col gap-1">
                  <h3 :class="moreThan8 ? 'text-white' : ''">
                    <span :class="moreThan8 ? 'text-[#198754]' : ''">•</span>
                    {{ $t('profile.min_characters') }}
                  </h3>
                  <h3 :class="lessThanLowercase15 ? 'text-white' : ''">
                    <span :class="lessThanLowercase15 ? 'text-[#198754]' : ''">•</span>
                    {{ $t('profile.max_characters') }}
                  </h3>
                </div>
              </div>
              <AuthInput
                name="password"
                type="password"
                class="bg-[#24222F] px-8 mt-10 py-10"
                :label="$t('profile.new_password')"
                :placeholder="$t('profile.password_placeholder')"
                rule="required|min:8|max:15|lowercase_num"
                width="600"
                @input-value="handleInput"
              />
              <AuthInput
                name="password_confirmation"
                type="password"
                class="bg-[#24222F] px-8 mt-10 py-10"
                :label="$t('profile.confirm_password')"
                :placeholder="$t('profile.confirm_password')"
                rule="required|confirmed:@password"
                width="600"
              />
            </editprofile-modal>
          </div>
        </div>
        <div class="text-white ml-auto mt-16 md:flex gap-4 hidden">
          <button type="button" class="px-4 py-2 cursor-pointer text-[#CED4DA]" @click="cancel">
            {{ $t('profile.cancel') }}
          </button>
          <button
            type="submit"
            class="bg-[#E31221] px-4 py-2 rounded cursor-pointer"
            :class="meta.dirty && meta.valid ? 'bg-[#E31221]' : 'bg-[#EC4C57] pointer-events-none'"
          >
            {{ $t('profile.save_changes') }}
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import EditprofileModal from '../Components/EditprofileModal.vue'
import ModalWindow from '../Components/ModalWindow.vue'
import EmailSent from '../Components/EmailSent.vue'
import profileHeader from '../Components/profileHeader.vue'
import UserNavbar from '../Components/UserNavbar.vue'
import { Form, Field } from 'vee-validate'
import { onBeforeMount, ref } from 'vue'
import axios from '@/config/axios/index.js'
import AuthInput from '../Components/AuthInput.vue'
import FakeInput from '../Components/FakeInput.vue'
import { useUsersStore } from '../stores/user'
import { usePostsStore } from '../stores/post'
import { useRoute, useRouter } from 'vue-router'
const store = useUsersStore()
const user = ref([])
const editEmail = ref(false)
const editUsername = ref(false)
const editPassword = ref(false)
const moreThan8 = ref(false)
const lessThanLowercase15 = ref(false)
const profilePicture = ref('')
const userInfo = ref(store.authUser)
const showUpload = ref(false)
const post = usePostsStore()
const showConfirmation = ref(false)
const route = useRoute()
const router = useRouter()
const showSuccess = ref(false)
const toggleSuccess = () => {
  showSuccess.value = false
}
const toggleConfirmation = () => {
  showConfirmation.value = false
}
const uploadImage = () => {
  showUpload.value = true
}
if (route.path === '/user-profile' && route?.query?.token?.length === 128) {
  axios
    .get(`/api/verify-new-email/${route.query.token}`)
    .then((response) => {
      console.log(response)
      router.replace('/user-profile')
      showSuccess.value = true
    })
    .catch((error) => {
      console.log(error)
    })
}

const handleInput = (e) => {
  const lowercaseCheck = /^[a-z0-9]+$/
  if (e.length <= 15 && lowercaseCheck.test(e)) {
    lessThanLowercase15.value = true
  } else {
    lessThanLowercase15.value = false
  }
  if (e.length >= 8) {
    moreThan8.value = true
  } else {
    moreThan8.value = false
  }
}
const cancel = () => {
  editPassword.value = false
  editUsername.value = false
  editEmail.value = false
  user.value.profile_picture = userInfo.value[0]?.profile_picture
    ? store.getUrl(userInfo.value[0]?.profile_picture)
    : profilePicture
  showUpload.value = false
}
const formData = new FormData()

const submit = async (val) => {
  post.clear()
  for (let value in val) {
    formData.set(value, val[value])
  }
  await axios.post('/api/editProfile', formData)
  store.clearUser()
  store.getAuthUser()
  userInfo.value = store.authUser
  editPassword.value = false
  editUsername.value = false
  editEmail.value = false
  showUpload.value = false
  showSuccess.value = true
  if (formData.get('email')) {
    showSuccess.value = false
    showConfirmation.value = true
  }
}
const showEditPasswordField = () => {
  editPassword.value = true
}
const showEditUsernameField = () => {
  editUsername.value = true
}
const showEditEmailField = () => {
  editEmail.value = true
}
const changePhoto = (event) => {
  const file = event.target.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    user.value.profile_picture = e.target.result
  }
  if (file) {
    reader.readAsDataURL(file)
  }
}
onBeforeMount(async () => {
  const response = await axios.get('/api/user')
  user.value = response.data
  user.value.profile_picture = store.getUrl(response.data.profile_picture)
  profilePicture.value = store.getUrl(response.data.profile_picture)
})
</script>
