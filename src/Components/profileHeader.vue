<template>
  <header class="px-16 pt-8 pb-4 bg-[#24222F] flex justify-between fixed right-0 w-full z-[999]">
    <h2 class="text-[#DDCCAA]">MOVIE QUOTES</h2>
    <div class="flex gap-10 items-center">
      <div class="relative cursor-pointer">
        <img src="../assets/images/bell.svg" alt="bell" @click="toggleNotification" />
        <span
          class="absolute left-4 bottom-4 bg-[#E33812] w-7 h-7 text-center rounded-full text-white text-lg"
          @click="toggleNotification"
          >{{ notification[0]?.length }}</span
        >
        <img v-if="showNotifications" src="../assets/images/triangle.svg" class="absolute" alt="" />
        <div
          v-if="showNotifications"
          class="absolute top-12 bg-black w-900 left-[-650px] pb-8 max-h-[812px] h-700 overflow-y-scroll scrollbar-hide"
        >
          <div class="flex items-center justify-between pt-10 pb-6 text-2xl text-white px-8">
            <h2>Notifications</h2>
            <h2 class="underline text-lg">Mark as all read</h2>
          </div>
          <div
            v-for="notify in notification[0]"
            :key="notify.id"
            class="flex justify-between border border-[#6C757D80] mx-8 px-6 py-5 mb-4 rounded-md"
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
            <div class="text-lg">
              <h3 class="text-white">5 min ago</h3>
              <h3 class="text-[#198754] pt-2">New</h3>
            </div>
          </div>
        </div>
      </div>
      <language-select></language-select>
      <button
        class="text-white text-sm border border-white py-2 px-3 rounded-md"
        @click="logoutHandler"
      >
        {{ $t('newsfeed.logout') }}
      </button>
    </div>
  </header>
</template>

<script setup>
import LanguageSelect from './LanguageSelect.vue'
import { useRouter } from 'vue-router'
import { userLogOut } from '../services/loginRequest'
import { onMounted, ref } from 'vue'
import { useUsersStore } from '../stores/user'
import instantiatePusher from '../helpers/instantiatePusher'
import axios from '@/config/axios/index.js'
const showNotifications = ref(false)
const toggleNotification = () => {
  showNotifications.value = !showNotifications.value
}
const store = useUsersStore()
const notification = ref([])
onMounted(async () => {
  instantiatePusher()
  let user = 0
  await axios
    .get('/api/user')
    .then((response) => (user = response.data.id))
    .catch((err) => console.log(err))

  axios.get(`/api/get-notifications/${user}`).then((response) => {
    notification.value.push(response.data)
  })
  window.Echo.private(`notifications.${user}`).listen('LikeNotification', (data) => {
    const existingLike = notification.value[0].find((obj) =>
      obj.type === 'like' ? obj.user_id === data.notification.user_id : false
    )

    if (!existingLike && data.notification.user_id !== user) {
      notification.value[0].unshift(data.notification)
    }
  })
  window.Echo.private(`commentNotifications.${user}`).listen('CommentNotification', (data) => {
    if (data.notification.user_id !== user) {
      notification.value[0].unshift(data.notification)
    }
  })
})
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
