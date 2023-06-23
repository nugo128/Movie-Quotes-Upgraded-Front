<template>
  <div>
    <h2 class="text-center pt-8">Add movie</h2>
    <div class="w-full h-[1px] bg-[#EFEFEF33] mt-4 bg-opacity-20"></div>
  </div>
  <div class="flex flex-col gap-6 px-8">
    <div class="flex gap-5 items-center">
      <img
        :src="store.getUrl(user[0]?.profile_picture)"
        alt="user profile picture"
        class="w-15 h-15 rounded-full"
      />
      <h2>{{ user[0]?.name }}</h2>
    </div>
    <Form class="flex flex-col gap-4" @submit="submit">
      <movie-input name="title_en" label="Movie name" lang="Eng"></movie-input>
      <movie-input name="title_ka" label="ფილმის სახელი" lang="ქარ"></movie-input>
      <div class="relative">
        <div
          class="dropdown-container p-2 border border-[#6C757D] cursor-pointer rounded"
          @click="toggleDropdown"
        >
          <span v-if="selectedItems.length === 0">Select an item</span>
          <span v-else>
            <span
              v-for="item in selectedItems"
              :key="item.id"
              class="inline-flex items-center space-x-2 px-2 py-1 bg-[#6C757D] text-white rounded mr-2 my-1"
            >
              {{ JSON.parse(item.category)[localeStore.lang] }}
              <button @click.stop="removeItem(item.id)" class="focus:outline-none">
                <svg
                  class="w-4 h-4 fill-current ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.59 15L12 13.41 7.41 17 6 15.59 10.59 11 6 6.41 7.41 5 12 9.59 16.59 5 18 6.41 13.41 11 18 15.59z"
                  />
                </svg>
              </button>
            </span>
          </span>
        </div>
        <ul
          v-if="isDropdownOpen"
          class="dropdown-menu absolute bg-white border border-gray-300 mt-2 py-2 rounded z-50"
        >
          <li
            v-for="item in categories"
            :key="item.id"
            @click="selectItems(item)"
            class="px-4 py-2 cursor-pointer hover:bg-gray-100 text-black"
          >
            {{ JSON.parse(item.category)[localeStore.lang] }}
          </li>
        </ul>
      </div>
      <movie-input name="year" label="Year/წელი"></movie-input>
      <movie-input name="director_en" label="Director" lang="Eng"></movie-input>
      <movie-input name="director_ka" label="რეჟისორი" lang="ქარ"></movie-input>
      <movie-textarea lang="Eng" name="description_en"></movie-textarea>
      <movie-textarea lang="ქარ" name="description_ka"></movie-textarea>
      <photo-upload></photo-upload>
      <button type="submit" class="bg-[#E31221] rounded py-2">ADD MOVIE</button>
    </Form>
  </div>
</template>

<script setup>
import { useUsersStore } from '../stores/user'
import { useMovieStore } from '../stores/movie'
import MovieInput from './MovieInput.vue'
import MovieTextarea from './MovieTextarea.vue'
import { ref, onBeforeMount, defineEmits } from 'vue'
import { useLocaleStore } from '../stores/locale'
import { Form } from 'vee-validate'
import PhotoUpload from './PhotoUpload.vue'
import axios from '@/config/axios/index.js'
const emits = defineEmits(['newMovie'])
const localeStore = useLocaleStore()
const movieStore = useMovieStore()
const store = useUsersStore()
const user = ref(store.authUser)
const categories = ref(movieStore.categories)

const selectedItems = ref([])
const isDropdownOpen = ref(false)
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}
const selectItems = (item) => {
  if (!selectedItems.value.some((selectedItem) => selectedItem.id === item.id)) {
    selectedItems.value.push(item)
  }
  toggleDropdown()
}
const removeItem = (id) => {
  selectedItems.value = selectedItems.value.filter((item) => item.id !== id)
}
const formData = new FormData()
const submit = async (val) => {
  for (let value in val) {
    formData.set(value, val[value])
  }
  movieStore.addFile(val.image)
  formData.set('thumbnail', movieStore.file)
  formData.append('categories', JSON.stringify(selectedItems.value))
  console.log(selectedItems.value)
  const response = await axios.post('/api/add-movie', formData)
  emits('newMovie', response)
}
onBeforeMount(async () => {
  if (!user.value.length) {
    store.getAuthUser()
    user.value = store.authUser
  }
  if (!movieStore.categories.length) {
    movieStore.getCategories()
  }
})
</script>
