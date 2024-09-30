<template>
    <div class="group-page-container">
        <!-- <SideMenu :selectedBanner="'group'" :activeMenu="activeMenu" />
        <SideMenu :selectedBanner="'groupManagement'" :activeMenu="activeMenu" /> -->
        <!-- 그룹 관련 SideMenu -->
        <SideMenu v-if="selectedBanner === 'group'" :selectedBanner="'group'" :activeMenu="activeMenu" />
        <SideMenu v-if="selectedBanner === 'groupManagement'" :selectedBanner="'groupManagement'" :activeMenu="activeMenu" />
        <RouterView />
    </div>
    
</template>

<script setup>
import SideMenu from '@/components/SideMenu.vue';
import { RouterView, useRoute } from 'vue-router';
import { ref, watchEffect } from 'vue';

const activeMenu = ref('');
const selectedBanner = ref('group'); // 기본적으로 'group' 설정
const route = useRoute();

watchEffect(() => {
  // 경로가 /group/posts 또는 /group/accbook 일 때 'groupManagement'로 변경
  if (route.path.startsWith('/group/posts') || route.path.startsWith('/group/accbook')) {
    selectedBanner.value = 'groupManagement';
  } else {
    selectedBanner.value = 'group'; // 그 외의 경로에서는 기본 'group' 설정
  }
});
</script>

<style scoped>
.group-page-container {
    display: flex;
}
</style>