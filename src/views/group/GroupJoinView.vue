<template>
    <div>
        <SideMenu :selectedBanner="'group'" :activeMenu="activeMenu" />
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import SideMenu from '@/components/SideMenu.vue';
    
    const activeMenu = ref('그룹 가입');
</script>

<style scoped>

</style>