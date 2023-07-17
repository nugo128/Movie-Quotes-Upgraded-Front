import { defineRule } from 'vee-validate'
import { required, email, min, max, confirmed, image, numeric } from '@vee-validate/rules'

defineRule('email', email)
defineRule('required', required)
defineRule('confirmed', confirmed)
defineRule('min', min)
defineRule('max', max)
defineRule('num', numeric)
defineRule('image', image)
defineRule('lowercase_num', (value) => {
  const lowercaseCheck = /^[a-z0-9]+$/
  if (lowercaseCheck.test(value)) {
    return true
  } else {
    return false
  }
})
defineRule('english', (value) => {
  const englishCheck = /^$|[a-zA-Z0-9\s]+$/
  if (englishCheck.test(value)) {
    return true
  } else {
    return false
  }
})
defineRule('georgian', (value) => {
  const georgianRegex = /^$|^[ა-ჰ\s]*$/
  if (georgianRegex.test(value) || !value) {
    return true
  } else {
    return false
  }
})
