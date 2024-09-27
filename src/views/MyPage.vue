<template>
    <div class="container">
        <div>
            <SideMenu :selectedBanner="'my'" :activeMenu="activeMenu" />
        </div>
        <div>
            <RouterView/>
        </div>
    </div>
</template>

<script setup>
    import SideMenu from '@/components/SideMenu.vue';
    import { RouterView } from 'vue-router';
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: row;
    }
</style>