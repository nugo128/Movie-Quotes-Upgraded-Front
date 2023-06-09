<template>
  <div class="bg-black h-max">
    <profile-header></profile-header>
    <div class="pt-8 flex">
      <user-navbar></user-navbar>
      <div class="w-[900px] ml-[140px]">
        <div class="flex justify-between gap-10 w-full mb-11">
          <div class="flex gap-3">
            <img src="../assets/images/new-quote.svg" class="w-5" alt="" />
            <h2 class="text-white w-[180px]">{{ $t('newsfeed.new_quote') }}</h2>
          </div>
          <search-bar />
        </div>
        <div v-for="post in postData">
          <user-post
            :username="post.user.name"
            :profilePicture="post.user.profile_picture"
            :movie="post.movie.title"
            :quote="post.quote"
            :year="post.movie.year"
            :thumbnail="post.thumbnail"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import profileHeader from '../Components/profileHeader.vue'
import UserNavbar from '../Components/UserNavbar.vue'
import SearchBar from '../Components/SearchBar.vue'
import UserPost from '../Components/UserPost.vue'
import { usePostsStore } from '../stores/post'
import { onBeforeMount, ref } from 'vue'
const store = usePostsStore()
const postData = ref(store.posts)
console.log(postData.value)
onBeforeMount(() => {
  store.getPosts()
})
</script>
