<template>
    <div class="search-bar">
        <img :src="SearchIcon" alt="">
        <input type="text" class="search-bar-input">
    </div>
</template>

<script setup>
import SearchIcon from "@/assets/icons/search.svg";

</script>

<style scoped>
.search-bar {
    border-radius: 10px;
    border: 1px solid #B1B1D2;
    background: #fff;
    box-shadow: 5px 5px 9px 0px rgba(0, 0, 0, 0.25);
    position: relative;
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
        color: rgba(0, 0, 0, 0.37);
        font-weight: 400;
    }

    &:focus-visible {
        outline: none;
    }
}
</style>