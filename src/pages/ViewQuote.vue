<template>
  <div>
    <user-navbar> </user-navbar>
    <newitem-modal v-if="edit" :click="editQuote">
      <new-post
        @updated="updateQuotes"
        :quote="{
          title: data?.quote,
          thumbnail: data?.thumbnail,
          id: data?.id
        }"
      />
    </newitem-modal>
    <newitem-modal :click="back" v-if="!edit">
      <div class="p-8 flex flex-col gap-4">
        <div class="flex justify-between w-1/2 pt-7 mb-12">
          <div class="flex gap-5 items-center">
            <img src="../assets/images/edit.svg" class="w-5" alt="" @click="editQuote" />
            <div class="h-4 w-[1px] bg-[#EFEFEF33]"></div>
            <img src="../assets/images/delete.svg" class="w-5" alt="" @click="deleteQuote" />
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
            <h2>{{ commentCount ? commentCount : data?.comments?.length }}</h2>
            <img
              src="../assets/images/comment.svg"
              alt="comment icon"
              class="cursor-pointer"
              @click="showMoreComments"
            />
          </div>
          <div class="flex gap-3">
            {{ likeCount }}
            <LikeButton :color="liked ? 'red' : 'white'" @click="newLike" />
          </div>
        </div>
        <div v-for="comments in !commentsOpen ? visibleComments : allComments" :key="comments.id">
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
import { onBeforeMount, ref, onMounted } from 'vue'
import instantiatePusher from '../helpers/instantiatePusher'
import axios from '@/config/axios/index.js'
import { useRoute, useRouter } from 'vue-router'
import { useUsersStore } from '../stores/user'
import { Form, Field } from 'vee-validate'
import UserComment from '../Components/UserComment.vue'
import NewitemModal from '../Components/NewitemModal.vue'
import LikeButton from '../Components/LikeButton.vue'
import NewPost from '../Components/NewPost.vue'
import { like, removeLike, getLikes } from '../services/postRequest'
import { comments } from '../services/postRequest'
const edit = ref(false)
const data = ref({})
const liked = ref(false)
const route = useRoute()
const commentCount = ref(data.value.comments?.length)
const likeCount = ref(0)
onMounted(() => {
  instantiatePusher()
  window.Echo.channel('likes').listen('LikeEvent', (data) => {
    if (data.message.quote_id == route.query.id) {
      likeCount.value += 1
      if (data.message.user_id == store.authUser[0].id) {
        liked.value = true
      }
    }
  })
  window.Echo.channel('removeLikes').listen('RemoveLike', (data) => {
    if (data.message.quote_id == route.query.id) {
      if (data.message.user_id == store.authUser[0].id) {
        liked.value = false
      }
      likeCount.value -= 1
    }
  })
  window.Echo.channel('comments').listen('AddComment', (data) => {
    if (data.message.quote_id == route.query.id) {
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
const editQuote = () => {
  if (data.value.user.id === loggedInUser.value.id) {
    edit.value = !edit.value
  }
}
const router = useRouter()
const store = useUsersStore()
const allComments = ref(data.value.comments)
const visibleComments = ref([])
const loggedInUser = ref([])
const input = ref('')
const back = () => {
  router.replace({ path: '/movie-description', query: { id: data.value.movie.id } })
}
const updateQuotes = (e) => {
  data.value.quote = e.quote
  data.value.thumbnail = e.thumbnail
  edit.value = false
}
const changeInput = (e) => {
  input.value = e.target.value
}
const deleteQuote = async () => {
  if (data.value.user.id === loggedInUser.value.id) {
    await axios
      .delete(`/api/delete-quote/${data.value.id}`)
      .then((response) => {
        console.log(response.data)
        back()
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
const commentsOpen = ref(false)
const showMoreComments = () => {
  commentsOpen.value = !commentsOpen.value
}
const newLike = async () => {
  const data = {
    quote_id: String(route.query.id)
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
onBeforeMount(async () => {
  if (!store.authUser[0]) {
    store.getAuthUser()
  }
  const resp = await axios.get('/api/view-quote', {
    params: {
      id: route.query.id
    }
  })
  data.value = resp.data
  const response = await axios.get('/api/user')
  loggedInUser.value = response?.data
  likeCount.value = data?.value.likes.length
  allComments.value = data?.value.comments
  commentCount.value = data?.value.comments.length
  const likeResponse = await getLikes({ quote_id: data.value.id })
  if (likeResponse) {
    liked.value = true
  } else {
    liked.value = false
  }
  visibleComments.value = allComments.value.slice(-2)
})
const submit = async (value) => {
  const commentData = {
    quote_id: String(data.value.id),
    comment: value['comment'],
    user_id: store.authUser[0].id
  }
  try {
    await comments(commentData)
    input.value = ''
  } catch (error) {
    console.error(error)
  }
}
</script>
