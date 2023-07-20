import { defineStore } from 'pinia'
import actions from './actions'

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    lang: localStorage.getItem('lang')
  }),
  actions
})
