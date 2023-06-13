<template>
  <div class="mb-10">
    <div class="flex items-center gap-5 mb-4">
      <img :src="profilePicture" alt="profile picture" class="w-[52px]" />
      <h2 class="text-white text-lg">{{ username }}</h2>
    </div>
    <h2 class="text-white mb-7">
      <span>“{{ quote }}”</span>
      <span class="text-[#DDCCAA]"
        >{{ movie }} <span>({{ year }})</span></span
      >
    </h2>
    <img :src="thumbnail" alt="quote picture" class="w-full" />
    <div class="flex gap-5 mt-6">
      <div class="flex gap-2 items-center">
        <span class="text-white">{{ commentCount }}</span>
        <span class="text-white">{{ user.name }}</span>
        <img src="../assets/images/comment.svg" alt="comment icon" class="cursor-pointer" />
      </div>
      <div class="flex gap-2 items-center">
        <span class="text-white">{{ likeCount }}</span>
        <LikeButton :color="liked ? 'red' : 'white'" @click="like" />
      </div>
    </div>
    <div class="w-full h-[1px] bg-[#EFEFEF4D] my-6"></div>
    <div v-for="comments in allComments">
      <user-comment
        :comment="comments.comments"
        :commentAuthor="comments.user.name"
        :profilePicture="comments.user.profile_picture"
      ></user-comment>
    </div>
    <div class="flex gap-6">
      <img src="../assets/images/profile.png" alt="" class="w-[52px]" />
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
            :class="{
              'border-2 border-red-500': !!errors?.length,
              'border-2 border-green-500': !errors?.length && value?.length > 0
            }"
            type="text"
            :placeholder="$t('newsfeed.comment')"
            class="bg-[#24222F] w-full h-14 p-7 outline-none"
          />
        </Field>
      </Form>
    </div>
  </div>
</template>

<script setup>
import UserComment from './UserComment.vue'
import LikeButton from './LikeButton.vue'
import { defineProps, ref, onBeforeMount } from 'vue'
import axios from '@/config/axios/index.js'
import { Form, Field } from 'vee-validate'
import AuthInput from './AuthInput.vue'
import { useUsersStore } from '../stores/user'
import { defineEmits } from 'vue'
const props = defineProps({
  username: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    required: true
  },
  movie: {
    type: String,
    required: true
  },
  quote: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  comment: {
    type: Array,
    required: true
  },
  numOfLikes: {
    type: Number,
    required: true
  },
  quoteID: {
    type: Number,
    required: true
  }
})
const liked = ref(false)
const likeCount = ref(props.numOfLikes)
const commentCount = ref(props.comment.length)
const allComments = ref([...props.comment])
const store = useUsersStore()
const user = ref(store.authUser)

const emits = defineEmits(['commented'])

onBeforeMount(async () => {
  const data = {
    quote_id: String(props.quoteID)
  }
  const response = await axios.post('/api/get-likes', data)
  if (response.status === 200) {
    liked.value = true
  } else {
    liked.value = false
  }
})

const like = async () => {
  const data = {
    quote_id: String(props.quoteID)
  }
  if (!liked.value) {
    await axios
      .post('/api/like', data)
      .then((response) => {
        liked.value = true
        likeCount.value++
      })
      .catch((e) => {
        console.log(e)
      })
  } else {
    await axios.post('/api/remove-like', data)
    liked.value = false
    likeCount.value--
  }
}
const submit = async (value, actions) => {
  const data = {
    quote_id: String(props.quoteID),
    comment: value['comment']
  }
  store.getAuthUser()
  const userData = store.authUser
  await axios
    .post('api/comment', data)
    .then((response) => {
      store.getAuthUser()
      allComments.value.push({
        comments: data.comment,
        user: {
          name: userData[0].name,
          profile_picture: userData[0].profile_picture
        }
      })
      commentCount.value++
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>
