<template>
        <!-- <div>
        <div v-for="menu in menus" :key="menu.id">
            <RouterLink :to="menu.path">
                {{ menu.name }}
            </RouterLink>
        </div> -->


    <div class="sidebar-container">
        <div class="sidebar">
            <p>{{ userName }}님</p>
            <ul>
                <!-- 그룹 관련 메뉴 -->
                <li v-if="selectedBanner === 'group'">
                    <RouterLink 
                        to="/group/my" 
                        class="menu-item" 
                        :class="{ 'active-menu': isActive('/group/my') }"
                        @click="selectMenu('내 그룹')">
                        내 그룹
                    </RouterLink>
                </li>
                <li v-if="selectedBanner === 'group'">
                    <RouterLink 
                        to="/group/join" 
                        class="menu-item" 
                        :class="{ 'active-menu': isActive('/group/join') }"
                        @click="selectMenu('그룹 가입')">
                        그룹 가입
                    </RouterLink>
                </li>    
                <li v-if="selectedBanner === 'group'">
                    <RouterLink 
                        to="/group/pending" 
                        class="menu-item" 
                        :class="{ 'active-menu': isActive('/group/pending') }"
                        @click="selectMenu('승인 대기')">
                        승인 대기
                    </RouterLink>
                </li>
                <li v-if="selectedBanner === 'group'">
                    <RouterLink 
                        to="/group/create" 
                        class="menu-item" 
                        :class="{ 'active-menu': isActive('/group/create') }"
                        @click="selectMenu('그룹 생성')">
                        그룹 생성
                    </RouterLink>
                </li>

                <!-- 커뮤니티 관련 메뉴 -->
                <li v-if="selectedBanner === 'community'">
                    <RouterLink 
                        to="/community/free-board" 
                        class="menu-item" 
                        :class="{ 'active-menu': isActive('/community/free-board') }"
                        @click="selectMenu('자유 게시판')">
                        자유 게시판
                    </RouterLink>
                </li>
                <li v-if="selectedBanner === 'community'">
                    <RouterLink 
                        to="/community/my" 
                        class="menu-item" 
                        :class="{ 'active-menu': isActive('/community/my') }"
                        @click="selectMenu('나의 글')">
                        나의 글
                    </RouterLink>
                </li>
                <li v-if="selectedBanner === 'community'">
                    <RouterLink 
                        to="/community/scrap" 
                        class="menu-item" 
                        :class="{ 'active-menu': isActive('/community/scrap') }"
                        @click="selectMenu('내가 스크랩한 글')">
                        내가 스크랩한 글
                    </RouterLink>
                </li>
            </ul>
        </div>
        <div class="group-tab">
            <p>{{ activeMenu }}</p>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { useRoute, RouterLink } from 'vue-router';

const route = useRoute();

const props = defineProps({
    selectedBanner: String
});

const activeMenu = ref('');

const selectMenu = (menu) => {
    activeMenu.value = menu;
};

const isActive = (path) => {
    return route.path === path;
};

if (props.selectedBanner === 'group') {
    activeMenu.value = '내 그룹';
} else if (props.selectedBanner === 'community') {
    activeMenu.value = '자유 게시판';
}
</script>

<style scoped>
.sidebar-container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
}

.sidebar {
    width: 20%;
    background-color: #F9F9FF;
    height: 100vh;
    text-align: center;
}

.sidebar p {
    margin-top: 30px;
    margin-bottom: 50px;
    font-weight: bold;
}

.sidebar ul {
    list-style-type: none;
    padding: 0;
}

.sidebar ul li {
    padding: 10px 0;
    margin-bottom: 50px;
}

.group-tab {
    display: flex;
    margin-top: 20px;
    background-color: #333;
    width: 100px;
    height: 20px;
    color: white;
    padding: 10px 20px;
    border-radius: 0 25px 25px 0;
    align-items: center; 
    justify-content: center; 
}

.group-tab p {
    display: flex;
    font-size: 14px;
    line-height: 20px; 
}

.menu-item.vi {
    display: flex;
    background-color: #EFEFFF; 
    width: 100%;
    height: 50px;
    color: black;
    font-weight: bold; 
    align-items: center; 
    justify-content: center; 
}

.active-menu {
    background-color: #EFEFFF;
    font-weight: bold;
    width: 100%; 
    height: 60px;
    line-height: 60px; 
    padding: 0; 
}

a {
    text-decoration: none;
    color: black;
    display: block;  
    height: 100%;  
}

</style>
