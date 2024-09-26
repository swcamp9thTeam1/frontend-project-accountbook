<template>
    <div>
        <SideMenu :selectedBanner="'community'" :activeMenu="activeMenu" />
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import SideMenu from '@/components/SideMenu.vue';
</script>

<style scoped>

</style>