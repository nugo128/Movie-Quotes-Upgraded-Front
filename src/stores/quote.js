import { ref } from 'vue'
import { defineStore } from 'pinia'
import { viewQuote } from '../services/index'
export const useQuoteStore = defineStore('quote', () => {
  const quote = ref({})

  const getQuote = async (id) => {
    const response = await viewQuote(id)
    quote.value = response.data
  }
  return { quote, getQuote }
})
