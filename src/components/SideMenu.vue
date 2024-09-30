<template>
        <!-- <div>
        <div v-for="menu in menus" :key="menu.id">
            <RouterLink :to="menu.path">
                {{ menu.name }}
            </RouterLink>
        </div> -->


    <div class="sidebar-container">
        <div class="sidebar">
            <p>{{ nickname }} 님</p>
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
                        :class="{ 'active-menu': isActive('/community/free-board') || route.path.startsWith('/community/free-board/')}"
                        @click="selectMenu('자유 게시판')">
                        자유 게시판
                    </RouterLink>
                </li>
                <li v-if="selectedBanner === 'community'">
                    <RouterLink 
                        to="/community/my/" 
                        class="menu-item" 
                        :class="{ 'active-menu': isActive('/community/my') || route.path.startsWith('/community/my/')}"
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

                <!-- 마이페이지 관련 메뉴 -->
                <li v-if="selectedBanner === 'my'">
                    <RouterLink 
                        to="/my/asset" 
                        class="menu-item" 
                        :class="{ 'active-menu': isActive('/my/asset') || route.path.startsWith('/my/asset/')}"
                        @click="selectMenu('나의 자산')">
                        나의 자산 
                    </RouterLink>
                </li>
                <li v-if="selectedBanner === 'my'">
                    <RouterLink 
                        to="/my/expend" 
                        class="menu-item" 
                        :class="{ 'active-menu': isActive('/my/expend') || route.path.startsWith('/my/expend/')}"
                        @click="selectMenu('나의 정기지출')">
                        나의 정기지출
                    </RouterLink>
                </li>
                <li v-if="selectedBanner === 'my'">
                    <RouterLink 
                        to="/my/review" 
                        class="menu-item" 
                        :class="{ 'active-menu': isActive('/my/review') }"
                        @click="selectMenu('내가 다녀간 가게와 리뷰')">
                        내가 다녀간 가게와 리뷰
                    </RouterLink>
                </li>
                <li v-if="selectedBanner === 'my'">
                    <RouterLink 
                        to="/my/scrap" 
                        class="menu-item" 
                        :class="{ 'active-menu': isActive('/my/scrap') }"
                        @click="selectMenu('나의 스크랩')">
                        나의 스크랩
                    </RouterLink>
                </li>
                <li v-if="selectedBanner === 'my'">
                    <RouterLink 
                        to="/my/write" 
                        class="menu-item" 
                        :class="{ 'active-menu': isActive('/my/write') }"
                        @click="selectMenu('나의 글')">
                        나의 글
                    </RouterLink>
                </li>

                <!-- 그룹게시판, 그룹 가계부 -->
                <li v-if="selectedBanner === 'groupManagement'">
                    <RouterLink 
                        to="/group/posts" 
                        class="menu-item" 
                        :class="{ 'active-menu': isActive('/group/posts') }"
                        @click="selectMenu('그룹 게시판')">
                        그룹 게시판
                    </RouterLink>
                </li>
                <li v-if="selectedBanner === 'groupManagement'">
                    <RouterLink 
                        to="/group/accbook" 
                        class="menu-item" 
                        :class="{ 'active-menu': isActive('/group/accbook') }"
                        @click="selectMenu('그룹 가계부')">
                        그룹 가계부
                    </RouterLink>
                </li>
            </ul>
        </div>
        <div v-if="showBlackBar" class="group-tab">
            <p>{{ activeMenu }}</p>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref, watchEffect, onMounted } from 'vue';
import { useRoute, RouterLink } from 'vue-router';

const route = useRoute();
const showBlackBar = ref(true); // 기본적으로 검은색 바를 보여줌
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

const nickname = ref(''); // 닉네임을 저장할 ref 변수

// 로컬 스토리지에서 닉네임 가져오기
onMounted(() => {
    const storedNickname = localStorage.getItem('nickname');
    if (storedNickname) {
        nickname.value = storedNickname;
    }
});

// if (props.selectedBanner === 'group') {
//     activeMenu.value = '내 그룹';
// } else if (props.selectedBanner === 'community') {
//     activeMenu.value = '자유 게시판';
// }   else if (props.selectedBanner === 'my') {
//     activeMenu.value = '회원 정보';
// }


watchEffect(() => {
    if (props.selectedBanner === 'group') {
        if (isActive('/group/my')) activeMenu.value = '내 그룹';
        else if (isActive('/group/join')) activeMenu.value = '그룹 가입';
        else if (isActive('/group/pending')) activeMenu.value = '승인 대기';
        else if (isActive('/group/create')) activeMenu.value = '그룹 생성';
    } else if (props.selectedBanner === 'community') {
        if (isActive('/community/free-board')) activeMenu.value = '자유 게시판';
        else if (isActive('/community/my')) activeMenu.value = '나의 글';
        else if (isActive('/community/scrap')) activeMenu.value = '내가 스크랩한 글';
    } else if (props.selectedBanner === 'my') {
        if (isActive('/my')) activeMenu.value = '회원 정보';
        else if (isActive('/my/edit-info')) activeMenu.value = '회원 정보';
        else if (isActive('/my/asset')) activeMenu.value = '나의 자산';
        else if (isActive('/my/asset/add')) activeMenu.value = '나의 자산';
        else if (isActive('/my/expend')) activeMenu.value = '나의 정기지출';
        else if (isActive('/my/expend/add')) activeMenu.value = '나의 정기지출';
        else if (isActive('/my/review')) activeMenu.value = '내가 다녀간 가게와 리뷰';
        else if (isActive('/my/scrap')) activeMenu.value = '나의 스크랩';
        else if (isActive('/my/write')) activeMenu.value = '나의 글';   
    } 
    // else if (props.selectedBanner === 'groupManagement') {
    //     if (isActive('/group/posts')) activeMenu.value = '그룹 게시판';
    //     else if (isActive('group/accbook')) activeMenu.value='그룹 가계부';
    // }
});

// 현재 경로에 따라 검은색 바를 표시하거나 숨김
watchEffect(() => {
  // group/posts와 group/accbook 페이지에서는 검은색 바를 숨김
  if (route.path === '/group/posts' || route.path === '/group/accbook') {
    showBlackBar.value = false;
  } else {
    showBlackBar.value = true; // 다른 경로에서는 검은색 바를 표시
  }
});

</script>

<style scoped>
.sidebar-container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
}

.sidebar {
    width: 300px;
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
