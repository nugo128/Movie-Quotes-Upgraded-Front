<template>
  <div class="bg-[#0D0B14] h-max">
    <profile-header v-if="!showSearch">
      <search-bar @searched="searchPosts" />
    </profile-header>
    <newitem-modal v-if="addNewPost" :click="newPostHandler"
      ><new-post @posted="updatePosts" />
    </newitem-modal>
    <div class="pt-8">
      <user-navbar class="hidden md:flex"></user-navbar>
      <div class="md:w-900 md:ml-500 mx-9 md:mt-28 mt-20">
        <div class="flex justify-between gap-10 w-full mb-11">
          <div class="flex gap-3 cursor-pointer md:text-base text-sm" @click="newPostHandler">
            <img src="../assets/images/new-quote.svg" class="w-5" alt="" />
            <h2 class="text-white w-fit">{{ $t('newsfeed.new_quote') }}</h2>
          </div>
          <search-bar @searched="searchPosts" class="md:flex hidden" />
        </div>
        <div class="w-80 md:w-fit" v-for="post in postData" :key="post.id">
          <user-post
            :userId="post.user.id"
            :username="post.user.name"
            :profilePicture="post.user.profile_picture"
            :movie="post.movie.title"
            :quote="post.quote"
            :year="post.movie.year"
            :thumbnail="post.thumbnail"
            :comment="post.comments"
            :numOfLikes="post.likes.length"
            :quoteID="post.id"
            :loggedInUser="loggedInUser"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import NewPost from '../Components/NewPost.vue'
import profileHeader from '../Components/profileHeader.vue'
import UserNavbar from '../Components/UserNavbar.vue'
import SearchBar from '../Components/SearchBar.vue'
import UserPost from '../Components/UserPost.vue'
import { usePostsStore } from '../stores/post'
import { onBeforeMount, ref } from 'vue'
import NewitemModal from '../Components/NewitemModal.vue'
import { useUsersStore } from '../stores/user'
import axios from '@/config/axios/index.js'
const userStore = useUsersStore()
const store = usePostsStore()
const postData = ref(store.posts)
const loggedInUser = ref([])
const showSearch = ref(false)
onBeforeMount(async () => {
  if (!userStore.authUser.length) {
    userStore.getAuthUser()
  }
  const response = await axios.get('/api/user')
  loggedInUser.value = response.data
  store.getPosts()
  postData.value = store.posts
})

const addNewPost = ref(false)
const newPostHandler = () => {
  addNewPost.value = !addNewPost.value
}
const updatePosts = async () => {
  store.clear()
  store.getPosts()
  addNewPost.value = !addNewPost.value
  postData.value = store.posts
}
const searchPosts = () => {
  postData.value = store.posts
}
</script>
