<template>
  <header class="md:px-16 px-9 py-6 bg-[#24222F] flex justify-between fixed right-0 w-full z-[999]">
    <img src="../assets/images/burger.svg" class="w-5 md:hidden" alt="" @click="toggleMenu" />
    <h2 class="text-[#DDCCAA] md:block hidden">MOVIE QUOTES</h2>
    <div class="flex gap-10 items-center">
      <div class="md:hidden flex">
        <slot></slot>
      </div>
      <div class="md:relative cursor-pointer">
        <img src="../assets/images/bell.svg" class="w-6" alt="bell" @click="toggleNotification" />
        <span
          v-if="notificationCount"
          class="absolute md:left-3 md:-top-3 top-3 bg-[#E33812] md:w-7 md:h-7 w-6 h-6 text-center rounded-full text-white md:text-lg right-6"
          @click="toggleNotification"
          >{{ notificationCount }}</span
        >
        <img
          v-if="showNotifications"
          src="../assets/images/triangle.svg"
          class="absolute right-8"
          alt=""
        />
        <div
          v-if="showNotifications"
          class="absolute md:top-12 bg-black md:w-900 w-screen md:left-[-650px] left-0 top-16 pb-8 max-h-[50.75rem] overflow-y-scroll scrollbar-hide"
        >
          <div class="flex items-center justify-between pt-10 pb-6 text-2xl text-white px-8">
            <h2 class="text-base md:text-lg">Notifications</h2>
            <h2 class="underline text-base md:text-lg" @click="readNotification('all')">
              Mark as all read
            </h2>
          </div>
          <div
            v-for="notify in notification[0]"
            :key="notify.id"
            class="flex justify-between border border-[#6C757D80] mx-8 md:px-6 px-3 py-5 mb-4 rounded-md flex-col md:flex-row"
            @click="readNotification(notify.id)"
          >
            <div class="flex gap-3 md:gap-6 text-white text-lg justify-between">
              <img
                :src="store.getUrl(notify?.picture)"
                alt=""
                class="rounded-full md:w-20 md:h-20 w-15 h-15"
                :class="!notify.seen ? 'border-[#198754] border-2' : ''"
              />

              <div class="flex flex-col gap-2 md:gap-3">
                <h2 class="">
                  {{ notify?.from }}
                </h2>
                <h2 class="flex gap-3 md:text-base text-sm" v-if="notify?.type === 'comment'">
                  <img src="../assets/images/quoteIcon.svg" alt="" class="md:w-8 md:h-7 w-6 h-6" />
                  <span class="hidden md:block">Commented to your movie quote</span
                  ><span class="md:hidden block">Commented to your quote</span>
                </h2>
                <h2 class="flex gap-3" v-else>
                  <img
                    src="../assets/images/filled-hearth.svg"
                    alt=""
                    class="md:w-8 md:h-7 w-6 h-6"
                  />
                  <span>Reacted to your quote</span>
                </h2>
              </div>
            </div>
            <div
              class="md:text-lg text-sm flex md:flex-col flex-row-reverse md:gap-2 md:items-end md:justify-normal justify-end gap-12"
            >
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
