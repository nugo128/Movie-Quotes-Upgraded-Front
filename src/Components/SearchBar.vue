<template>
  <div class="relative">
    <div class="flex gap-4">
      <div @click="appearSearch" class="flex gap-4 cursor-pointer">
        <img src="../assets/images/search.svg" alt="" />
        <h2 class="text-white" v-if="!search">{{ $t('newsfeed.search') }}</h2>
      </div>

      <Form v-if="search">
        <Field name="search" v-slot="{ field, errors, value }">
          <input
            id="search"
            v-bind="field"
            class="w-[550px] bg-black placeholder-white text-white outline-none"
            type="text"
            :placeholder="$t('newsfeed.search_placeholder')"
          />
        </Field>
      </Form>
    </div>
    <div class="h-[0.5px] w-full bg-[#EFEFEF4D] mt-2 absolute" v-if="search"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Form, Field } from 'vee-validate'
const search = ref(false)
const appearSearch = () => {
  search.value = !search.value
}
</script>
