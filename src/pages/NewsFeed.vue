<template>
  <div class="bg-[#0D0B14] h-max">
    <profile-header v-if="!showSearch">
      <search-bar @searched="searchPosts" />
    </profile-header>
    <newitem-modal v-if="addNewPost || route.query.newPost" :click="newPostHandler"
      ><new-post @posted="updatePosts" />
    </newitem-modal>
    <div class="py-8 min-h-screen">
      <user-navbar class="hidden md:flex"></user-navbar>
      <div class="md:w-900 md:ml-500 mx-7 md:mt-28 mt-20">
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
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import NewPost from '@/Components/NewPost.vue'
import profileHeader from '@/Components/profileHeader.vue'
import UserNavbar from '@/Components/UserNavbar.vue'
import SearchBar from '@/Components/SearchBar.vue'
import UserPost from '@/Components/UserPost.vue'
import { usePostsStore } from '@/stores/postStore'
import { onBeforeMount, ref } from 'vue'
import NewitemModal from '@/Components/NewitemModal.vue'
import { useUsersStore } from '@/stores/userStore'
import { useRoute, useRouter } from 'vue-router'
import { getPosts } from '@/services/index'
import { getUser } from '../services'
const route = useRoute()
const router = useRouter()
const userStore = useUsersStore()
const store = usePostsStore()
const postData = ref(store.posts)
const showSearch = ref(false)
onBeforeMount(async () => {
  if (!userStore.authUser.length) {
    userStore.getAuthUser()
    const response = await getUser()
    userStore.setUser(response.data)
  }

  const response = await getPosts()
  postData.value = response.data
})

const addNewPost = ref(route.query.newPost)
const newPostHandler = () => {
  addNewPost.value
    ? router.replace({ name: 'news_feed' })
    : router.replace({ name: 'news_feed', query: { newPost: true } })
  addNewPost.value = !addNewPost.value
}
const updatePosts = async () => {
  store.clear()
  store.getPosts
  addNewPost.value = !addNewPost.value
  router.replace({ name: 'news_feed' })
  postData.value = store.posts
  if (!store.posts.length) {
    const response = await getPosts()
    postData.value = response.data
  }
}
const searchPosts = (event = false) => {
  if (!store.posts.length && event) {
    store.getPosts
  }
  postData.value = store.posts
}
</script>
