<template>
  <div
    class="bg-[#11101A] md:w-[50rem] w-screen px-8 py-6 flex flex-col gap-6 rounded-md -ml-9 md:ml-0"
  >
    <div class="flex justify-between relative flex-col md:flex-row gap-6 md:gap-0">
      <img :src="store.getUrl(thumbnail)" class="md:w-56 w-full h-36 rounded-sm mr-8" alt="" />
      <h2 class="my-auto text-lg text-[#CED4DA] break-words">
        "{{ JSON.parse(quote)[localeStore.lang] }}"
      </h2>
      <span class="text-white text-lg cursor-pointer hidden md:block" @click="toggleQuote"
        >...</span
      >
      <div
        v-if="viewQuote"
        class="absolute bg-[#24222F] md:left-[44.5rem] right-0 top-12 md:top-8 md:px-10 py-8 px-8 rounded-lg flex flex-col gap-8 text-white w-60"
      >
        <div class="flex items-center gap-4 cursor-pointer" @click="view">
          <img src="../assets/images/view.svg" class="w-5" alt="" />
          <p>{{ $t('movies.view') }}</p>
        </div>
        <div class="flex items-center gap-4 cursor-pointer" @click="edit">
          <img src="../assets/images/edit.svg" class="w-5" alt="" />
          <p>{{ $t('movies.edit') }}</p>
        </div>
        <div class="flex items-center gap-4 cursor-pointer" @click="deleteQuote">
          <img src="../assets/images/delete.svg" class="w-5" alt="" />
          <p>{{ $t('movies.delete') }}</p>
        </div>
      </div>
    </div>
    <div class="w-full h-px bg-[#EFEFEF33]"></div>
    <div class="flex justify-between">
      <div class="flex gap-5">
        <div class="flex gap-3 items-center text-white">
          <span>{{ commentCount }} </span>
          <img src="../assets/images/comment.svg" alt="" class="w-6 md:w-8" />
        </div>
        <div class="flex gap-3 items-center text-white">
          {{ likeCount ? likeCount : 0 }}
          <LikeButton class="w-6 md:w-8" :color="liked ? 'red' : 'white'" @click="newLike" />
        </div>
      </div>
      <span class="text-white text-lg cursor-pointer md:hidden -mt-2" @click="toggleQuote"
        >...</span
      >
    </div>
  </div>
</template>

<script setup>
import LikeButton from './LikeButton.vue'
import { ref, onBeforeMount, onMounted } from 'vue'
import instantiatePusher from '../helpers/instantiatePusher'
import { useUsersStore } from '../stores/userStore'
import { useLocaleStore } from '../stores/localeStore'
import { like, removeLike, getLikes, deleteQuotes } from '../services/index'
const localeStore = useLocaleStore()
const store = useUsersStore()
import { useRouter } from 'vue-router'
const router = useRouter()
const props = defineProps({
  quote: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  likes: {
    type: Array,
    required: true
  },
  comment: {
    type: Array,
    required: true
  },
  id: {
    type: Number,
    required: true
  },
  userId: {
    type: Number,
    required: true
  }
})
const likeId = ref(null)
const likeCount = ref(props.likes.length)
const commentCount = ref(props.comment.length)
onMounted(async () => {
  const data = {
    quote_id: String(props.id)
  }
  try {
    const response = await getLikes(data)
    liked.value = true
    console.log(response.data)
    likeId.value = response.data.like.id
  } catch (error) {
    liked.value = false
  }
  instantiatePusher()
  window.Echo.channel('likes').listen('LikeEvent', (data) => {
    if (data.message.quote_id == props.id) {
      likeCount.value += 1
      if (data.message.user_id == store.authUser[0].id) {
        liked.value = true
        likeId.value = data.message.id
      }
    }
  })
  window.Echo.channel('removeLikes').listen('RemoveLike', (data) => {
    if (data.message.quote_id == props.id) {
      likeCount.value -= 1
      if (data.message.user_id == store.authUser[0].id) {
        liked.value = false
        likeId.value = data.message.id
      }
    }
  })
  window.Echo.channel('comments').listen('AddComment', (data) => {
    if (data.message.quote_id == props.id) {
      commentCount.value += 1
    }
  })
})
const liked = ref(false)
const viewQuote = ref(false)
const newLike = async () => {
  const data = {
    quote_id: String(props.id),
    user_id: props.userId
  }
  if (!liked.value) {
    try {
      const response = await like(data)
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
const view = () => {
  router.replace({ path: '/view-quote', query: { id: props.id } })
}
const emits = defineEmits(['deleted', 'edit'])
const edit = () => {
  viewQuote.value = false
  if (props.userId === store.authUser[0].id) {
    emits('edit', {
      title: props.quote,
      thumbnail: props.thumbnail,
      id: props.id
    })
  }
}
const deleteQuote = async () => {
  viewQuote.value = false
  if (props.userId === store.authUser[0].id) {
    emits('deleted', props.id)
    deleteQuotes(props.id)
  }
}
const toggleQuote = () => {
  viewQuote.value = !viewQuote.value
}
onBeforeMount(async () => {
  if (!store.authUser.length) {
    store.getAuthUser
  }
})
</script>
