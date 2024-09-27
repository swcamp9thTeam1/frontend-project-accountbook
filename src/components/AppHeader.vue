<template>
    <header>
        <nav class="top-banner">
            <!-- <div class="mypage-banner" v-if="login"> -->
            <div class="mypage-banner" v-if="isLoggedIn">
                <RouterLink to="my" @click=handleMyPageClick>
                    <button class="mypage-btn">마이페이지</button>
                </RouterLink>

                <RouterLink to="/" @click=logout>
                    <button class="logout-btn">로그아웃</button>
                </RouterLink>
            </div>
        </nav>

        <nav class="app">
            <RouterLink to="/" class="b" @click=handleLogoClick>
                    <img src="/src/assets/icons/logo.svg" alt="Save Pig">
                    <span>Save Pig</span>
            </RouterLink>

            <div class="banner">
                <RouterLink to="/account-book" class="banner-link" active-class="active" @click=handleNavigation>내 가계부</RouterLink>
                <RouterLink to="/save-map" class="banner-link" active-class="active" @click=handleNavigation>절약지도</RouterLink>
                <RouterLink 
                    to="/community" 
                    class="banner-link" 
                    :class="{ active: selectedBanner === 'community' }"
                    @click="handleNavigation('community')"
                    >
                    커뮤니티
                </RouterLink>
                <RouterLink 
                    to="/group" 
                    class="banner-link" 
                    :class="{ active: selectedBanner === 'group' }"
                    @click="handleNavigation('group')">
                    그룹
                </RouterLink>
            </div>
        </nav>        

        <!-- <div v-if="user">
            <RouterLink to="/my">
                <button type="button">마이페이지</button>
            </RouterLink>
        </div> -->

    </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuth } from './useAuth'; 
import SideMenu from './SideMenu.vue'; 


// const isAccountBook = computed(() => route.path.startsWith('/account-book/*'));
// const isSaveMap = computed(() => route.path.startsWith('/save-map/*'));
// const isCommunity = computed(() => route.path.startsWith('/community/*'));
// const isGroup = computed(() => route.path.startsWith('/group/*'));


const {isLoggedIn, logout} = useAuth();
const selectedBanner = ref(''); 
const router = useRouter();

const selectBanner = (banner) => {
  selectedBanner.value = banner;
};


const handleNavigation = (banner) => {
    if (!isLoggedIn.value) {
        // 로그인 안되어 있으면 클릭 이벤트 막음
        alert("로그인이 필요합니다.");
        router.push('/');
    } else {
        // 로그인 되어 있으면 선택된 배너를 업데이트
        selectBanner(banner);
    }
};

const handleLogoClick = () => {
  if (isLoggedIn.value) {
    router.push('/account-book');
  } else {
    router.push('/');
  }
};

const handleMyPageClick = () => {
    selectedBanner.value = 'my';
    router.push('/my');
};

// const logout = () => {
//     isLoggedIn.value = false;
//     router.push('/');  
// };


</script>

<style scoped>

    .top-banner {
        display: flex;
        width: 100vw;
    }
    .mypage-banner {
        display: flex;
        margin-left: auto;
        margin-right: 80px;
        margin-top: 10px;
        gap: 20px;
        /* opacity: 0.6; */

    }

    .mypage-banner .mypage-btn {
        display: flex;
        background-color: #F3F3FF;
        color: #4D4D4D;
        border: none;
        border-radius: 40%;
        width: 100px;
        height: 30px;
        align-items: center;      /* 수직 가운데 정렬 */
        justify-content: center;  /* 수평 가운데 정렬 */
        cursor: pointer;
    }

    .mypage-banner .logout-btn {
        display: flex;
        background-color: #F3F3FF;
        color: #4D4D4D;
        border: none;
        border-radius: 40%;
        width: 100px;
        height: 30px;
        align-items: center;      /* 수직 가운데 정렬 */
        justify-content: center;  /* 수평 가운데 정렬 */
        cursor: pointer;
    }

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

    a{
        text-decoration: none;
    }


</style>