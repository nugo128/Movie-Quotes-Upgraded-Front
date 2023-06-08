<template>
  <div class="w-14 flex items-center justify-between relative">
    <select v-model="$i18n.locale" name="locale" @change="localeChangeHandler" class="z-50 w-14">
      <option class="text-black" value="en">Eng</option>
      <option class="text-black" value="ka">ქარ</option>
    </select>
    <img src="../assets/images/arrow-down.svg" alt="" class="absolute z-10 left-10" />
  </div>
</template>
<script setup>
import { setLocale } from '@vee-validate/i18n'
const localeChangeHandler = (event) => {
  localStorage.setItem('lang', event.target.value)
  setLocale(localStorage.getItem('lang'))
}
</script>
<style scoped>
select {
  color: white;
  border: 0;
  background: none;
  appearance: none;
  -webkit-appearance: none;
}
</style>
