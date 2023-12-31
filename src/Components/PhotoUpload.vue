<template>
  <div
    class="flex justify-between md:justify-start items-center border md:pr-2 border-text-gray rounded py-5 mb-5 md:mb-7"
    :class="thumbnail ? 'border-0' : ''"
    @dragover.prevent=""
    @drop.prevent="dragPhoto"
  >
    <img v-if="placeholderValue" :src="picture" alt="" class="md:w-440 md:h-36 w-40 h-24 p-1" />
    <img
      v-if="thumbnail"
      :src="userStore.getUrl(picture)"
      alt=""
      class="md:w-900 md:h-[31.25rem] h-80 rounded-lg"
    />
    <div v-if="!placeholderValue" class="flex md:gap-2 justify-normal">
      <div v-if="!thumbnail" class="flex items-center gap-3 px-4 py-2 md:py-0 text-sm">
        <img src="../assets/images/camera.svg" class="w-5 md:w-6" alt="" />
        <p class="hidden md:block md:text-lg">
          {{ uploaded ? 'photo uploaded!' : 'Drag & drop your image here or' }}
        </p>
        <p class="block md:hidden">{{ uploaded ? 'photo uploaded!' : 'Upload image' }}</p>
      </div>
      <Field id="file" type="file" class="hidden" name="image" @input="changePhoto" />
      <label
        class="my-auto w-max rounded px-3 md:text-lg py-2 bg-[#9747FF66] cursor-pointer text-center md:ml-auto -ml-5 text-md"
        :class="
          thumbnail
            ? 'absolute md:right-96 left-40 bg-black bg-opacity-80 rounded-xl py-5 px-4'
            : 'md:relative absolute md:right-0 right-10 mt-1 md:mt-0'
        "
        for="file"
        ><img
          v-if="thumbnail"
          src="../assets/images/camera.svg"
          alt=""
          class="mx-auto w-5 md:w-6"
        />
        Choose file</label
      >
    </div>
    <div
      v-if="placeholderValue"
      class="flex flex-col gap-6 justify-between items-center mx-auto pr-2"
    >
      <h2 class="text-[#DDCCAA] text-xs md:text-md">REPLACE PHOTO</h2>
      <div class="md:flex items-center gap-3 hidden">
        <img src="../assets/images/camera.svg" alt="" />
        <p>Drag & drop your image here or</p>
      </div>
      <Field id="file" type="file" class="hidden" name="image" @input="changePhoto" />
      <label
        class="w-max rounded px-3 py-1 bg-[#9747FF66] cursor-pointer text-center ml-2 text-sm md:text-md"
        for="file"
        >{{ $t('movies.add_photo') }}</label
      >
    </div>
  </div>
</template>

<script setup>
import { Field } from 'vee-validate'
import { useMovieStore } from '@/stores/movieStore'
import { ref } from 'vue'
import { useUsersStore } from '@/stores/userStore'
const props = defineProps({
  placeholderValue: {
    type: String,
    required: false
  },
  thumbnail: {
    type: String,
    required: false
  }
})
const userStore = useUsersStore()
const picture = ref(props.placeholderValue || props.thumbnail)
const uploaded = ref(null)
const movieStore = useMovieStore()
const dragPhoto = (e) => {
  movieStore.addFile(e.dataTransfer.files[0])
  const file = e.dataTransfer.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    picture.value = e.target.result
  }
  if (file) {
    reader.readAsDataURL(file)
  }
  const inputField = document.getElementById('file')
  inputField.files = e.dataTransfer.files
  inputField.dispatchEvent(new Event('input'))
}
const changePhoto = (event) => {
  movieStore.addFile(event.target.files[0])
  const file = event.target.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    picture.value = e.target.result
    uploaded.value = true
  }
  if (file) {
    reader.readAsDataURL(file)
  }
}
</script>
