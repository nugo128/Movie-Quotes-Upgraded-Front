<template>
  <div class="locale-changer">
    <select v-model="$i18n.locale" name="locale" @change="localeChangeHandler">
      <option class="text-black" value="en">Eng</option>
      <option class="text-black" value="ka">ქარ</option>
    </select>
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
  width: 200px;
  font-size: 26px;
}
</style>
