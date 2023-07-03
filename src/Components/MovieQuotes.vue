<template>
  <div class="bg-[#11101A] w-[800px] px-8 py-6 flex flex-col gap-6 rounded-md">
    <div class="flex justify-between relative">
      <img :src="store.getUrl(thumbnail)" class="w-56 h-36 rounded-sm mr-8" alt="" />
      <h2 class="my-auto text-lg text-[#CED4DA]">
        {{ JSON.parse(quote)[localeStore.lang] }}
      </h2>
      <span class="text-white text-lg cursor-pointer" @click="toggleQuote">...</span>
      <div
        v-if="viewQuote"
        class="absolute bg-[#24222F] left-[44.5rem] top-8 px-10 py-8 rounded-lg flex flex-col gap-8 text-white w-64"
      >
        <div class="flex items-center gap-4 cursor-pointer" @click="view">
          <img src="../assets/images/view.svg" class="w-5" alt="" />
          <p>View Quote</p>
        </div>
        <div class="flex items-center gap-4 cursor-pointer" @click="edit">
          <img src="../assets/images/edit.svg" class="w-5" alt="" />
          <p>edit</p>
        </div>
        <div class="flex items-center gap-4 cursor-pointer" @click="deleteQuote">
          <img src="../assets/images/delete.svg" class="w-5" alt="" />
          <p>delete</p>
        </div>
      </div>
    </div>
    <div class="w-full h-[1px] bg-[#EFEFEF33]"></div>
    <div class="flex gap-5">
      <div class="flex gap-3 items-center text-white">
        <span>{{ commentCount }} </span>
        <img src="../assets/images/comment.svg" alt="" />
      </div>
      <div class="flex gap-3 items-center text-white">
        {{ likeCount ? likeCount : data.likes?.length }}
        <LikeButton :color="liked ? 'red' : 'white'" @click="newLike" />
      </div>
    </div>
  </div>
</template>

<script setup>
import LikeButton from './LikeButton.vue'
import { ref, onBeforeMount, onMounted } from 'vue'
import instantiatePusher from '../helpers/instantiatePusher'
import { useUsersStore } from '../stores/user'
import { useLocaleStore } from '../stores/locale'
import axios from '@/config/axios/index.js'
import { like, removeLike, getLikes } from '../services/postRequest'
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
const likeCount = ref(props.likes.length)
const commentCount = ref(props.comment.length)
onMounted(async () => {
  const data = {
    quote_id: String(props.id)
  }
  const response = await getLikes(data)
  if (response) {
    liked.value = true
  } else {
    liked.value = false
  }
  instantiatePusher()
  window.Echo.channel('likes').listen('LikeEvent', (data) => {
    if (data.message.quote_id == props.id) {
      likeCount.value += 1
      if (data.message.user_id == store.authUser[0].id) {
        liked.value = true
      }
    }
  })
  window.Echo.channel('removeLikes').listen('RemoveLike', (data) => {
    if (data.message.quote_id == props.id) {
      likeCount.value -= 1
      if (data.message.user_id == store.authUser[0].id) {
        liked.value = false
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
    quote_id: String(props.id)
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
    await axios
      .delete(`/api/delete-quote/${props.id}`)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
const toggleQuote = () => {
  viewQuote.value = !viewQuote.value
}
onBeforeMount(async () => {
  if (!store.authUser.length) {
    store.getAuthUser()
  }
})
</script>
