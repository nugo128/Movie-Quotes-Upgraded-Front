<template>
  <nav class="fixed bg-transparen h-full w-fit md:h-fit z-[999]">
    <div
      class="md:pl-[4.375rem] md:pt-0 rounded-lg pl-11 md:mt-24 flex flex-col gap-11 md:bg-transparent bg-black md:h-fit h-3/4 p-11 w-fit z-[999]"
    >
      <div class="flex gap-6 items-cente">
        <img
          :src="
            profilePic
              ? store.getUrl(profilePic)
              : editedUser[0]?.profile_picture
              ? store.getUrl(editedUser[0]?.profile_picture)
              : user.profile_picture
          "
          alt=""
          class="w-15 h-15 rounded-full"
          :class="path === '/user-profile' ? 'border-red-600 border-4' : ''"
        />
        <div>
          <h2 class="text-white mb-1 font-bold">
            {{ username ? username : editedUser[0]?.name ? editedUser[0]?.name : user.name }}
          </h2>
          <router-link to="user-profile" class="text-white text-sm font-normal cursor-pointer"
            >{{ $t('newsfeed.edit') }}
          </router-link>
        </div>
      </div>
      <div class="flex items-center gap-11 cursor-pointer">
        <home-button :color="path === '/newsfeed' ? 'red' : 'white'"></home-button>
        <router-link to="newsfeed" class="text-white text-xl mb-1">{{
          $t('newsfeed.news_feed')
        }}</router-link>
      </div>
      <div class="flex items-center gap-11 cursor-pointer">
        <movie-icon
          :color="
            path === '/my-movies' || path === '/movie-description' || path === '/view-quote'
              ? 'red'
              : 'white'
          "
        ></movie-icon>
        <router-link to="my-movies" class="text-white text-xl mb-1">{{
          $t('newsfeed.movies_list')
        }}</router-link>
      </div>
      <div class="flex gap-24">
        <language-select class="flex md:hidden"></language-select>
        <button
          class="text-white text-sm border border-white py-2 px-3 rounded-md md:hidden"
          @click="logoutHandler"
        >
          {{ $t('newsfeed.logout') }}
        </button>
      </div>
      <div
        class="bg-opacity-90 absolute w-3/4 top-0 -right-64 h-full z-10 md:hidden"
        @click="click"
      ></div>
    </div>
    <div class="bg-opacity-90 absolute w-full h-full z-10 md:hidden" @click="click"></div>
  </nav>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import axios from '@/config/axios/index.js'
import HomeButton from './HomeButton.vue'
import LanguageSelect from './LanguageSelect.vue'
import MovieIcon from './MovieIcon.vue'
import { useRoute } from 'vue-router'
import { useUsersStore } from '../stores/user'
import { useRouter } from 'vue-router'
import { userLogOut } from '../services/loginRequest'
const router = useRouter()

defineProps({
  username: {
    type: String,
    required: false
  },
  profilePic: {
    type: String,
    required: false
  },
  click: {
    type: Function,
    required: false
  }
})
const store = useUsersStore()
const route = useRoute()
const path = ref(route.path)
const editedUser = ref(store.authUser)
const user = ref([])
onBeforeMount(async () => {
  const response = await axios.get('/api/user')

  user.value = response.data
  user.value.profile_picture = store.getUrl(response.data.profile_picture)
})
const logoutHandler = async () => {
  try {
    await userLogOut()
    router.replace({ name: 'home' })
  } catch (error) {
    console.error(error)
  }
}
</script>
