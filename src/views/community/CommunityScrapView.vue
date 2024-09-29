
<!-- 자식 테이블 3 - 나의 스크랩 -->

<template>

    <div style="width: 1000px;">
                    <!-- 게시글 목록 박스 -->
                <div style="display: flex; flex-direction: column; gap: 10px;width: 100%;" @click="">
                    <div v-for="(post) in currentPagePosts" :key="post.id" style="width: 90%; height: auto;">
                        <div class="post-list" style="width: 100%; height: 68px; background-color: #F9F9FF; border-radius: 11px; box-shadow:0 0 5px rgba(198, 198, 235, 0.5); display: flex; align-items: center; padding: 15px 41px; justify-content: space-between;">
                            <div style="display: flex;">
                                <span  class="font-500"style="color:#101424; font-size: 25px; margin-top:13px; margin-right: 41px; ">{{ post.id }}</span>
                                <div style="display: flex; flex-direction: column;">
                                    <span style="color: #101424; font-size: 22px;">{{ post.title}}</span>
                                    <div style="color: #8C8C8C; margin-top: 4px;">
                                        <span style="font-size: 13px;">{{ post.nickname }} </span>
                                        <span style="font-weight: lighter; font-size: 16px;">&nbsp; | &nbsp;</span>
                                        <span style="font-size: 13px;"> 댓글 {{ post.comment_count }} </span>
                                        <span style="font-weight: lighter; font-size: 16px;">&nbsp; | &nbsp;</span>
                                        <span style="font-size: 13px;">{{ post.created_at }}</span>
                                    </div>
                                </div>
                            </div>

                            <button @click="scrapEvent(post.id)" :class="post.scrapStatus ? 'scrap-active' : 'scrap-inactive'" class="font-300">
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
    import { ref } from 'vue';
    import SideMenu from '@/components/SideMenu.vue';
</script>

<style scoped>

</style>