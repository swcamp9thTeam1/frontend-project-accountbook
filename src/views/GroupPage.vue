<template>
    <div class="group-page-container">
        <SideMenu :selectedBanner="'group'" :activeMenu="activeMenu" />
        <RouterView />
    </div>
    
</template>

<script setup>
import SideMenu from '@/components/SideMenu.vue';
import { RouterView, RouterLink } from 'vue-router';
import { ref } from 'vue';

// const selectedBanner = ref('group');
const activeMenu = ref('');
</script>

<style scoped>
.group-page-container {
    display: flex;
}
</style>