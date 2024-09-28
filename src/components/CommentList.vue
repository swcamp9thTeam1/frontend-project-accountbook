<template>
    <ul>
        <li class="comment-item" v-for="comment in comments" :key="comment.id">
            <Comment :comment="comment" />

            <ul class="sub-comment-list" v-if="comment.subComments.length > 0">
                <li v-for="subComment in comment.subComments" :key="subComment.id">
                    <Comment :comment="subComment" :is-sub-comment="true" />
                </li>
            </ul>
        </li>
    </ul>
    
</template>

<script setup>
import { defineProps } from 'vue';
import Comment from '@/components/Comment.vue';

const props = defineProps({
    comments: {
        type: Array,
        required: true
    }
});
</script>

<style scoped>
ul {
    list-style-type: none;
    padding: 0;
}

.comment-item {

    & + .comment-item {
        margin-top: 16px;
    }

    .sub-comment-list {
        margin-top: 16px;

        li {
            display: flex;
            justify-content: flex-end;
        }
    }
}


</style>