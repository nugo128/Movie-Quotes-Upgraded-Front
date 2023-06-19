import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/config/axios/index.js'
export const useUsersStore = defineStore('user', () => {
  const authUser = ref([])

  const getAuthUser = async () => {
    await axios
      .get('/api/user')
      .then((response) => {
        authUser.value.push(response.data)
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return { authUser, getAuthUser }
})
