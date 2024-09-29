
<!-- 자식 테이블 2 - 나의 글 -->

<template>
    <!-- 글 작성 버튼 -->
    <button class="regist-post-btn" style="width: 140px; height: 48px; background-color: #F3F3FF; border: none; border-radius: 26px; display: flex; align-items: center; justify-content: space-between; font-size: 23px; padding: 17px; margin-left: 843px;margin-bottom: 20px;">
        <img src="/src/assets/icons/Community/PlusIcon.svg" alt="">
        <span>글 작성</span>
    </button>

    <div style="width: 1000px;">

    <!-- 게시글 목록 박스 -->
        <div style="display: flex; flex-direction: column; gap: 10px;width: 100%;">
            <div v-for="(post, index) in currentPagePosts" :key="post.id" style="width: 90%; height: auto;">
                <div class="post-list" style="width: 100%; height: 68px; background-color: #F9F9FF; border-radius: 11px; box-shadow:0 0 5px rgba(198, 198, 235, 0.5); display: flex;align-items: center;  padding: 15px 41px; justify-content: space-between;">
                    <div style="display: flex;">
                        <span style="color:#101424; font-size: 25px; margin-top:13px;margin-right: 41px; font-weight: bold;">
                            {{ (currentPage - 1) * postsPerPage + index + 1 }}
                        </span>
                        <div style="display: flex; flex-direction: column;">
                            <RouterLink :to="'/community/my/' + post.id" style="text-decoration: none;">
                                <span style="color: #101424;font-size: 23px;">{{ post.title }}</span>
                            </RouterLink>
                            <div style="color: #8C8C8C; margin-top: 4px;">
                                <span style="font-size: 13px;">{{ post.nickname }} </span>
                                <span style="font-weight: lighter; font-size: 16px;">&nbsp; | &nbsp;</span>
                                <span style="font-size: 13px;"> 댓글 {{ post.comment_count }} </span>
                                <span style="font-weight: lighter;font-size: 16px;">&nbsp; | &nbsp;</span>
                                <span style="font-size: 13px;"> {{ post.created_at}}</span>
                            </div>
                        </div>
                    </div>
                    
                </div> 
            </div>
        </div>
        <div class="pagination" style="display: flex; justify-content: center; align-items: center; margin-top: 20px;">
            <span class="page-btn" @click="changePage(currentPage - 1)" v-show="currentPage > 1">
                &lt;
            </span>

            <span class="page-btn" v-show="currentPage > 1" @click="changePage(currentPage - 1)">
                {{ currentPage - 1 }}
            </span>

            <span class="currentPageBtn" @click="currentPagePosts">
                {{ currentPage }}
            </span>

            <span class="page-btn" v-show="currentPage < totalPages" @click="changePage(currentPage + 1)">
                {{ currentPage + 1 }}
            </span>

            <span class="page-btn" @click="changePage(currentPage + 1)" v-show="currentPage < totalPages">
                &gt;
            </span>
        </div>
    </div> 

</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import {RouterLink } from 'vue-router';

const posts = ref([]);




onMounted(async () => {
const userNickname = localStorage.getItem('nickname');
    
if (userNickname) {
    const response = await fetch('http://localhost:8080/community-post');
    const data = await response.json();

    posts.value = data.filter(post => post.nickname === userNickname);

} else {
    alert('로그인이 필요합니다.');
}
});

const postsPerPage = 7; // 한 페이지당 게시글 개수
const currentPage = ref(1); // currentPage 초기값 1로 설정 

const totalPostNum = computed(() => posts.value.length); // 게시글 전체 개수 

// 총 게시글의 페이지 수를 계산하는 메소드 
const totalPages = computed(() => {
return Math.ceil(totalPostNum.value / postsPerPage);
});

// 현재 페이지의 게시글 목록을 보여주는 메소드 
const currentPagePosts = computed(() => {
const start = (currentPage.value - 1) * postsPerPage;
const end = start + postsPerPage;
return posts.value.slice(start, end);
});

// 페이지를 바꿔주는 메소드 
const changePage = (newPage) => {
if (newPage >= 1 && newPage <= totalPages.value) {
currentPage.value = newPage;
}
};

</script>

<style scoped> 
.regist-post-btn {
margin-left: 20px;
}
span {
text-wrap: nowrap;
}
.page-btn {
display: flex;
align-items: center;
justify-content: center;
width: 27px;
height: 27px;
border: none;
border-radius: 3px;
background-color: white;
color: #B1B1D2;
margin-right: 15px; 
font-weight: bold;
font-size: 15px;
}
.currentPageBtn {
display: flex;
align-items: center;
justify-content: center;
width: 27px;
height: 27px;
border: none;
border-radius: 3px;
margin-right: 15px; 
font-weight: bold;
font-size: 15px;
background-color: #B1B1D2;
color: white;
}
</style>