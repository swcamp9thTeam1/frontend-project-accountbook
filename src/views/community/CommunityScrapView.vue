
<!-- 자식 테이블 3 - 나의 스크랩 -->

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