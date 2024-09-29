<template>



        <!-- 글 작성 버튼 -->
        <button 
            @click="createPost"
            class="regist-post-btn" style="width: 140px; height: 48px; background-color: #F3F3FF; border: none; border-radius: 26px; display: flex; align-items: center; justify-content: space-between; font-size: 23px; padding: 17px; margin-left: 843px;margin-bottom: 20px;">
            <img src="/src/assets/icons/Community/PlusIcon.svg" alt="">
            <span class="font-300">글 작성</span>
        </button>


        <div style="width: 1000px; top: 170px; position: absolute;">
                <!-- 게시글 목록 박스 -->

            <div v-for="(post) in currentPagePosts" :key="post.id" @click="goToPostDetail(post.id)"
            style="display: flex; flex-direction: column; gap: 10px;width: 100%; margin-bottom: 10px;" >
                <div style="width: 90%; height: auto;">

                    <div class="post-list" style="width: 100%; height: 68px; background-color: #F9F9FF; border-radius: 11px; box-shadow:0 0 5px rgba(198, 198, 235, 0.5); display: flex; align-items: center; padding: 15px 41px; justify-content: space-between;">
                        <div style="display: flex;">
                            <span  class="font-500"style="color:#101424; font-size: 25px; margin-top:13px; margin-right: 41px; ">{{ post.id }}</span>
                            <div style="display: flex; flex-direction: column;">
                                <span style="color: #101424; font-size: 22px;">{{ post.title}}</span>
                                <div style="color: #8C8C8C; margin-top: 4px;">
                                    <span class="font-300"  style="font-size: 12px;">{{ post.nickname }} </span>
                                    <span class="font-300"  style="font-weight: lighter; font-size: 14px;">&nbsp; | &nbsp;</span>
                                    <span class="font-300"  style="font-size: 12px;"> 댓글 {{ post.comment_count }} </span>
                                    <span class="font-300"  style="font-weight: lighter; font-size: 14px;">&nbsp; | &nbsp;</span>
                                    <span class="font-300" style="font-size: 12px;">{{ post.created_at }}</span>
                                </div>
                            </div>
                        </div>

                        <button  @click.stop="scrapEvent(post.id)" :class="post.scrapStatus ? 'scrap-active' : 'scrap-inactive'" class="font-300">
                            {{ post.scrapStatus ? '스크랩 취소' : '스크랩 '}}
                        </button>
                    </div>
                </div>
            </div>

            <!-- 페이지네이션 -->
            <div class="pagination" style="display: flex; justify-content: center; align-items: center; margin-top: 60px;">
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
    import { ref, onMounted, computed } from 'vue';
    import { useRoute, useRouter } from 'vue-router'; // useRouter 추가

    const route = useRoute();
    const router = useRouter(); // router 인스턴스 가져오기

    const posts = ref([]);   // 모든 게시글 데이터 
    const post = ref(null); // 게시글 하나의 데이터

    onMounted(async () => {
        const postId = route.params.id;
        const response = await fetch('http://localhost:8080/community-post');
        const data = await response.json();

        const savedScrapStatus = JSON.parse(localStorage.getItem('scrapStatus')) || {};

        posts.value = data.map(post => ({
            ...post,
            scrapStatus: savedScrapStatus[post.id] || false,
        }));

        post.value = posts.value.find(p => p.id === Number(postId));

        posts.value.sort((a, b) => Number(b.id) - Number(a.id));
    });

    const goToPostDetail = (postId) => {
        router.push(`/community/free-board/${postId}`); // 상세 페이지로 이동
        console.log('페이지 이동 완료')
    };

    /* 페이지네이션 */
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

    /* 스크랩 */
        // const scrapStatus = ref(false); // 초기 스크랩 상태: 스크랩 안함
        
        // scrap 이벤트가 발생하면 scrapStatus 변화 
    const scrapEvent = (postId) => {
        const post = posts.value.find(p => p.id === postId);

        if (!post) {
            console.error('게시글을 찾을 수 없습니다.', postId); 
            return; 
        }

        post.scrapStatus = !post.scrapStatus;
       // 로컬 스토리지에 스크랩 상태 저장
        const savedScrapStatus = JSON.parse(localStorage.getItem('scrapStatus')) || {};
        savedScrapStatus[postId] = post.scrapStatus;
        localStorage.setItem('scrapStatus', JSON.stringify(savedScrapStatus));

        // console.log(post.scrapStatus)
        console.log(savedScrapStatus)
    }

    /* 글 작성 */
    const createPost = () => {
        router.push(`/community/free-board/createPost`); // 상세 페이지로 이동
        console.log('게시글 작성 페이지 이동 완료')
        
    }

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
}

</style>