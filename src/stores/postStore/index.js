import { defineStore } from 'pinia'
import actions from './actions'
import getters from './getters'

export const usePostsStore = defineStore('post', {
  state: () => ({
    posts: []
  }),
  actions,
  getters
})
