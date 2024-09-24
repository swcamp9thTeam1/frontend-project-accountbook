<template>
    <div class="search-bar">
        <img :src="SearchIcon" alt="">
        <input 
            type="text" 
            class="search-bar-input" 
            placeholder="장소를 검색해보세요." 
            @keydown.enter="emit('onEnterKeyDown', keyword)" 
            v-model="keyword" >
    </div>
</template>

<script setup>
import { defineEmits, defineProps, ref } from 'vue';
import SearchIcon from "@/assets/icons/search.svg";

const emit = defineEmits(['onEnterKeyDown']);

const keyword = ref("");

</script>

<style scoped>
.search-bar {
    border-radius: 10px;
    border: 1px solid #B1B1D2;
    background: #fff;
    box-shadow: 5px 5px 9px 0px rgba(0, 0, 0, .25);
    overflow: hidden;
    display: flex;
    align-items: center;
    padding: 20px;

    img {
        flex-shrink: 0;
    }
}
.search-bar-input {
    font-size: 24px;
    font-weight: 700;
    border: none;
    height: 100%;
    flex-grow: 1;
    margin-left: 20px;
    
    &::placeholder {
        color: rgba(0, 0, 0, .37);
        font-weight: 400;
    }

    &:focus-visible {
        outline: none;
    }
}
</style>