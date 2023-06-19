<template>
  <div
    class="flex justify-between md:justify-start items-center border border-[#6C757D] rounded px-3 py-3 mb-5"
    @dragover.prevent=""
    @drop.prevent="movieStore.addFile($event.dataTransfer.files[0])"
  >
    <div class="flex items-center gap-3">
      <img src="../assets/images/camera.svg" alt="" />
      <p>{{ movieStore.upload }}</p>
    </div>
    <Field
      id="file"
      type="file"
      class="hidden"
      name="image"
      @input="movieStore.addFile($event.target.files[0])"
    />
    <label class="rounded px-3 py-1 bg-[#9747FF66] cursor-pointer text-center ml-2" for="file"
      >choose file</label
    >
  </div>
</template>

<script setup>
import { Field } from 'vee-validate'
import { useMovieStore } from '../stores/movie'
const movieStore = useMovieStore()
</script>
