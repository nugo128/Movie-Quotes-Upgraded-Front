import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/config/axios/index.js'
export const usePostsStore = defineStore('post', () => {
  const posts = ref([])

  const getPosts = async () => {
    await axios
      .get('/api/post')
      .then((response) => {
        posts.value.push(...response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const clear = () => {
    posts.value = []
  }
  const searchedPosts = (val) => {
    clear()
    posts.value.push(...val)
  }
  return { posts, getPosts, clear, searchedPosts }
})
