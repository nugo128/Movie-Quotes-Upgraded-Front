<template>
  <div class="mb-10">
    <div class="flex items-center gap-5 mb-4">
      <img :src="profilePicture" :alt="profilePicture" class="w-[52px] rounded-full" />
      <h2 class="text-white text-lg">{{ username }}</h2>
    </div>
    <h2 class="text-white mb-7">
      <span>“{{ JSON.parse(props.quote)[localeStore.lang] }}”</span>
      <span class="text-[#DDCCAA]"
        >{{ movie }} <span>({{ year }})</span></span
      >
    </h2>
    <img :src="imageUrl" alt="quote picture" class="w-full" />
    <div class="flex gap-5 mt-6">
      <div class="flex gap-2 items-center">
        <span class="text-white">{{ commentCount }}</span>
        <span class="text-white">{{ user.name }}</span>
        <img src="../assets/images/comment.svg" alt="comment icon" class="cursor-pointer" />
      </div>
      <div class="flex gap-2 items-center">
        <span class="text-white">{{ likeCount }}</span>
        <LikeButton :color="liked ? 'red' : 'white'" @click="newLike" />
      </div>
    </div>
    <div class="w-full h-[1px] bg-[#EFEFEF4D] my-6"></div>
    <div v-for="comments in allComments">
      <user-comment
        :comment="comments.comment"
        :commentAuthor="comments.user.name"
        :profilePicture="comments.user.profile_picture"
      ></user-comment>
    </div>
    <div class="flex gap-6">
      <img :src="aUser.profile_picture" alt="" class="w-[52px] rounded-full" />
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
</template>

<script setup>
import UserComment from './UserComment.vue'
import LikeButton from './LikeButton.vue'
import { defineProps, ref, onBeforeMount, computed } from 'vue'
import { Form, Field } from 'vee-validate'
import { useUsersStore } from '../stores/user'
import { useLocaleStore } from '../stores/locale'
import { like, removeLike, getLikes, comment } from '../services/postRequest'
const localeStore = useLocaleStore()
const link = import.meta.env.VITE_IMAGE_BASE_URL
const liked = ref(false)
const likeCount = ref(props.numOfLikes)
const commentCount = ref(props.comment.length)
const allComments = ref([...props.comment])
const store = useUsersStore()
const user = ref(store.authUser)
const input = ref('')
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
  },
  loggedInUser: {
    type: Object,
    required: true
  }
})

const imageUrl = computed(() => {
  if (props.thumbnail.substring(0, 5) === 'https') {
    return props.thumbnail
  } else {
    return link + props.thumbnail
  }
})

const changeInput = (e) => {
  input.value = e.target.value
}
const aUser = ref([])
onBeforeMount(async () => {
  aUser.value = props.loggedInUser
  const data = {
    quote_id: String(props.quoteID)
  }
  const response = await getLikes(data)
  if (response) {
    liked.value = true
  } else {
    liked.value = false
  }
})

const newLike = async () => {
  const data = {
    quote_id: String(props.quoteID)
  }
  if (!liked.value) {
    try {
      await like(data)
      liked.value = true
      likeCount.value++
    } catch (error) {
      console.error(error)
    }
  } else {
    try {
      await removeLike(data)
      liked.value = false
      likeCount.value--
    } catch (error) {
      console.error(error)
    }
  }
}
const submit = async (value, actions) => {
  const data = {
    quote_id: String(props.quoteID),
    comment: value['comment']
  }
  store.getAuthUser()
  const userData = store.authUser

  try {
    await comment(data)
    store.getAuthUser()
    allComments.value.push({
      comment: data.comment,
      user: {
        name: userData[0].name,
        profile_picture: userData[0].profile_picture
      }
    })
    commentCount.value++
    input.value = ''
  } catch (error) {
    console.error(error)
  }
}
</script>