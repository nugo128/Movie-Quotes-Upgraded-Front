<template>
  <div class="mb-14">
    <div class="flex items-center gap-5 md:mb-4 mb-2">
      <img :src="profileUrl" :alt="profilePicture" class="md:w-13 md:h-13 w-10 h-10 rounded-full" />
      <h2 class="text-white md:text-lg text-sm">{{ username }}</h2>
    </div>
    <h2 class="text-white md:mb-7 mb-4 text-sm md:text-base">
      <span>“{{ quote ? JSON.parse(quote)[localeStore.lang] : '' }}”</span>
      <span class="text-[#DDCCAA]"
        >{{ movie ? JSON.parse(movie)[localeStore.lang] : '' }}
        <span class="text-white">({{ year }})</span></span
      >
    </h2>
    <img :src="imageUrl" alt="quote picture" class="w-full md:w-900 rounded-lg" />
    <div class="flex gap-5 md:mt-6 mt-2">
      <div class="flex gap-2 items-center">
        <span class="text-white">{{ commentCount }}</span>
        <span class="text-white">{{ user.name }}</span>
        <img
          src="../assets/images/comment.svg"
          alt="comment icon"
          class="cursor-pointer md:w-8 w-6"
          @click="showMoreComments"
        />
      </div>
      <div class="flex gap-2 items-center">
        <span class="text-white">{{ likeCount }}</span>
        <LikeButton :color="liked ? 'red' : 'white'" @click="newLike" class="md:w-8 w-6" />
      </div>
    </div>
    <div class="w-full h-[1px] bg-[#EFEFEF4D] md:my-6 my-3"></div>
    <div v-for="comments in !commentsOpen ? visibleComments : allComments" :key="comments.id">
      <user-comment
        :comment="comments.comment"
        :commentAuthor="comments.user.name"
        :profilePicture="comments.user.profile_picture"
      ></user-comment>
    </div>
    <div class="flex gap-6">
      <img
        :src="store.getUrl(store.authUser[0]?.profile_picture)"
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
            class="bg-default-bg w-full h-14 p-7 outline-none rounded-md"
          />
        </Field>
      </Form>
    </div>
  </div>
</template>

<script setup>
import UserComment from './UserComment.vue'
import LikeButton from './LikeButton.vue'
import { defineProps, ref, onBeforeMount, onMounted } from 'vue'
import { Form, Field } from 'vee-validate'
import { useUsersStore } from '@/stores/userStore'
import { useLocaleStore } from '@/stores/localeStore'
import { like, removeLike, getLikes, comments } from '@/services/index'
import instantiatePusher from '@/helpers/instantiatePusher'
const localeStore = useLocaleStore()
const liked = ref(false)
const likeCount = ref(props.numOfLikes)
const commentCount = ref(props?.comment?.length)
const allComments = ref(props.comment)
const store = useUsersStore()
const user = ref(store.authUser)
const input = ref('')
const visibleComments = ref([])
const props = defineProps({
  username: {
    type: String,
    required: true
  },
  userId: {
    type: Number,
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
const likeId = ref(null)
const pusherActive = ref(false)
onMounted(async () => {
  instantiatePusher()
  const data = {
    quote_id: String(props.quoteID)
  }
  try {
    const response = await getLikes(data)
    likeId.value = response.data.like.id
    liked.value = true
  } catch (error) {
    liked.value = false
  }
  window.Echo.channel('likes').listen('LikeEvent', (data) => {
    if (data.message.quote_id == props.quoteID) {
      pusherActive.value = true
      likeCount.value += 1
      if (data.message.user_id == store.authUser[0].id) {
        liked.value = true
        likeId.value = data.message.id
      }
    }
  })
  window.Echo.channel('removeLikes').listen('RemoveLike', (data) => {
    if (data.message.quote_id == props.quoteID) {
      pusherActive.value = true
      likeCount.value -= 1
      if (data.message.user_id == store.authUser[0].id) {
        liked.value = false
        likeId.value = data.message.id
      }
    }
  })
  window.Echo.channel('comments').listen('AddComment', (data) => {
    if (data.message.quote_id == props.quoteID) {
      visibleComments.value.push({
        comment: data.message?.comment,
        user: {
          name: data.message.user.name,
          profile_picture: data.message.user.profile_picture
        }
      })
      visibleComments.value = visibleComments.value.slice(-2)
      allComments.value.push({
        comment: data.message?.comment,
        user: {
          name: data.message.user.name,
          profile_picture: data.message.user.profile_picture
        }
      })
      commentCount.value += 1
    }
  })
})
const imageUrl = ref(store.getUrl(props.thumbnail))
const profileUrl = ref(store.getUrl(props.profilePicture))
const commentsOpen = ref(false)
const showMoreComments = () => {
  commentsOpen.value = !commentsOpen.value
}
const changeInput = (e) => {
  input.value = e.target.value
}
onBeforeMount(async () => {
  if (!store.authUser[0]) {
    store.getAuthUser()
  }
  visibleComments.value = allComments.value.slice(-2)
})

const newLike = async () => {
  const data = {
    quote_id: String(props.quoteID),
    user_id: props.userId
  }
  if (!liked.value) {
    try {
      const response = await like(data)
      likeId.value = response.data.like.id
      liked.value = true
      pusherActive.value ? '' : likeCount.value++
    } catch (error) {
      console.error(error)
    }
  } else {
    try {
      await removeLike(likeId.value)
      liked.value = false
      pusherActive.value ? '' : likeCount.value--
    } catch (error) {
      console.error(error)
    }
  }
}
const submit = async (value) => {
  if (!store.authUser[0]) {
    store.getAuthUser()
  }
  const data = {
    quote_id: String(props.quoteID),
    comment: value['comment'],
    user_id: store.authUser[0]?.id,
    post_author: props.userId
  }

  try {
    await comments(data)
    input.value = ''
  } catch (error) {
    console.error(error)
  }
}
</script>
