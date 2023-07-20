import { defineStore } from 'pinia'
import actions from './actions'

export const useQuoteStore = defineStore('quotes', {
  state: () => ({
    quote: {}
  }),
  actions
})
