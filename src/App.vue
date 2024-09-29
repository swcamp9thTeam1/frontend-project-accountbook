<template>
    <AppHeader v-if="!$route.meta.hideHeader" />
  <main>
    <RouterView />
  </main>
  <AppFooter />
</template>

<script setup>
import { RouterView } from 'vue-router';

import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
</script>

<style>
* {
  font-family: 'Noto Sans KR';
}
</style>
