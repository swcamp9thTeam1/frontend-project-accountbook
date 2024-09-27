<template>
<!-- <div class="b">
    <div v-if="post" class="post-container"  >

        <div class="post-header">
            <h1>{{ post.title }}</h1>
            <small>작성일: {{ post.created_at }} | 댓글 수: {{ post.comment_count }}</small>
        </div>

        <div class="post-content">
            <p>{{ post.content }}</p>
 
            <img v-if="post.image" :src="post.image" alt="Post Image" class="post-image" />
        </div>


        <div class="comments-section">
            <h2>댓글</h2>
            <div v-for="comment in post.comments" :key="comment.id" class="comment">
                <strong>{{ comment.nickname }}</strong>
                <p>{{ comment.content }}</p>
                <small>{{ comment.created_at }}</small>
            </div>


            <div class="comment-form">
                <textarea v-model="newComment" placeholder="댓글을 입력하세요"></textarea>
                <button @click="submitComment">등록</button>
            </div>
        </div>
    </div>

    <div v-else>
        <p>Loading...</p>
    </div>
    </div> -->


    <div style="display:flex;">
    <div style="display: flex; flex-direction: column; gap: 10px; position: absolute; top: 187px; left: 340px; width: 100%;">
        <div v-if="post" style="width: 80%; height: auto; min-height: 150px; padding: 20px;"> <!-- 여기서 width와 height 조정 -->
            <div class="post-list" style="width: 100%; background-color: #F9F9FF; border-radius: 11px; box-shadow:0 0 5px rgba(198, 198, 235, 0.5); display: flex;align-items: center; padding: 20px 41px; justify-content: space-between;">
                <div style="display: flex; flex-direction: column;">
                    <span style="color:#101424; font-size: 25px; margin-top:13px;margin-right: 41px; font-weight: bold;">{{ post.title }}</span>
                    <div style="color: #8C8C8C; margin-top: 10px;">
                        <span style="font-size: 13px;">{{ post.nickname }}</span>
                    </div>
                    <div style="color: #8C8C8C; margin-top: 4px;">
                        <span style="font-size: 13px;">작성일: {{ post.created_at }} | 댓글 수: {{ post.comment_count }}</span>
                    </div>

                    <span style="color:#101424; margin-top:50px;">
                        <p>{{ post.content }}</p>
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
import { useRoute } from 'vue-router';

const post = ref(null);
const newComment = ref('');
const route = useRoute();

onMounted(async () => {
    const postId = route.params.id;
    try {
        const response = await fetch(`http://localhost:8080/community-post/${postId}`);
        post.value = await response.json();
    } catch (error) {
        console.error('Error fetching post:', error);
    }
});

const submitComment = async () => {
    if (newComment.value.trim() === '') return;

    const comment = {
        id: Date.now(),  // 간단한 ID 생성
        nickname: localStorage.getItem('nickname'),  // 저장된 닉네임
        content: newComment.value,
        created_at: new Date().toISOString()
    };

    post.value.comments.push(comment);
    newComment.value = '';

    // 여기에 서버로 댓글을 저장하는 API 호출 코드를 추가할 수 있습니다.
};
</script>

<style scoped>

</style>
