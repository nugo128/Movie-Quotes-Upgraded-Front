import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useLocaleStore = defineStore('locale', () => {
  const lang = ref(localStorage.getItem('lang'))

  const getLocale = (locale) => {
    lang.value = locale
  }
  return { lang, getLocale }
})