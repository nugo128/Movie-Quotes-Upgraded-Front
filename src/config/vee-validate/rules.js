import { defineRule } from 'vee-validate'

defineRule('required', (value) => {
  if (!value || !value.length) {
    return 'ეს ველი სავალდებულოა'
  }
  return true
})
