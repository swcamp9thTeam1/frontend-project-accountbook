
<!-- 부모 페이지 -->

<template>
    <div style="display: flex; width: 100%;">
        <div>
            <SideMenu :selectedBanner="'community'" :activeMenu="activeMenu" />
        </div>
        <div style="display: flex; flex-direction: column; margin-left: -110px;
; margin-top: 50px;">
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
    const activeMenu = ref('');
</script>

<style scoped>

</style>