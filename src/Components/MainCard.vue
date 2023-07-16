<template>
  <Suspense>
    <main
      :class="`box-border m-0 p-0 ${localeStore.lang === 'en' ? 'font-[FontEn]' : 'font-[FontKa]'}`"
    >
      <slot></slot>
    </main>
  </Suspense>
</template>

<script setup>
import { useLocaleStore } from '../stores/locale'
const localeStore = useLocaleStore()
</script>
