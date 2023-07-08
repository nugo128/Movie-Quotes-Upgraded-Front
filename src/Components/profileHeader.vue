<template>
  <header class="md:px-16 px-9 py-6 bg-[#24222F] flex justify-between fixed right-0 w-full z-[999]">
    <img src="../assets/images/burger.svg" class="w-5 md:hidden" alt="" @click="toggleMenu" />
    <h2 class="text-[#DDCCAA] md:block hidden">MOVIE QUOTES</h2>
    <div class="flex gap-10 items-center">
      <div class="md:hidden flex">
        <slot></slot>
      </div>
      <div class="relative cursor-pointer">
        <img src="../assets/images/bell.svg" class="w-6" alt="bell" @click="toggleNotification" />
        <span
          v-if="notificationCount"
          class="absolute left-4 bottom-4 bg-[#E33812] w-7 h-7 text-center rounded-full text-white text-lg"
          @click="toggleNotification"
          >{{ notificationCount }}</span
        >
        <img v-if="showNotifications" src="../assets/images/triangle.svg" class="absolute" alt="" />
        <div
          v-if="showNotifications"
          class="absolute top-12 bg-black w-900 left-[-650px] pb-8 max-h-[812px] h-700 overflow-y-scroll scrollbar-hide"
        >
          <div class="flex items-center justify-between pt-10 pb-6 text-2xl text-white px-8">
            <h2>Notifications</h2>
            <h2 class="underline text-lg" @click="readNotification('all')">Mark as all read</h2>
          </div>
          <div
            v-for="notify in notification[0]"
            :key="notify.id"
            class="flex justify-between border border-[#6C757D80] mx-8 px-6 py-5 mb-4 rounded-md"
            @click="readNotification(notify.id)"
          >
            <div class="flex gap-6 text-white text-lg">
              <img :src="store.getUrl(notify?.picture)" alt="" class="rounded-full w-20 h-20" />
              <div class="flex flex-col gap-3">
                <h2 class="">
                  {{ notify?.from }}
                </h2>
                <h2 class="flex gap-3" v-if="notify?.type === 'comment'">
                  <img src="../assets/images/quoteIcon.svg" alt="" class="w-8 h-7" />
                  <span>Commented to your movie quote</span>
                </h2>
                <h2 class="flex gap-3" v-else>
                  <img src="../assets/images/filled-hearth.svg" alt="" class="w-8 h-7" />
                  <span>Reacted to your quote</span>
                </h2>
              </div>
            </div>
            <div class="text-lg flex flex-col gap-2 items-end">
              <h3 class="text-white">{{ getTimeAgo(notify.createdAt) }}</h3>
              <h3 class="text-[#198754]">{{ notify.seen ? '' : 'New' }}</h3>
            </div>
          </div>
        </div>
      </div>
      <language-select class="hidden md:flex"></language-select>
      <button
        class="text-white text-sm border border-white py-2 px-3 rounded-md hidden md:flex"
        @click="logoutHandler"
      >
        {{ $t('newsfeed.logout') }}
      </button>
    </div>
  </header>
  <user-navbar v-if="menuUpon" :click="toggleMenu"></user-navbar>
</template>

<script setup>
import LanguageSelect from './LanguageSelect.vue'
import { useRouter } from 'vue-router'
import { userLogOut } from '../services/loginRequest'
import { onMounted, ref } from 'vue'
import { useUsersStore } from '../stores/user'
import instantiatePusher from '../helpers/instantiatePusher'
import userNavbar from './UserNavbar.vue'
import axios from '@/config/axios/index.js'
const menuUpon = ref(false)
const toggleMenu = () => {
  menuUpon.value = !menuUpon.value
}
const showNotifications = ref(false)
const toggleNotification = () => {
  showNotifications.value = !showNotifications.value
}
const store = useUsersStore()
const notification = ref([])
const notificationCount = ref(0)
onMounted(async () => {
  instantiatePusher()
  let user = 0
  await axios
    .get('/api/user')
    .then((response) => (user = response.data.id))
    .catch((err) => console.log(err))

  axios.get(`/api/get-notifications/${user}`).then((response) => {
    notification.value.push(response.data)
    notificationCount.value = notification.value[0].filter((item) => item.seen == false).length
  })
  window.Echo.private(`notifications.${user}`).listen('LikeNotification', (data) => {
    const existingLike = notification.value[0].find((obj) =>
      obj.type === 'like' ? obj.user_id === data.notification.user_id : false
    )

    if (!existingLike && data.notification.user_id !== user) {
      let fullData = data.notification
      fullData.id = notification.value[0][0].id + 1
      notification.value[0].unshift(fullData)
      notificationCount.value++
    }
  })
  window.Echo.private(`commentNotifications.${user}`).listen('CommentNotification', (data) => {
    if (data.notification.user_id !== user) {
      let fullData = data.notification
      fullData.id = notification.value[0][0].id + 1
      notification.value[0].unshift(fullData)
      notificationCount.value++
    }
  })
})
const readNotification = async (id) => {
  if (id !== 'all') {
    await axios
      .post('/api/read-notifications', { id })
      .then((response) => console.log(response.data))
    const seenNotification = notification.value[0].find((item) => item.id === id)
    seenNotification.seen = true
    notificationCount.value--
  } else {
    await axios
      .post('/api/read-notifications', { all: 'all' })
      .then((response) => console.log(response.data))
    notification.value[0].map((val) => {
      val.seen = true
    })
    notificationCount.value = 0
  }
}
const getTimeAgo = (timestamp) => {
  const now = new Date()
  const createdAt = new Date(timestamp)
  let seconds = Math.floor((now - createdAt) / 1000)
  let minutes = Math.floor(seconds / 60)
  let hours = Math.floor(minutes / 60)
  let days = Math.floor(hours / 24)
  if (days > 0) {
    return days === 1 ? ' 1 day ago' : days + ' days ago'
  } else if (hours > 0) {
    return hours === 1 ? '1 hour ago' : hours + ' hours ago'
  } else if (minutes > 0) {
    return minutes + ' minutes ago'
  } else {
    return 'Just now'
  }
}
const router = useRouter()
const logoutHandler = async () => {
  try {
    await userLogOut()
    router.replace({ name: 'home' })
  } catch (error) {
    console.error(error)
  }
}
</script>
<style>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
