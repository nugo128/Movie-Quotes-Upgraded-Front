<template>
  <main
    :class="`box-border m-0 p-0 ${this.$i18n.locale === 'en' ? 'font-[FontEn]' : 'font-[FontKa]'}`"
  >
    <slot></slot>
  </main>
</template>
