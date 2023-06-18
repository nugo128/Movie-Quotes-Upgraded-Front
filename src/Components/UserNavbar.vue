<template>
  <nav class="pl-[70px] mt-24 flex flex-col gap-11 fixed">
    <div class="flex gap-6 items-center">
      <img
        :src="
          newPicture[0]?.profile_picture
            ? store.getUrl(newPicture[0]?.profile_picture)
            : user.profile_picture
        "
        alt=""
        class="w-[60px] rounded-full"
        :class="path === '/user-profile' ? 'border-red-600 border-4' : ''"
      />
      <div>
        <h2 class="text-white mb-1 font-bold">{{ user.name }}</h2>
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
    <p class="text-white">{{ Boolean() }}</p>
  </nav>
</template>

<script setup>
import { onBeforeMount, ref, defineEmits } from 'vue'
import axios from '@/config/axios/index.js'
import HomeButton from './HomeButton.vue'
import { useRoute } from 'vue-router'
import { useUsersStore } from '../stores/user'
const emits = defineEmits(['edit'])
const store = useUsersStore()
const route = useRoute()
const path = ref(route.path)
const newPicture = ref(store.authUser)
const user = ref([])
onBeforeMount(async () => {
  const response = await axios.get('/api/user')

  user.value = response.data
  user.value.profile_picture = store.getUrl(response.data.profile_picture)
})
</script>
