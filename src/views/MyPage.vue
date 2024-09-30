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
    import { ref } from 'vue';
    import { RouterView } from 'vue-router';

    const activeMenu = ref('');
    
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: row;
        gap: 0 0 0 100px;
    }
</style>