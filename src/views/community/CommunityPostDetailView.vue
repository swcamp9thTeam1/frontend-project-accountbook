<template>
    <div style="display:flex;">
        <div style="display: flex; flex-direction: column; gap: 10px; position: absolute; top: 187px; left: 340px; width: 100%;">
            <div v-if="post" style="width: 1000px; height: auto; min-height: 150px; padding: 20px;">
                <div class="post-list" style="width: 100%; background-color: #F9F9FF; border-radius: 11px; box-shadow:0 0 5px rgba(198, 198, 235, 0.5); display: flex;align-items: center; padding: 20px 41px; justify-content: space-between;">
                    <div style="display: flex; flex-direction: column;">
                        <span style="color:#101424; font-size: 25px; margin-top:13px;margin-right: 41px; font-weight: bold;">{{ post.title }}</span>
                        <div style="color: #8C8C8C; margin-top: 10px;">
                            <span style="font-size: 13px;">{{ post.nickname }}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <div style="color: #8C8C8C; margin-top: 4px;">
                                <span style="font-size: 13px;">작성일: {{ post.created_at }} | 댓글 수: {{ post.comment_count }}</span>
                            </div>

                            <div v-if="editOrDeleteButton" style="margin-left: 680px;">
                                <button class="editOrDeleteButton font-300" @click="modifyButton">수정</button>
                                <button class="editOrDeleteButton font-300" @click="deleteButton" style="background-color: black;">삭제</button>
                            </div>
                        </div>

                        <span style="color:#101424; margin-top:30px;">
                            <hr style="border: 0.5px solid #B1B1D2; width: 1000px;">
                            <p style="margin-top: 30px;">{{ post.content }}</p>
                            <img v-if="post.image" :src="post.image" alt="Post Image" class="post-image" />
                        </span>
                    </div> 
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const post = ref(null);
const route = useRoute();
const router = useRouter(); // router 정의
const editOrDeleteButton = ref(false);  // 초기값 false로 지정 

onMounted(async () => {
    const postId = route.params.id;
    try {
        const response = await fetch(`http://localhost:8080/community-post/${postId}`);
        post.value = await response.json();

        // 로그인한 회원의 닉네임
        const loggedInUserNickname = localStorage.getItem('nickname');

        // 게시글 작성자 닉네임과 로그인한 회원의 닉네임 비교
        editOrDeleteButton.value = post.value.nickname === loggedInUserNickname;
    } catch (error) {
        console.error('게시글 조회 실패 ', error);
    }
});

const modifyButton = () => {
    console.log('수정 버튼 클릭됨');
    router.push(`/community/free-board/editPost/${post.value.id}`); // 수정 페이지로 이동
};

const deleteButton = async () => {
    console.log('삭제 버튼 클릭됨');
    const confirmed = confirm("정말로 이 게시글을 삭제하시겠습니까?");
    if (confirmed) {
        try {
            await fetch(`http://localhost:8080/community-post/${post.value.id}`, {
                method: 'DELETE',
            });
            alert("게시글이 삭제되었습니다.");
            router.push('/community/free-board'); // 삭제 후 목록 페이지로 이동
        } catch (error) {
            console.error('게시글 삭제 실패:', error);
            alert("게시글 삭제에 실패했습니다.");
        }
    }
};
</script>

<style scoped>
.editOrDeleteButton {
    background-color: #B1B1D2;
    border: none;
    padding: 2px 11px;
    margin-right: 5px;
    border: 1px solid white;
    border-radius: 5px;
    color: white;
}

.font-300 {
    font-family: "Noto Sans KR", sans-serif;
    font-optical-sizing: auto;
    font-weight: 300;
    font-style: normal;
}

.font-500 {
    font-family: "Noto Sans KR", sans-serif;
    font-optical-sizing: auto;
    font-weight: 500;
    font-style: normal;
}
</style>
