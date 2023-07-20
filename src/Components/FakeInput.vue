<template>
  <div class="flex flex-col gap-2">
    <label class="text-white md:text-base text-sm">{{ name }}</label>
    <div class="flex items-center gap-8 relative">
      <input
        :type="type"
        :value="value"
        class="md:text-black w-600 h-10 md:bg-[#CED4DA] bg-transparent p-4 text-light-gray md:rounded-md border-b-[1px] md:border-none rounded-none outline-none px-0 md:px-4 text-sm"
        disabled
      />
      <h2
        class="text-light-gray cursor-pointer absolute md:static right-0"
        @click="edit"
        v-if="name === 'Username' || name === 'სახელი' || !user[0]?.gauth_id"
      >
        {{ $t('profile.edit') }}
      </h2>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useUsersStore } from '../stores/userStore'
defineProps({
  name: { type: String, required: true },
  type: { type: String, required: true },
  value: { type: String, required: false },
  edit: { type: Function, required: true }
})
const store = useUsersStore()
store.getAuthUser
const user = ref(store.authUser)
</script>
