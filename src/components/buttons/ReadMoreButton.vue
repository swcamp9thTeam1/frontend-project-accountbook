<template>
    <button type="button" class="btn-more" @click="emit('clickMore')">
        <span>더보기</span>
        <img src="@/assets/icons/button-read-more.svg" alt="더보기">
    </button>
</template>

<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(["clickMore"]);
</script>

<style scoped>
.btn-more {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent; 
    border: 0px;

    span {
        font-size: 14px;
        margin-right: 6px;
    }
}
</style>