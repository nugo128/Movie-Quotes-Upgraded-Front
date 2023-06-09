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
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return { posts, getPosts }
})
