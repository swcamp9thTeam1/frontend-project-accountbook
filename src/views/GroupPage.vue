<template>
    <div>
        <SideMenu :menus="menus" />
        <RouterView />
    </div>
</template>

<script setup>
import SideMenu from '@/components/SideMenu.vue';
import { RouterView } from 'vue-router';
import { ref } from 'vue';

const menus = ref([{id: 1, path: "/group/nested", name: "그룹 검색"}]);

</script>

<style scoped>

</style>