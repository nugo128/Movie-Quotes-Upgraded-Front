<template>
  <div>
    <profile-header></profile-header>
    <newitem-modal v-if="addQuote" :click="newQuoteHandler"
      ><new-post
        @posted="updateQuotes"
        :movie="{
          id: description.id,
          title: description.title,
          year: description.year,
          thumbnail: description.thumbnail,
          director: description.director,
          category: description.category
        }"
      />
    </newitem-modal>
    <newitem-modal v-if="editMovie" :click="editMovieHandler">
      <new-movie @edit-movie="update" :description="description"></new-movie>
    </newitem-modal>
    <newitem-modal v-if="edit" :click="editQuote">
      <new-post
        @updated="updateQuotes"
        @deleted="deleteQuote"
        :quote="quoteDetails"
        :type="description.id"
      />
    </newitem-modal>
    <div class="px-9">
      <user-navbar class="md:block hidden"></user-navbar>
      <div class="md:pl-440 pt-28 md:pr-16 flex flex-col gap-8">
        <h2 class="text-white text-lg md:block hidden">Movie description</h2>
        <div class="flex flex-col md:flex-row gap-2">
          <img
            :src="userStore.getUrl(description.thumbnail)"
            class="md:w-[50rem] md:h-[25rem] rounded-xl w-[22.375rem] h-[18.875rem]"
            alt=""
          />
          <div class="md:w-600 pl-0 md:pl-4 flex flex-col gap-6">
            <div class="flex justify-between">
              <h2 class="text-[#DDCCAA] md:text-xl text-lg">
                {{
                  description.title && localeStore?.lang
                    ? JSON.parse(description?.title)[localeStore?.lang]
                    : ''
                }}
                <span>({{ description.year }})</span>
              </h2>
              <div class="hidden md:flex gap-4 bg-[#24222F] py-2 px-7 rounded-xl">
                <img
                  src="../assets/images/edit.svg"
                  class="w-5 h-5 cursor-pointer"
                  alt=""
                  @click="editMovieHandler"
                />
                <div class="h-full w-[1px] bg-[#EFEFEF33]"></div>
                <img
                  src="../assets/images/delete.svg"
                  class="w-5 h-5 cursor-pointer"
                  alt=""
                  @click="deleteMovie"
                />
              </div>
            </div>
            <div class="flex gap-4 flex-wrap">
              <h3
                class="bg-[#6C757D] w-max px-3 py-1 rounded-md text-sm md:text-base text-white"
                v-for="genre in description.category"
                :key="genre.id"
              >
                {{
                  genre?.category && localeStore?.lang
                    ? JSON.parse(genre?.category)[localeStore?.lang]
                    : ''
                }}
              </h3>
            </div>
            <div>
              <h2 class="text-[#CED4DA] text-sm md:text-base">
                {{ $t('movies.director') }}:
                <span class="text-white">
                  {{
                    description?.director && localeStore?.lang
                      ? JSON.parse(description?.director)[localeStore?.lang]
                      : ''
                  }}</span
                >
              </h2>
            </div>
            <p class="break-words text-[#CED4DA] text-sm md:text-base">
              {{
                description?.description && localeStore?.lang
                  ? JSON.parse(description?.description)[localeStore?.lang]
                  : ''
              }}
            </p>
          </div>
        </div>
        <div class="flex md:gap-4 gap-8 md:items-center md:flex-row flex-col-reverse items-start">
          <h2 class="hidden md:block text-white md:text-xl text-lg">
            Quotes (total <span>{{ description.quote?.length }}</span
            >)
          </h2>
          <h2 class="flex flex-col md:hidden text-white md:text-xl text-lg">
            <span>{{ $t('movies.all_quotes') }}</span>
            <span class="text-sm">({{ $t('movies.total') }} {{ description.quote?.length }})</span>
          </h2>
          <div class="md:h-7 md:w-px h-px w-full md:mb-0 mb-4 bg-[#EFEFEF33]"></div>
          <button
            @click="newQuoteHandler"
            class="py-2 px-4 bg-[#E31221] rounded-md flex gap-2 items-center text-sm md:text-base text-white"
          >
            <img src="../assets/images/plus.svg" alt="" />{{ $t('movies.add_quote') }}
          </button>
        </div>
        <div class="flex flex-col gap-10">
          <movie-quotes
            v-for="quote in description.quote"
            :key="quote.id"
            :quote="quote.quote"
            :thumbnail="quote.thumbnail"
            :likes="quote.like"
            :comment="quote.comment"
            :id="quote.id"
            :userId="quote?.user.id"
            @deleted="deleteQuote"
            @edit="editQuote"
          ></movie-quotes>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import profileHeader from '../Components/profileHeader.vue'
import UserNavbar from '../Components/UserNavbar.vue'
import MovieQuotes from '../Components/MovieQuotes.vue'
import NewitemModal from '../Components/NewitemModal.vue'
import NewMovie from '../Components/NewMovie.vue'
import NewPost from '../Components/NewPost.vue'
import { useUsersStore } from '../stores/user'
import axios from '@/config/axios/index.js'
import { useLocaleStore } from '../stores/locale'
import { useRoute, useRouter } from 'vue-router'
import { onBeforeMount, ref } from 'vue'
const editMovie = ref(false)
const edit = ref(false)
const quoteDetails = ref({})
const editQuote = (e) => {
  quoteDetails.value = e
  edit.value = !edit.value
}
const editMovieHandler = () => {
  editMovie.value = !editMovie.value
}
const localeStore = useLocaleStore()
const userStore = useUsersStore()
const route = useRoute()
const router = useRouter()
const description = ref({})
const addQuote = ref(false)
const newQuoteHandler = () => {
  addQuote.value = !addQuote.value
}
const update = (val) => {
  const quote = description.value.quote
  editMovie.value = false
  description.value = val.response.data
  description.value.category = val.category
  description.value.quote = quote
}
const deleteQuote = (id) => {
  edit.value = false
  let index = description.value.quote.find((quote) => quote.id == id)

  if (index) {
    let values = description.value.quote
    values.splice(values.indexOf(index), 1)
    description.value.quote = values
  }
}
const updateQuotes = async () => {
  const resp = await axios.get('/api/movie-description', {
    params: {
      id: route.query.id
    }
  })
  addQuote.value = false
  description.value = resp.data
  edit.value = false
}
const deleteMovie = async () => {
  await axios
    .delete(`/api/delete-movie/${route.query.id}`)
    .then((response) => {
      console.log(response.data)
      router.replace({ path: '/my-movies', query: { delete: route.query.id } })
    })
    .catch((error) => {
      console.error(error)
    })
}
onBeforeMount(async () => {
  const resp = await axios.get('/api/movie-description', {
    params: {
      id: route.query.id
    }
  })
  description.value = resp.data
})
</script>
