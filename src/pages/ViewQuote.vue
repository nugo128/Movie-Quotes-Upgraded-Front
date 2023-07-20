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
        :type="data.movie.id"
      />
    </newitem-modal>
    <newitem-modal :click="back" v-if="!edit">
      <div class="p-8 flex flex-col gap-4">
        <div class="flex justify-between w-7/12 md:pt-7 mb-12">
          <div class="flex gap-5 items-center">
            <img src="../assets/images/edit.svg" class="w-5" alt="" @click="editQuote" />
            <div class="h-4 w-[1px] bg-medium-gray"></div>
            <img src="../assets/images/delete.svg" class="w-5" alt="" @click="deleteQuote" />
          </div>
          <h2 class="md:block hidden">{{ $t('movies.view') }}</h2>
        </div>
        <div class="h-px w-full bg-medium-gray absolute right-0 md:top-28 top-20"></div>
        <div class="flex items-center gap-5">
          <img
            :src="store.getUrl(data?.user?.profile_picture)"
            class="md:w-15 md:h-15 w-10 h-10 rounded-full"
            alt=""
          />
          <h2 class="text-sm md:text-base">{{ data?.user?.name }}</h2>
        </div>
        <div class="flex flex-col gap-4">
          <div
            class="border rounded p-2 px-4 md:h-fit h-20 border-border-gray flex justify-between relative"
          >
            <img
              src="../assets/images/textarea-resizer.svg"
              alt=""
              class="md:hidden absolute right-2 bottom-2"
            />
            <h2>"{{ data?.quote ? JSON.parse(data?.quote)['en'] : '' }}"</h2>
            <span class="text-text-gray">Eng</span>
          </div>
          <div
            class="border rounded p-2 px-4 md:h-fit h-20 border-border-gray flex justify-between relative"
          >
            <img
              src="../assets/images/textarea-resizer.svg"
              alt=""
              class="md:hidden absolute right-2 bottom-2"
            />
            <h2>"{{ data?.quote ? JSON.parse(data?.quote)['ka'] : '' }}"</h2>
            <span class="text-text-gray">ქარ</span>
          </div>
        </div>
        <div>
          <img
            :src="store.getUrl(data?.thumbnail)"
            class="md:w-900 md:h-[31.875rem] w-[22.5rem] h-[18.75rem] rounded-lg"
            alt=""
          />
        </div>
        <div class="flex gap-5 items-center">
          <div class="flex gap-3">
            <h2>{{ commentCount ? commentCount : data?.comments?.length }}</h2>
            <img
              src="../assets/images/comment.svg"
              alt="comment icon"
              class="cursor-pointer w-6 md:w-8"
              @click="showMoreComments"
            />
          </div>
          <div class="flex gap-3 items-center">
            {{ likeCount }}
            <LikeButton class="w-6 md:w-8" :color="liked ? 'red' : 'white'" @click="newLike" />
          </div>
        </div>
        <div v-for="comments in !commentsOpen ? visibleComments : allComments" :key="comments.id">
          <user-comment
            :comment="comments.comment"
            :commentAuthor="comments.user.name"
            :profilePicture="comments.user.profile_picture"
          ></user-comment>
        </div>
        <div class="flex gap-6 items-center">
          <img
            :src="store.getUrl(loggedInUser.profile_picture)"
            alt=""
            class="md:w-13 md:h-13 w-10 h-10 rounded-full"
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
                class="bg-default-bg w-full h-14 p-7 outline-none rounded-2xl"
              />
            </Field>
          </Form>
        </div>
      </div>
    </newitem-modal>
  </div>
</template>

<script setup>
import UserNavbar from '@/Components/UserNavbar.vue'
import { onBeforeMount, ref, onMounted } from 'vue'
import instantiatePusher from '@/helpers/instantiatePusher'
import { useRoute, useRouter } from 'vue-router'
import { useUsersStore } from '@/stores/userStore'
import { Form, Field } from 'vee-validate'
import UserComment from '@/Components/UserComment.vue'
import NewitemModal from '@/Components/NewitemModal.vue'
import LikeButton from '@/Components/LikeButton.vue'
import NewPost from '@/Components/NewPost.vue'
import { like, removeLike, getLikes, comments, deleteQuotes, viewQuote } from '@/services/index'
import { useQuoteStore } from '@/stores/quoteStore'
const quoteStore = useQuoteStore()
const edit = ref(false)
const data = ref({})
const loggedInUser = ref({})
const liked = ref(false)
const route = useRoute()
const commentCount = ref(data.value.comments?.length)
const likeCount = ref(0)
const likeId = ref(null)
const store = useUsersStore()
if (!store.authUser.length) {
  store.getAuthUser()
}
onMounted(async () => {
  instantiatePusher()
  const likeData = {
    quote_id: String(route.query.id),
    user_id: store.authUser[0].id
  }
  try {
    const response = await getLikes(likeData)
    liked.value = true
    likeId.value = response.data.like.id
  } catch (error) {
    liked.value = false
  }
  window.Echo.channel('likes').listen('LikeEvent', (data) => {
    if (data.message.quote_id == route.query.id) {
      likeCount.value += 1
      if (data.message.user_id == store.authUser[0].id) {
        liked.value = true
        likeId.value = data.message.id
      }
    }
  })
  window.Echo.channel('removeLikes').listen('RemoveLike', (data) => {
    if (data.message.quote_id == route.query.id) {
      if (data.message.user_id == store.authUser[0].id) {
        liked.value = false
        likeId.value = data.message.id
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
const allComments = ref(data.value.comments)
const visibleComments = ref([])
const input = ref('')
const back = () => {
  router.replace({ name: 'movie-description', query: { id: data.value.movie.id } })
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
    await deleteQuotes(data.value.id)
      .then(() => {
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
  const likeData = {
    quote_id: String(route.query.id),
    user_id: data.value.user.id
  }
  if (!liked.value) {
    try {
      const response = await like(likeData)
      likeId.value = response.data.like.id
      liked.value = true
    } catch (error) {
      console.error(error)
    }
  } else {
    try {
      await removeLike(likeId.value)
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
  if (!quoteStore.quote.length) {
    quoteStore.getQuote(route.query.id)
    await viewQuote(route.query.id)
  }
  data.value = quoteStore.quote
  loggedInUser.value = store.authUser[0]
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
    user_id: store.authUser[0].id,
    post_author: data?.value?.user?.id
  }
  try {
    await comments(commentData)
    input.value = ''
  } catch (error) {
    console.error(error)
  }
}
</script>
