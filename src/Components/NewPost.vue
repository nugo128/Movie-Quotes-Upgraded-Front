<template>
  <div class="absolute top-8 flex left-8" @click="deleteQuote" v-if="type">
    <img src="../assets/images/delete.svg" class="w-5" alt="" />
    <h2 class="hidden md:block">delete</h2>
  </div>
  <div>
    <h2 class="text-center pt-8">
      {{
        type
          ? $t('movies.edit_quote')
          : movie
          ? $t('movies.add_quote')
          : $t('newsfeed.add_new_quote')
      }}
    </h2>
    <div class="w-full h-[1px] bg-[#EFEFEF33] mt-4 bg-opacity-20"></div>
  </div>
  <div class="flex flex-col gap-10 px-8 pb-20">
    <div class="flex gap-5 items-center">
      <img
        :src="userStore.getUrl(user?.profile_picture)"
        alt="user profile picture"
        class="md:w-15 md:h-15 w-10 h-10 rounded-full"
      />
      <h2>{{ user?.name }}</h2>
    </div>
    <div v-if="movie" class="flex gap-7">
      <img
        :src="userStore.getUrl(movie.thumbnail)"
        alt=""
        class="md:w-72 md:h-40 w-28 h-20 rounded-xl"
      />
      <div class="flex flex-col justify-between md:py-3">
        <h2 class="text-[#DDCCAA] md:text-lg text-sm order-1">
          {{ JSON.parse(movie.title)[localeStore.lang] }} (<span>{{ movie.year }}</span
          >)
        </h2>
        <div class="flex gap-4 flex-wrap order-3 md:order-2 text-sm md:text-lg">
          <h3
            class="bg-[#6C757D] w-max md:px-3 py-1 px-2 md:text-base text-xs rounded-md text-white"
            v-for="genre in movie.category"
            :key="genre.id"
          >
            {{
              genre?.category && localeStore?.lang
                ? JSON.parse(genre?.category)[localeStore?.lang]
                : ''
            }}
          </h3>
        </div>
        <h3 class="order-2 md:order-3">
          director: <span>{{ JSON.parse(movie.director)[localeStore.lang] }}</span>
        </h3>
      </div>
    </div>
    <Form @submit="submit" v-slot="{ meta }">
      <photo-upload
        v-if="movie && !quote"
        class="md:hidden"
        rule="required"
        :thumbnail="quote?.thumbnail"
      ></photo-upload>
      <text-area
        name="quote_en"
        :placeholder="quote ? JSON.parse(quote.title)['en'] : 'Start create new quote'"
        language="eng"
        :rule="!quote ? 'required|english' : 'english'"
      ></text-area>
      <text-area
        name="quote_ka"
        :placeholder="quote ? JSON.parse(quote.title)['ka'] : 'ახალი ციტატა'"
        language="ქარ"
        :rule="!quote ? 'required|georgian' : 'georgian'"
      ></text-area>
      <photo-upload
        v-if="movie && !quote"
        class="hidden md:block md:mb-10"
        rule="required"
        :thumbnail="quote?.thumbnail"
      ></photo-upload>

      <photo-upload v-if="!movie || quote" :thumbnail="quote?.thumbnail"></photo-upload>
      <h2 class="-mt-3 text-sm text-red-500">{{ errors }}</h2>
      <div v-if="!movie && !quote" class="flex pl-3 justify-between relative cursor-pointer my-6">
        <img src="@/assets/images/movieCamera.svg" class="absolute z-0 mt-4" alt="" />
        <img src="@/assets/images/arrow-down.svg" alt="" class="absolute right-6 top-8 w-5" />
        <Field
          id=""
          as="select"
          class="z-50 select w-full focus:appearance-none focus:outline-none text-white bg-transparent mt-2 py-5 px-12 mb-0 cursor-pointer"
          name="movie_id"
          :rules="!quote ? 'required' : ''"
        >
          <option class="bg-black mb-2" selected disabled value="">
            {{ $t('newsfeed.choose_movie') }}
          </option>
          <option
            class="bg-black px-0 w-10"
            v-for="movie in movieStore.movies"
            :value="movie.id"
            :key="movie.id"
          >
            {{ movie ? JSON.parse(movie.title)[localeStore.lang] : '' }}
          </option>
        </Field>
      </div>
      <ErrorMessage class="text-red-400 text-sm px-5 md:w-[400px]" name="movie_id" />
      <button
        class="w-full bg-[#E31221] py-3 rounded mb-1 md:text-xl text-lg"
        :class="{ ['pointer-events-none']: !meta.valid }"
        @click="submit"
      >
        {{
          type ? $t('movies.save_changes') : movie ? $t('movies.add_quote') : $t('newsfeed.post')
        }}
      </button>
    </Form>
  </div>
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import textArea from './textArea.vue'
import PhotoUpload from './PhotoUpload.vue'
import { useMovieStore } from '../stores/movie'
import { useUsersStore } from '../stores/user'
import { onBeforeMount, ref, defineEmits } from 'vue'
import { useLocaleStore } from '../stores/locale'
import { deleteQuotes, newPost, editQuote, getUser } from '../services/index'
import { useRouter } from 'vue-router'
const router = useRouter()
const errors = ref('')
const localeStore = useLocaleStore()
const emits = defineEmits(['posted', 'updated', 'deleted'])
const formData = new FormData()
const userStore = useUsersStore()
const props = defineProps({
  movie: {
    type: Object,
    required: false
  },
  quote: {
    type: Object,
    required: false
  },
  type: {
    type: Number,
    required: false
  }
})
const back = () => {
  router.replace({ path: '/movie-description', query: { id: props.type } })
}
const deleteQuote = async () => {
  await deleteQuotes(props.quote.id)
    .then(() => {
      emits('deleted', props.quote.id)
      back()
    })
    .catch((error) => {
      console.error(error)
    })
}
const submit = async (val) => {
  for (let value in val) {
    if (val[value]) {
      formData.set(value, val[value])
    }
  }
  errors.value = false
  if (!props.quote) {
    movieStore.addFile(val.image)
    if (props.movie) {
      formData.set('movie_id', props.movie.id)
    }
    formData.set('thumbnail', movieStore.file)
    await newPost(formData)
      .then((response) => {
        if (response) {
          errors.value = false
        }
      })
      .catch((err) => {
        err
          ? (errors.value = localeStore.lang === 'en' ? 'image is required' : 'ფოტო აუცილებელია')
          : ''
      })
    errors.value ? '' : emits('posted')
  } else {
    if (val.image) {
      movieStore.addFile(val.image)
      formData.set('thumbnail', movieStore.file)
    }
    formData.set('id', props.quote.id)
    const response = await editQuote(formData, props.quote.id)
    emits('updated', response.data)
  }
}
const movieStore = useMovieStore()

const user = ref(userStore.authUser[0])
onBeforeMount(async () => {
  if (!userStore.authUser.length) {
    userStore.getAuthUser()
  }
  if (!movieStore.movies.length) {
    movieStore.getMovie()
  }
  if (!user.value) {
    const response = await getUser()
    user.value = response.data
  }
  user.value = userStore.authUser[0]
})
</script>
<style scoped>
.select {
  border: 0;
  background: none;
  appearance: none;
  -webkit-appearance: none;
}
</style>
