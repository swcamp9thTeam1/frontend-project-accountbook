<template>
    <div style="display: flex;">

    <div>
        <!-- 글 작성 버튼 -->
        <button class="regist-post-btn"style="width: 140px; height: 48px; background-color: #F3F3FF; border: none; border-radius: 26px; display: flex; align-items: center; justify-content: space-between; font-size: 23px; padding: 17px;
            position: absolute; top: 118px; right: 100px;">
            <a href=""></a>
            <img src="/src/assets/icons/Community/PlusIcon.svg" alt="">
            <span>글 작성</span>
        </button>


        <!-- 게시글 목록 박스 -->
        <div style="display: flex; flex-direction: column; gap: 10px; position: absolute; top: 187px; left: 340px; width: 100%;">
            <div v-for="(post, index) in posts" :key="post.id" style="width: 70%; height: auto;">
                <div class="post-list" style="width: 100%; height: 68px; background-color: #F9F9FF; border-radius: 11px; box-shadow:0 0 5px rgba(198, 198, 235, 0.5); display: flex;align-items: center;  padding: 15px 41px; justify-content: space-between;">
                    <div style="display: flex;">
                        
                        <span style="color:#101424; font-size: 25px; margin-top:13px;margin-right: 41px; font-weight: bold;">{{ index+1 }}</span>
               


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

                    <!-- <button style="width: 120px; height: 40px; background-color: white; border-radius: 50px; color: #8181B0; border:1px #8181B0 solid; font-size: 17px; cursor:pointer">
                        스크랩
                    </button> -->
                </div> 
            </div>
        </div>
    </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    // import SideMenu from '@/components/SideMenu.vue';
    import {RouterLink} from 'vue-router';
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

</script>

<style scoped>
    .input-title::placeholder {
        color: #B1B1D2;
        font-weight: bold;
    }

    .input-title:focus,  textarea:focus {
        outline: 0.3px solid #B1B1D2;
        box-shadow:0 0 5px rgba(173, 173, 255, 0.9);

        border-radius: 5px;
    }

    textarea{
        width: 100%;
        height: 440px;
        overflow-y: auto;
        padding: 15px;
        border: none;
        font-size: 21px;
    }

    textarea::placeholder{
        font-size: 21px;
        font-weight: lighter;
        color: #B1B1D2;
    }

    .custom-file-upload {
            display: inline-block;
            padding: 13px 13px;
            cursor: pointer;
            background-color: #b2b2cb;
            color: white;
            border-radius: 5px;
            text-align: center;
            transition: background-color 0.3s;
            font-size: 20px;
            text-wrap: nowrap;
            margin-right: 5px;

        }

        .custom-file-upload:hover {
            background-color: #9b95b3; /* 호버 시 색상 변경 */
        }

        /* 실제 파일 input 요소 숨기기 */
        input[type="file"] {
            display: none; /* 숨기기 */
        }

        #fileName {
            font-size: 16px;
            color: #333;
            border: 1px solid #B1B1D2;
            width: 80%;
            height: 34px;
            text-align: center; /* 글자를 가운데 정렬 */
            margin-right: 5px;

        }
</style>