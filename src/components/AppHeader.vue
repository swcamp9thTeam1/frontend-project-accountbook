<template>
    <header>
        <nav class="app">
            <RouterLink to="/" class="b">
                    <img src="/src/assets/icons/logo.svg" alt="Save Pig">
                    <span>Save Pig</span>
            </RouterLink>

            <div class="banner">
                <RouterLink to="/account-book" class="banner-link" active-class="active">내 가계부</RouterLink>
                <RouterLink to="/save-map" class="banner-link" active-class="active">절약지도</RouterLink>
                <RouterLink 
                    to="/community" 
                    class="banner-link" 
                    :class="{ active: selectedBanner === 'community' }"
                    @click="selectBanner('community')">
                    커뮤니티
                </RouterLink>
                <RouterLink 
                    to="/group" 
                    class="banner-link" 
                    :class="{ active: selectedBanner === 'group' }"
                    @click="selectBanner('group')">
                    그룹
                </RouterLink>
            </div>
        </nav>        

        <div v-if="user">
            <RouterLink to="/my">
                <button type="button">마이페이지</button>
            </RouterLink>
        </div>
    </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import SideMenu from './SideMenu.vue'; 

const user = ref("");   // 이거로 유저 있는지 없는지 컨트롤
const selectedBanner = ref(''); 

const selectBanner = (banner) => {
  selectedBanner.value = banner;
};


const isAccountBook = computed(() => route.path.startsWith('/account-book/*'));
const isSaveMap = computed(() => route.path.startsWith('/save-map/*'));
const isCommunity = computed(() => route.path.startsWith('/community/*'));
const isGroup = computed(() => route.path.startsWith('/group/*'));
</script>

<style scoped>

    .app {
        display: flex;
        align-items: center;
        margin-top: 30px;
        width: 100vw;
    }

    .app .b {
        display: flex;
        align-items: center;
    }

    .app .b img{
        display: flex;
        width: 60px;
        margin-left: 80px;
    }

    .app .b span{
        font-size: 2vw;
        margin-left: 8%;
        font-weight: 800;
        color: #25272F;
        white-space: nowrap;
    }

    .app .banner {
        display: flex;
        align-items: center; 
        flex-grow: 1; 
        margin-left: 10%; 
        gap: 10%;
    }

    .app .banner .banner-link {
        font-size: 1.2vw;
        font-weight: 300;   
        color:black;
    } 
    .app .banner .banner-link.active {
        font-weight: bold; /*현재 로그인 안 해도 bold처리 가능*/
    } 

    .app a {
        text-decoration: none;
    }




</style>