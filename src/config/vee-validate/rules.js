import { defineRule } from 'vee-validate'
import { required, email, min, max, confirmed } from '@vee-validate/rules'

defineRule('email', email)
defineRule('required', required)
defineRule('confirmed', confirmed)
defineRule('min', min)
defineRule('max', max)
defineRule('lowercase_num', (value) => {
  const lowercaseCheck = /^[a-z0-9]+$/
  if (lowercaseCheck.test(value)) {
    return true
  } else {
    return false
  }
})
