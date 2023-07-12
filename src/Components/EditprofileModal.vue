<template>
  <div class="md:hidden absolute h-full bg-black left-0 top-32 w-screen z-[998]">
    <div v-if="youSure" class="w-full h-full flex justify-center z-[999] -mt-40">
      <div
        class="relative bg-[#11101A] h-max z-[999] flex flex-col md:justify-center justify-start text-white gap-6 mt-32 rounded-lg"
      >
        <div class="pt-10 pb-4 flex flex-col gap-6">
          <h2 class="px-12 text-sm">are you sure to make changes?</h2>
          <div class="w-full h-px bg-[#CED4DA33] mt-5"></div>
          <div class="text-white flex justify-between px-8 text-xs">
            <button type="button" class="px-4 py-2 cursor-pointer text-[#CED4DA]" @click="cancel">
              {{ $t('profile.cancel') }}
            </button>
            <button
              class="bg-[#E31221] px-4 py-2 rounded cursor-pointer"
              :class="!valid && 'pointer-events-none'"
              @click="submit"
            >
              confirm
            </button>
          </div>
        </div>
      </div>
      <div class="bg-black bg-opacity-50 absolute w-full h-full" @click="edit"></div>
    </div>
    <slot v-if="!youSure"></slot>
    <div v-if="!youSure" class="text-white ml-auto mt-16 flex justify-between px-8 text-xs">
      <button type="button" class="px-4 py-2 cursor-pointer text-[#CED4DA]" @click="cancel">
        {{ $t('profile.cancel') }}
      </button>
      <div
        class="bg-[#E31221] px-4 py-2 rounded cursor-pointer"
        :class="!valid && 'pointer-events-none'"
        @click="edit"
      >
        edit
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const youSure = ref(false)
const edit = () => {
  youSure.value = !youSure.value
}
defineProps({
  cancel: {
    type: Function,
    required: true
  },
  valid: {
    type: Boolean,
    required: true
  },
  submit: {
    type: Function,
    required: true
  }
})
</script>
