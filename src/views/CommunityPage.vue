<template>
    <div>
        <SideMenu :selectedBanner="'community'" :activeMenu="activeMenu" />
        <RouterView />
    </div>
</template>

<script setup>
    import SideMenu from '@/components/SideMenu.vue';


    import { RouterView, RouterLink } from 'vue-router';
    import { ref } from 'vue';
</script>

<style scoped>

</style>