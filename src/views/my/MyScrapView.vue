<template>
    <div class="page">
        <!-- 스크랩한 게시글 목록 박스 -->
        <div v-for="(post) in currentPagePosts" :key="post.id" @click="goToPostDetail(post.id)" class="container">
            <div class="post-container">
                <div class="post-list">
                    <div style="display: flex;">
                        <span class="font-500">{{ post.id }}</span>
                        <div>
                            <span class="title">{{ post.title }}</span>
                            <div class="about-post">
                                <span class="about">{{ post.nickname }} </span>
                                <span class="classify">&nbsp; | &nbsp;</span>
                                <span class="about"> 댓글 {{ post.comment_count }} </span>
                                <span class="classify">&nbsp; | &nbsp;</span>
                                <span class="about">{{ post.created_at }}</span>
                            </div>
                        </div>
                    </div>

                    <button @click.stop="scrapEvent(post.id)" :class="post.scrapStatus ? 'scrap-active' : 'scrap-inactive'" class="font-300">
                        {{ post.scrapStatus ? '스크랩 취소' : '스크랩 ' }}
                    </button>
                </div>
            </div>
        </div>

        <!-- 페이지네이션 -->
        <div class="pagination">
            <span class="page-btn font-300" @click="changePage(currentPage - 1)" v-show="currentPage > 1">
                &lt;
            </span>

            <span class="page-btn font-300" v-show="currentPage > 1" @click="changePage(currentPage - 1)">
                {{ currentPage - 1 }}
            </span>

            <span class="currentPageBtn font-300" @click="currentPagePosts">
                {{ currentPage }}
            </span>

            <span class="page-btn font-300" v-show="currentPage < totalPages" @click="changePage(currentPage + 1)">
                {{ currentPage + 1 }}
            </span>

            <span class="page-btn font-300" @click="changePage(currentPage + 1)" v-show="currentPage < totalPages">
                &gt;
            </span>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

    const router = useRouter();
    const posts = ref([]);          // 모든 게시글 데이터
    const currentPage = ref(1);     // 현재 페이지
    const postsPerPage = 7;         // 한 페이지당 게시글 수

    // 스크랩 상태를 로컬 스토리지에서 가져오기
    const savedScrapStatus = JSON.parse(localStorage.getItem('scrapStatus')) || {};

    // 게시글 목록을 로드하고 스크랩 상태 추가
    onMounted(async () => {
        const response = await fetch('http://localhost:8080/community-post');
        const data = await response.json();

        posts.value = data.map(post => ({
            ...post,
            scrapStatus: savedScrapStatus[post.id] || false
        }));

        posts.value.sort((a, b) => Number(b.id) - Number(a.id));
    });

    // 현재 페이지의 게시글 목록을 보여주는 메소드
    const currentPagePosts = computed(() => {
        return posts.value.filter(post => post.scrapStatus).slice((currentPage.value - 1) * postsPerPage, currentPage.value * postsPerPage);
    });

    // 총 게시글의 페이지 수를 계산하는 메소드
    const totalPages = computed(() => {
        return Math.ceil(posts.value.filter(post => post.scrapStatus).length / postsPerPage);
    });

    // 페이지를 바꿔주는 메소드
    const changePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages.value) {
            currentPage.value = newPage;
        }
    };

    // 게시글 상세 페이지로 이동하는 메소드
    const goToPostDetail = (postId) => {
        console.log('게시글 상세 페이지 이동:', postId);
        router.push(`/community/scrap/${postId}`);
    };

    // 스크랩 이벤트 처리
    const scrapEvent = (postId) => {
        const post = posts.value.find(p => p.id === postId);
        if (!post) return;

        post.scrapStatus = !post.scrapStatus;           // 스크랩 상태 토글
        savedScrapStatus[postId] = post.scrapStatus;    // 로컬 스토리지에 상태 저장
        localStorage.setItem('scrapStatus', JSON.stringify(savedScrapStatus));
    };
</script>

<style scoped>
    .page {
        width: 900px;
        position: absolute;
        top: 220px;
    }

    .container {
        margin-top: 10px;
        width: 100%;
    }

    .post-container {
        width: 90%;
        height: auto;
    }

    .post-list {
        width: 100%; 
        height: 68px; 
        background-color: #F9F9FF; 
        border-radius: 11px; 
        box-shadow:0 0 5px rgba(198, 198, 235, 0.5); 
        display: flex; 
        align-items: center; 
        padding: 15px 41px; 
        justify-content: space-between;
    }

    .font-300{
        font-family: "Noto Sans KR", sans-serif;
        font-optical-sizing: auto;
        font-weight: 300;
        font-style: normal;
    }

    .font-500{
        font-family: "Noto Sans KR", sans-serif;
        font-optical-sizing: auto;
        font-weight: 500;
        font-style: normal;
        color:#101424; 
        font-size: 25px;
        margin-top:13px; 
        margin-right: 41px;
    }

    .title {
        color: #101424; 
        font-size: 22px;
    }

    .about-post {
        color: #8C8C8C; 
        margin-top: 4px;
    }

    .about {
        font-size: 13px;
    }

    .classify {
        font-weight: lighter; 
        font-size: 16px;
    }

    .scrap-active{
        width: 120px; 
        height: 40px; 
        background-color: #B1B1D2; 
        border-radius: 50px; 
        color: white; 
        border:1px #B1B1D2 solid; font-size: 17px;
    }

    .scrap-inactive{
        width: 120px; 
        height: 40px; 
        background-color: white; 
        border-radius: 50px; 
        color: #8181B0; 
        border:1px #8181B0 solid; font-size: 17px;
    }

    .pagination {
        display: flex; 
        justify-content: center; 
        align-items: center; 
        margin-top: 60px;
    }
</style>
