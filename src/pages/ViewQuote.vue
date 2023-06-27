<template>
  <div>
    <user-navbar> </user-navbar>
    <newitem-modal>
      <div class="p-8 flex flex-col gap-4">
        <div class="flex justify-between w-1/2 pt-7 mb-12">
          <div class="flex gap-5 items-center">
            <img src="../assets/images/edit.svg" class="w-5" alt="" />
            <div class="h-4 w-[1px] bg-[#EFEFEF33]"></div>
            <img src="../assets/images/delete.svg" class="w-5" alt="" />
          </div>
          <h2>view quote</h2>
        </div>
        <div class="h-[1px] w-full bg-[#EFEFEF33] absolute right-1 top-28"></div>
        <div class="flex items-center gap-5">
          <img :src="store.getUrl(data?.user?.profile_picture)" class="w-15" alt="" />
          <h2>{{ data?.user?.name }}</h2>
        </div>
        <div class="flex flex-col gap-4">
          <div class="border rounded p-2 px-4 border-[#6C757DB2] flex justify-between">
            <h2>"{{ data?.quote ? JSON.parse(data?.quote)['en'] : '' }}"</h2>
            <span class="text-[#6C757D]">Eng</span>
          </div>
          <div class="border rounded p-2 px-4 border-[#6C757DB2] flex justify-between">
            <h2>"{{ data?.quote ? JSON.parse(data?.quote)['ka'] : '' }}"</h2>
            <span class="text-[#6C757D]">ქარ</span>
          </div>
        </div>
        <div>
          <img :src="store.getUrl(data?.thumbnail)" alt="" />
        </div>
        <div class="flex gap-5 items-center">
          <div class="flex gap-3">
            <h2>{{ data?.comments?.length }}</h2>
            <img src="../assets/images/comment.svg" alt="comment icon" class="cursor-pointer" />
          </div>
          <div class="flex gap-3">
            {{ data?.likes?.length }}
            <LikeButton color="red" />
          </div>
        </div>
        <div v-for="comments in data?.comments" :key="comments.id">
          <user-comment
            :comment="comments.comment"
            :commentAuthor="comments.user.name"
            :profilePicture="comments.user.profile_picture"
          ></user-comment>
        </div>
        <div class="flex gap-6">
          <img
            :src="store.getUrl(loggedInUser.profile_picture)"
            alt=""
            class="w-13 h-13 rounded-full"
          />
          <Form class="w-full" @submit="submit">
            <Field
              v-slot="{ field, errors, value }"
              name="comment"
              rules="required"
              :validate-on-input="true"
            >
              <input
                id="comment"
                v-bind="field"
                :value="input"
                :class="{
                  'border-2 border-red-500': !!errors?.length,
                  'border-2 border-green-500': !errors?.length && value?.length > 0
                }"
                @input="changeInput"
                type="text"
                :placeholder="$t('newsfeed.comment')"
                class="bg-[#24222F] w-full h-14 p-7 outline-none"
              />
            </Field>
          </Form>
        </div>
      </div>
    </newitem-modal>
  </div>
</template>

<script setup>
import UserNavbar from '../Components/UserNavbar.vue'
import { onBeforeMount, ref } from 'vue'
import axios from '@/config/axios/index.js'
import { useRoute } from 'vue-router'
import { useUsersStore } from '../stores/user'
import { Form, Field } from 'vee-validate'
import UserComment from '../Components/UserComment.vue'
import NewitemModal from '../Components/NewitemModal.vue'
import LikeButton from '../Components/LikeButton.vue'
const store = useUsersStore()
const route = useRoute()
const data = ref({})
const loggedInUser = ref([])
onBeforeMount(async () => {
  const resp = await axios.get('/api/view-quote', {
    params: {
      id: route.query.id
    }
  })
  data.value = resp.data
  const response = await axios.get('/api/user')
  loggedInUser.value = response?.data
})
</script>
