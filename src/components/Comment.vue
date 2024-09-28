<template>
    <div class="comment" :class="{ sub: props.isSubComment === true}">
        <div class="nickname">{{ props.comment.nickname }}</div>
        <div class="created-at">{{ props.comment.createdAt }}</div>
        <div class="content">{{ props.comment.content }}</div>
        <button v-if="!props.isSubComment">답글</button>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    comment: {
        type: Object,
        required: true
    },
    isSubComment: Boolean
});
</script>

<style scoped>
.comment {
    border-radius: 13px;
    background-color: white;
    box-shadow: 0 0 7px 1px #DFDFF5;
    padding: 24px;

    &.sub {
        background-color: #F9F9FF;
        width: 80%;
    }

    .nickname {
        font-weight: bold;
        font-size: 16px;
    }

    .created-at {
        font-size: 10px;
        color: #A6A6A6;
    }

    .content {
        font-size: 19px;
        margin-top: 16px;
    }

    button {
        border: none;
        background: none;
        padding: 0;
        font-size: 18px;
        color: #8C8C8C;
        margin-top: 16px;
    }
}
</style>