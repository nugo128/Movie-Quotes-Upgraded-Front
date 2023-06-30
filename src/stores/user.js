import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/config/axios/index.js'
export const useUsersStore = defineStore('user', () => {
  const authUser = ref([])
  const clearUser = () => {
    authUser.value = []
  }
  const link = import.meta.env.VITE_IMAGE_BASE_URL
  const getAuthUser = async () => {
    await axios
      .get('/api/user')
      .then((response) => {
        authUser.value.push(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const getUrl = (url) => {
    if (url?.substring(0, 6) === 'images') {
      return link + url
    } else {
      return url
    }
  }
  return { authUser, getAuthUser, getUrl, clearUser }
})
