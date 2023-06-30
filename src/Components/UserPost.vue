<template>
  <div class="mb-10">
    <div class="flex items-center gap-5 mb-4">
      <img :src="profileUrl" :alt="profilePicture" class="w-13 h-13 rounded-full" />
      <h2 class="text-white text-lg">{{ username }}</h2>
    </div>
    <h2 class="text-white mb-7">
      <span>“{{ props.quote ? JSON.parse(props.quote)[localeStore.lang] : '' }}”</span>
      <span class="text-[#DDCCAA]"
        >{{ movie }} <span>({{ year }})</span></span
      >
    </h2>
    <img :src="imageUrl" alt="quote picture" class="w-full" />
    <div class="flex gap-5 mt-6">
      <div class="flex gap-2 items-center">
        <span class="text-white">{{ commentCount }}</span>
        <span class="text-white">{{ user.name }}</span>
        <img
          src="../assets/images/comment.svg"
          alt="comment icon"
          class="cursor-pointer"
          @click="showMoreComments"
        />
      </div>
      <div class="flex gap-2 items-center">
        <span class="text-white">{{ likeCount }}</span>
        <LikeButton :color="liked ? 'red' : 'white'" @click="newLike" />
      </div>
    </div>
    <div class="w-full h-[1px] bg-[#EFEFEF4D] my-6"></div>
    <div v-for="comments in visibleComments" :key="comments.id">
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
</template>

<script setup>
import UserComment from './UserComment.vue'
import LikeButton from './LikeButton.vue'
import { defineProps, ref, onBeforeMount, reactive, onMounted } from 'vue'
import { Form, Field } from 'vee-validate'
import { useUsersStore } from '../stores/user'
import { useLocaleStore } from '../stores/locale'
import { like, removeLike, getLikes, comments } from '../services/postRequest'
import instantiatePusher from '../helpers/instantiatePusher'
const localeStore = useLocaleStore()
const liked = ref(false)
const likeCount = ref(props.numOfLikes)
const commentCount = ref(props?.comment?.length)
const allComments = ref(props.comment)
const store = useUsersStore()
const user = ref(store.authUser)
const input = ref('')
const visibleComments = ref([])
const numVisibleComments = ref(2)
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
// const likes = reactive([])
// const removeLikes = reactive([])
onMounted(() => {
  instantiatePusher()
  window.Echo.channel('likes').listen('LikeEvent', (data) => {
    if (data.message.quote_id === props.quoteID) {
      likeCount.value += 1
    }
  })
  window.Echo.channel('removeLikes').listen('RemoveLike', (data) => {
    if (data.message.quote_id === props.quoteID) {
      likeCount.value -= 1
    }
  })
})
const imageUrl = ref(store.getUrl(props.thumbnail))
const profileUrl = ref(store.getUrl(props.profilePicture))
const showMoreComments = () => {
  visibleComments.value = allComments.value
}
const changeInput = (e) => {
  input.value = e.target.value
}
const aUser = ref([])
aUser.value.profile_picture = store.getUrl(props.loggedInUser.profile_picture)
onBeforeMount(async () => {
  aUser.value = props.loggedInUser
  aUser.value.profile_picture = store.getUrl(props.loggedInUser.profile_picture)
  const data = {
    quote_id: String(props.quoteID)
  }
  const response = await getLikes(data)
  if (response) {
    liked.value = true
  } else {
    liked.value = false
  }
  visibleComments.value = allComments.value.slice(0, numVisibleComments.value)
})

const newLike = async () => {
  const data = {
    quote_id: String(props.quoteID)
  }
  if (!liked.value) {
    try {
      await like(data)

      liked.value = true
    } catch (error) {
      console.error(error)
    }
  } else {
    try {
      await removeLike(data)
      liked.value = false
    } catch (error) {
      console.error(error)
    }
  }
}
const submit = async (value) => {
  const data = {
    quote_id: String(props.quoteID),
    comment: value['comment']
  }
  store.getAuthUser()
  const userData = store.authUser

  try {
    await comments(data)
    store.getAuthUser()
    visibleComments.value.push({
      comment: data.comment,
      user: {
        name: userData[0].name,
        profile_picture: store.getUrl(userData[0].profile_picture)
      }
    })
    commentCount.value++
    input.value = ''
  } catch (error) {
    console.error(error)
  }
}
</script>
