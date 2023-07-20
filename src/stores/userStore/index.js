import { defineStore } from 'pinia'
import actions from './actions'
import getters from './getters'

export const useUsersStore = defineStore('users', {
  state: () => ({
    authUser: [],
    link: import.meta.env.VITE_IMAGE_BASE_URL
  }),
  actions,
  getters
})
