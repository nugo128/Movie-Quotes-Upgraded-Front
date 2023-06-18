<template>
  <div>
    <profile-header></profile-header>
    <div class="pt-8">
      <user-navbar></user-navbar>
      <Form
        @submit="submit"
        v-slot="{ meta }"
        class="w-1000 ml-500 mt-24 text-black flex flex-col gap-16"
      >
        <h2 class="text-white text-lg">My profile</h2>
        <div class="flex flex-col pl-40">
          <div class="flex flex-col items-center gap-2 mb-24 mr-10">
            <img :src="user.profile_picture" alt="profile picture" class="w-48 rounded-full" />

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
              >Upload new photo</label
            >
          </div>

          <div class="flex flex-col mb-12 gap-12">
            <fake-input
              name="Username"
              type="text"
              :value="user?.name"
              :edit="showEditUsernameField"
            ></fake-input>

            <div class="w-[600px]" v-if="editUsername">
              <AuthInput
                name="username"
                type="text"
                label="Username"
                placeholder="Enter new usergame"
                rule="required|min:8|max:15|lowercase_num"
                width="600"
              />
            </div>
          </div>
          <div class="flex flex-col mb-12 gap-12">
            <fake-input
              name="Email"
              type="email"
              :value="user?.email"
              :edit="showEditEmailField"
            ></fake-input>

            <div class="w-[600px]" v-if="editEmail">
              <AuthInput
                name="email"
                type="email"
                label="Email"
                placeholder="Enter new email"
                rule="required|email"
                width="600"
              />
            </div>
          </div>
          <div class="flex flex-col mb-12 gap-12">
            <fake-input
              name="password"
              type="password"
              value="password"
              :edit="showEditPasswordField"
            ></fake-input>

            <div class="flex flex-col gap-12 w-[600px]" v-if="editPassword">
              <div class="border-[1px] border-[#CED4DA33] p-6 flex flex-col gap-5">
                <h2 class="text-white">Password should counain:</h2>

                <div class="text-[#9C9A9A] flex flex-col gap-1">
                  <h3 :class="moreThan8 ? 'text-white' : ''">
                    <span :class="moreThan8 ? 'text-[#198754]' : ''">•</span> 8 or more characters
                  </h3>
                  <h3 :class="lessThanLowercase15 ? 'text-white' : ''">
                    <span :class="lessThanLowercase15 ? 'text-[#198754]' : ''">•</span>
                    15 lowercase character
                  </h3>
                </div>
              </div>
              <AuthInput
                name="password"
                type="password"
                label="Password"
                placeholder="Enter new password"
                rule="required|min:8|max:15|lowercase_num"
                width="600"
                @input-value="handleInput"
              />
              <AuthInput
                name="password_confirmation"
                type="password"
                label="Password_confirmation"
                placeholder="Confirm password"
                rule="required|confirmed:@password"
                width="600"
              />
            </div>
          </div>
        </div>
        <div class="text-white ml-auto mt-16 flex gap-4">
          <button type="button" class="px-4 py-2 cursor-pointer text-[#CED4DA]" @click="cancel">
            Cancel
          </button>
          <button
            type="submit"
            class="bg-[#E31221] px-4 py-2 rounded cursor-pointer"
            :class="meta.dirty && meta.valid ? 'bg-[#E31221]' : 'bg-[#EC4C57] pointer-events-none'"
          >
            Save changes
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup>
import profileHeader from '../Components/profileHeader.vue'
import UserNavbar from '../Components/UserNavbar.vue'
import { Form, Field } from 'vee-validate'
import { onBeforeMount, ref } from 'vue'
import axios from '@/config/axios/index.js'
import AuthInput from '../Components/AuthInput.vue'
import FakeInput from '../Components/FakeInput.vue'
import { useUsersStore } from '../stores/user'
const store = useUsersStore()
const user = ref([])
const editEmail = ref(false)
const editUsername = ref(false)
const editPassword = ref(false)
const moreThan8 = ref(false)
const lessThanLowercase15 = ref(false)
const profilePicture = ref('')
const showUpload = ref(false)
const uploadImage = () => {
  showUpload.value = true
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
  user.value.profile_picture = profilePicture
  showUpload.value = false
}
const formData = new FormData()

const submit = async (val) => {
  for (let value in val) {
    formData.set(value, val[value])
  }
  await axios.post('/api/editProfile', formData)
  store.getAuthUser()
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
