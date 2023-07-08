<template>
  <div class="bg-[#0D0B14] h-max">
    <profile-header v-if="!showSearch">
      <search-bar @searched="searchPosts" @click="toggleSearch" />
    </profile-header>
    <newitem-modal v-if="addNewPost" :click="newPostHandler"
      ><new-post @posted="updatePosts" />
    </newitem-modal>
    //search-bar gamoiyene ase ar gamodis mgoni:D
    <div v-if="showSearch" class="md:hidden fixed w-full h-5/6 bg-black z-[999]">
      <div class="flex gap-8 px-8 py-6">
        <img src="../assets/images/back.svg" alt="" @click="toggleSearch" />
        <Form class="w-full">
          <Field name="search" v-slot="{ field }">
            <input
              id="search"
              v-bind="field"
              class="bg-black placeholder-white text-white outline-none"
              type="text"
              @input="submit"
              placeholder="Search"
            />
          </Field>
        </Form>
      </div>
      <div class="h-[0.5px] w-full bg-[#EFEFEF4D]"></div>

      <div class="flex flex-col gap-5 mt-6 ml-20">
        <p>Enter @ to search movies</p>
        <p>Enter # to search quotes</p>
      </div>
    </div>
    <div class="pt-8">
      <user-navbar class="hidden md:flex"></user-navbar>
      <div class="md:w-900 md:ml-500 mx-9 md:mt-28 mt-20">
        <div class="flex justify-between gap-10 w-full mb-11">
          <div class="flex gap-3 cursor-pointer md:text-base text-sm" @click="newPostHandler">
            <img src="../assets/images/new-quote.svg" class="w-5" alt="" />
            <h2 class="text-white w-[11.25rem]">{{ $t('newsfeed.new_quote') }}</h2>
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
import { Form, Field } from 'vee-validate'
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
import { useMovieStore } from '../stores/movie.js'
const movieStore = useMovieStore()
const userStore = useUsersStore()
const store = usePostsStore()
const postData = ref(store.posts)
const loggedInUser = ref([])
const showSearch = ref(false)
const toggleSearch = () => {
  showSearch.value = !showSearch.value
}
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
const submit = async (e) => {
  if (e.target.value.length > 0) {
    if (!postData.value.length) {
      const resp = await axios.get('/api/search-post', {
        params: {
          search: e.target.value
        }
      })
      store.searchedPosts(resp.data)
    } else {
      const resp = await axios.get('/api/search-movie', {
        params: {
          search: e.target.value
        }
      })
      movieStore.searchedMovies(resp.data)
      postData.value = store.posts
    }
  } else {
    if (!postData.value.length) {
      store.getPosts()
    } else {
      postData.value = store.posts
    }
  }
}
</script>
