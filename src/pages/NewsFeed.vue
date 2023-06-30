<template>
  <div class="bg-[#0D0B14] h-max">
    <profile-header></profile-header>
    <newitem-modal v-if="addNewPost" :click="newPostHandler"
      ><new-post @posted="updatePosts" />
    </newitem-modal>
    <div class="pt-8">
      <user-navbar></user-navbar>
      <div class="w-900 ml-500 mt-28">
        <div class="flex justify-between gap-10 w-full mb-11">
          <div class="flex gap-3 cursor-pointer" @click="newPostHandler">
            <img src="../assets/images/new-quote.svg" class="w-5" alt="" />
            <h2 class="text-white w-[180px]">{{ $t('newsfeed.new_quote') }}</h2>
          </div>
          <search-bar @searched="searchPosts" />
        </div>
        <div v-for="post in postData" :key="post.id">
          <user-post
            :userId="loggedInUser.id"
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
import axios from '@/config/axios/index.js'
const store = usePostsStore()
const postData = ref(store.posts)
const loggedInUser = ref([])
onBeforeMount(async () => {
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
