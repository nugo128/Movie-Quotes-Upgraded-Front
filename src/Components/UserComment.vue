<template>
  <div>
    <div class="flex items-center gap-6">
      <img
        :src="
          newPicture[0]?.profile_picture ? store.getUrl(newPicture[0]?.profile_picture) : picture
        "
        alt="profile"
        class="w-12 rounded-full"
      />
      <div>
        <h2 class="text-white">{{ commentAuthor }}</h2>
      </div>
    </div>
    <div class="ml-[74px]">
      <p class="text-white">
        {{ comment }}
      </p>
      <div class="w-full h-[1px] bg-[#EFEFEF4D] my-6"></div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { useUsersStore } from '../stores/user'
const props = defineProps({
  comment: {
    type: String,
    required: true
  },
  commentAuthor: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    required: true
  }
})
const store = useUsersStore()
const newPicture = ref(store.authUser)
const picture = ref(store.getUrl(props.profilePicture))
</script>
