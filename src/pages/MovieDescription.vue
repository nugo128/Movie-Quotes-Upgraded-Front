<template>
  <div>
    <profile-header></profile-header>

    <div>
      <user-navbar></user-navbar>
      <div class="pl-440 pt-28 pr-16 flex flex-col gap-8">
        <h2 class="text-white text-lg">Movie description</h2>
        <div class="flex gap-2">
          <img
            :src="userStore.getUrl(description.thumbnail)"
            class="w-[800px] h-[400px] rounded-xl"
            alt=""
          />
          <div class="w-600 pl-4 flex flex-col gap-6">
            <div class="flex justify-between">
              <h2 class="text-[#DDCCAA] text-xl">
                {{
                  description.title && localeStore?.lang
                    ? JSON.parse(description?.title)[localeStore?.lang]
                    : ''
                }}
                <span>{{ description.year }}</span>
              </h2>
              <div class="flex gap-4 bg-[#24222F] py-2 px-7 rounded-xl">
                <img src="../assets/images/edit.svg" class="w-5 h-5 cursor-pointer" alt="" />
                <div class="h-full w-[1px] bg-[#EFEFEF33]"></div>
                <img src="../assets/images/delete.svg" class="w-5 h-5 cursor-pointer" alt="" />
              </div>
            </div>
            <div class="flex gap-4 flex-wrap">
              <h3
                class="bg-[#6C757D] w-max px-3 py-1 rounded-md text-white"
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
              <h2 class="text-[#CED4DA]">
                Director:
                <span class="text-white">
                  {{
                    description?.director && localeStore?.lang
                      ? JSON.parse(description?.director)[localeStore?.lang]
                      : ''
                  }}</span
                >
              </h2>
            </div>
            <p>
              {{
                description?.description && localeStore?.lang
                  ? JSON.parse(description?.description)[localeStore?.lang]
                  : ''
              }}
            </p>
          </div>
        </div>
        <div class="flex gap-4 items-center">
          <h2 class="text-white text-xl">
            Quotes (total <span>{{ description.quote?.length }}</span
            >)
          </h2>
          <div class="h-7 w-[1px] bg-[#EFEFEF33]"></div>
          <button
            @click="newMovieHandler"
            class="py-2 px-4 bg-[#E31221] rounded-lg flex gap-2 items-center"
          >
            <img src="../assets/images/plus.svg" alt="" />Add quote
          </button>
        </div>
        <div class="flex flex-col gap-10">
          <movie-quotes
            v-for="quote in description.quote"
            :key="quote.id"
            :quote="quote.quote"
            :thumbnail="quote.thumbnail"
            :like="quote.like"
            :comment="quote.comment"
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
import { useUsersStore } from '../stores/user'
import axios from '@/config/axios/index.js'
import { useLocaleStore } from '../stores/locale'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { onBeforeMount } from 'vue'
const localeStore = useLocaleStore()
const userStore = useUsersStore()
const route = useRoute()
const description = ref({})
onBeforeMount(async () => {
  console.log(route.query.id)
  const resp = await axios.get('/api/movie-description', {
    params: {
      id: route.query.id
    }
  })
  description.value = resp.data
  console.log(resp)
})
</script>
