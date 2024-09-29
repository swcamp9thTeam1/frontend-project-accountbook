<template>
    <div class="post-detail">
        <div class="title-area">
            <h2>{{ post.title }}</h2>
            <p class="nickname">{{ post.nickname }}</p>
            <span class="created-at">{{ post.createdAt }}</span>
            <span>댓글 수 {{ totalComment }}</span>
        </div>

        <div class="content-area">
            <div v-if="post.images.length > 0" class="image-area">
                <img v-for="image in post.images" :src="image" alt="게시글 이미지">
            </div>
            <p>{{ post.content }}</p>
        </div>

        <div class="reply-area">
            <div class="reply-cnt">댓글 {{ post.comments.length }}</div>
            <CommentList :comments="post.comments" />

            <!-- 댓글 달기 -->
            <div class="input-comment-area">
                <textarea :rows="commentContent ? 7 : 1" placeholder="댓글을 입력해주세요" v-model="commentContent"></textarea>
                <button type="button" v-if="commentContent">등록</button>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue';
import CommentList from '@/components/CommentList.vue';

const props = defineProps({
    post: {
        type: Object,
        required: true
    }
});

const commentContent = ref("");
const totalComment = ref(0);

onMounted(() => {
    let commentCnt = 0;
    
    /* 전체 댓글 수 계산 */
    commentCnt += props.post.comments.length;
    props.post.comments.forEach(comment => {
        commentCnt += comment.subComments.length;
    });

    totalComment.value = commentCnt;
})
</script>

<style scoped>
.post-detail {
    background-color: #F9F9FF;
    border-radius: 20px;
    width: 100%;
    margin: 0 20px;
    padding: 40px;

    .title-area {
        padding-bottom: 24px;

        h2 {
            font-size: 33px;
            margin-bottom: 16px;
        }

        .nickname {
            font-size: 19px;
        }

        span {
            font-size: 13px;

            &.created-at {
                margin-right: 10px;
            }
        }
    }

    .content-area {
        padding: 16px 0;
        border-top: 1px solid #B1B1D2;
        border-bottom: 1px solid #B1B1D2;

        img {
            width: 400px;
            height: auto;
            object-fit: cover;
        }

        p {
            font-size: 24px;
        }
    }

    .reply-area {
        padding: 16px 0;

        .reply-cnt {
            border-radius: 18px;
            background-color: black;
            width: 100px;
            height: 36px;

            display: flex;
            align-items: center;
            justify-content: center;

            font-size: 15px;
            color: white;
        }

        .input-comment-area {
            border-radius: 4px;
            border: 1px solid #B1B1D2;
            background-color: white;
            padding: 16px;
            display: flex;
            flex-direction: column;

            textarea {
                resize: none;
                border: none;
                font-size: 19px;
                width: 100%;
                
                &:focus-visible {
                    outline: none;
                }
            }

            button {
                background-color: #B1B1D2;
                border-radius: 4px;
                width: 70px;
                height: 37px;
                border: none;
                margin-top: 16px;

                font-size: 19px;
                color: white;
                align-self: flex-end;
            }
        }
    }
}
</style>