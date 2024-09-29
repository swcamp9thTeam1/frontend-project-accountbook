<template>
    <AppHeader v-if="!$route.meta.hideHeader" />
  <main>
    <RouterView />
  </main>
  <AppFooter />

  <!-- Success Message 모달 (전역에서 사용 가능) -->
  <SuccessMessageModal />
</template>

<script setup>
import { RouterView } from 'vue-router';

import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import SuccessMessageModal from '@/components/modal/SuccessMessageModal.vue';
</script>

<style>
* {
  font-family: 'Noto Sans KR';
}
</style>
