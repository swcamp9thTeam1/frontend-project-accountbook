
<!-- 부모 페이지 -->

<template>
    <div style="display: flex;">
        <div>
            <SideMenu :selectedBanner="'community'" :activeMenu="activeMenu" />
        </div>
        <div>
            <RouterView />
        </div>
    </div>
</template>

<script setup>
    import SideMenu from '@/components/SideMenu.vue';
    import CommunityScrapView from '@/views/community/CommunityScrapView.vue';
    import CommunityMyView from '@/views/community/CommunityMyView.vue';
    import CommunityFreeBoardView from './community/CommunityFreeBoardView.vue';

    import { RouterView, RouterLink } from 'vue-router';
    import { ref } from 'vue';
</script>

<style scoped>

</style>