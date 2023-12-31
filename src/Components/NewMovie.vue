<template>
  <div>
    <h2 class="text-center pt-8">
      {{ description ? $t('movies.edit_movie') : $t('movies.add_movie') }}
    </h2>
    <div class="w-full h-[1px] bg-medium-gray mt-4 bg-opacity-20"></div>
  </div>
  <div class="flex flex-col gap-6 px-8 pb-10">
    <div class="flex gap-5 items-center">
      <img
        :src="store.getUrl(user[0]?.profile_picture)"
        alt="user profile picture"
        class="w-15 h-15 rounded-full"
      />
      <h2>{{ user[0]?.name }}</h2>
    </div>
    <Form class="flex flex-col gap-4" @submit="submit">
      <movie-input
        name="title_en"
        label="Movie name"
        rule="english"
        lang="Eng"
        :placeholderValue="description?.title ? JSON.parse(description?.title)['en'] : ''"
      ></movie-input>
      <movie-input
        name="title_ka"
        label="ფილმის სახელი"
        rule="georgian"
        lang="ქარ"
        :placeholderValue="description?.title ? JSON.parse(description.title)['ka'] : ''"
      ></movie-input>
      <div class="relative">
        <div
          class="dropdown-container p-2 border border-text-gray cursor-pointer rounded"
          @click="toggleDropdown"
        >
          <span v-if="selectedItems.length === 0" class="pl-2">{{ $t('movies.genres') }}</span>
          <span v-else>
            <span
              v-for="item in selectedItems"
              :key="item.id"
              class="inline-flex items-center space-x-2 px-2 py-1 bg-text-gray text-white rounded mr-2 my-1"
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
          class="dropdown-menu absolute text-white bg-black border border-gray-300 mt-2 py-2 w-full rounded z-50"
        >
          <li
            v-for="item in categories"
            :key="item.id"
            @click="selectItems(item)"
            class="px-4 py-2 cursor-pointer hover:bg-gray-500"
          >
            {{ item?.category ? JSON.parse(item?.category)[localeStore.lang] : '' }}
          </li>
        </ul>
      </div>
      <h2 v-if="categoriesError" class="text-sm -mt-2 text-red-500">{{ categoriesError }}</h2>
      <movie-input
        name="year"
        label="Year/წელი"
        rule="num"
        :placeholderValue="description?.year ? description?.year : ''"
      ></movie-input>
      <movie-input
        name="director_en"
        rule="english"
        label="Director"
        lang="Eng"
        :placeholderValue="description?.director ? JSON.parse(description?.director)['en'] : ''"
      ></movie-input>
      <movie-input
        name="director_ka"
        rule="georgian"
        label="რეჟისორი"
        lang="ქარ"
        :placeholderValue="description?.director ? JSON.parse(description?.director)['ka'] : ''"
      ></movie-input>
      <movie-textarea
        lang="Eng"
        rule="english"
        name="description_en"
        :placeholderValue="
          description?.description ? JSON.parse(description?.description)['en'] : ''
        "
      ></movie-textarea>
      <movie-textarea
        lang="ქარ"
        rule="georgian"
        name="description_ka"
        :placeholderValue="
          description?.description ? JSON.parse(description?.description)['ka'] : ''
        "
      ></movie-textarea>
      <photo-upload :placeholderValue="store.getUrl(description?.thumbnail)"></photo-upload>
      <h2 v-if="imageError" class="text-sm -mt-6 text-red-500">{{ imageError }}</h2>
      <button type="submit" class="bg-light-red rounded py-2">
        {{ description ? $t('movies.edit_movie') : $t('movies.add_movie') }}
      </button>
    </Form>
  </div>
</template>

<script setup>
import { useUsersStore } from '@/stores/userStore'
import { useMovieStore } from '@/stores/movieStore'
import MovieInput from './MovieInput.vue'
import MovieTextarea from './MovieTextarea.vue'
import { ref, onBeforeMount, defineEmits } from 'vue'
import { useLocaleStore } from '@/stores/localeStore'
import { Form } from 'vee-validate'
import { addMovie, editMovie } from '@/services/index'
import PhotoUpload from './PhotoUpload.vue'
const emits = defineEmits(['newMovie', 'editMovie'])
const localeStore = useLocaleStore()
const movieStore = useMovieStore()
const store = useUsersStore()
const categoriesError = ref('')
const imageError = ref('')
const user = ref(store.authUser)
const categories = ref(movieStore.categories)
const props = defineProps({
  description: {
    type: Object,
    required: false
  }
})
const selectedItems = ref([])
const isDropdownOpen = ref(false)
const toggleDropdown = () => {
  categories.value = movieStore.categories
  isDropdownOpen.value = !isDropdownOpen.value
}
const selectItems = (item) => {
  if (!selectedItems.value.some((selectedItem) => selectedItem.id === item.id)) {
    selectedItems.value = [...selectedItems.value, item]
  }
  toggleDropdown()
  categoriesError.value = ''
}
const removeItem = (id) => {
  selectedItems.value = selectedItems.value.filter((item) => item.id !== id)
}
const formData = new FormData()
const submit = async (val) => {
  for (let value in val) {
    if (val[value]) {
      formData.set(value, val[value])
    }
  }
  formData.append('categories', JSON.stringify(selectedItems.value))
  if (!props.description) {
    if (selectedItems.value.length) {
      movieStore.addFile(val.image)
      formData.set('thumbnail', movieStore.file)

      await addMovie(formData)
        .then((response) => {
          emits('newMovie', response)
        })
        .catch((err) => (imageError.value = err.response.data.message))
    } else {
      categoriesError.value =
        localeStore.lang === 'en'
          ? 'Please choose at least one genre'
          : 'გთხოვთ აირჩიოთ მინიმუმ 1 ჟანრი'
    }
  } else {
    formData.set('id', props.description.id)
    const response = await editMovie(formData, props.description.id)
    emits('editMovie', {
      response: response,
      category: selectedItems.value
    })
  }
}

onBeforeMount(async () => {
  if (!user.value.length) {
    store.getAuthUser()
    user.value = store.authUser
  }
  if (!movieStore.categories.length) {
    movieStore.getCategories
  }
  if (props?.description?.category) {
    selectedItems.value = props?.description?.category
  }
})
</script>
