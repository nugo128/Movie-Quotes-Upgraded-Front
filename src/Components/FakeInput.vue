<template>
  <div class="flex flex-col gap-2">
    <label class="text-white">{{ name }}</label>
    <div class="flex items-center gap-8">
      <input
        :type="type"
        :value="value"
        class="text-black w-600 h-10 bg-[#CED4DA] p-4 rounded-md outline-none"
        disabled
      />
      <h2
        class="text-[#CED4DA] cursor-pointer"
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
import { useUsersStore } from '../stores/user'
defineProps({
  name: { type: String, required: true },
  type: { type: String, required: true },
  value: { type: String, required: false },
  edit: { type: Function, required: true }
})
const store = useUsersStore()
store.getAuthUser()
const user = ref(store.authUser)
</script>
