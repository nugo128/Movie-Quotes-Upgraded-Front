import { configure } from 'vee-validate'
import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import ka from '@vee-validate/i18n/dist/locale/ka.json'

configure({
  generateMessage: localize({
    en: {
      messages: {
        ...en.messages,
        required: 'This field is required',
        email: 'This input is not in email format',
        min: '{field} must have at least 0:{min} symbols',
        confirmed: 'passwords do not match',
        lowercase_num: '{field} must only have lowercase letters and numbers'
      },
      names: {}
    },
    ka: {
      messages: {
        ...ka.messages,
        required: 'გთხოვთ შეავსოთ მოცემული ველი',
        email: 'თქვენს მიერ შეყვანილი ტექსტი არ აკმაყოფილებს მეილის ფორმატს',
        min: '{field} უნდა შეიცავდეს მინიმუმ 0:{min} სიმბოლოს',
        confirmed: 'პაროლები არ ემთხვევა',
        lowercase_num:
          '{field} უნდა შეიცავდეს მხოლოდ დაბალი რეგისტრის ლათინურ სიმბოლოებს და რიცხვებს'
      },
      names: {
        name: 'სახელი',
        email: 'იმეილი',
        password: 'პაროლი',
        confirmation: 'პაროლის დადასტურება'
      }
    }
  })
})
