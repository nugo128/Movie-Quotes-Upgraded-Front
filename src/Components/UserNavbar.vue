<template>
  <nav class="pl-[70px] mt-24 flex flex-col gap-11 fixed">
    <div class="flex gap-6 items-center">
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
      <home-button :color="path === '/user-profile' ? 'white' : 'red'"></home-button>
      <router-link to="newsfeed" class="text-white text-xl mb-1">{{
        $t('newsfeed.news_feed')
      }}</router-link>
    </div>
    <div class="flex items-center gap-11 cursor-pointer">
      <img src="../assets/images/movie.svg" alt="" />
      <h2 class="text-white text-xl mb-1">{{ $t('newsfeed.movies_list') }}</h2>
    </div>
  </nav>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import axios from '@/config/axios/index.js'
import HomeButton from './HomeButton.vue'
import { useRoute } from 'vue-router'
import { useUsersStore } from '../stores/user'

defineProps({
  username: {
    type: String,
    required: false
  },
  profilePic: {
    type: String,
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
</script>
