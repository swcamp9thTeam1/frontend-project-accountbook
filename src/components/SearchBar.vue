<template>
    <div class="search-bar">
        <input type="text" class="search-bar-input">
        <img :src="SearchIcon" alt="">
    </div>
</template>

<script setup>
import SearchIcon from "@/assets/icons/search.svg";

</script>

<style scoped>
.search-bar {
    width: 100%;
    height: 77px;
    border-radius: 10px;
    border: 1px solid #B1B1D2;
    background: #fff;
    box-shadow: 5px 5px 9px 0px rgba(0, 0, 0, 0.25);
    position: relative;
    overflow: hidden;

    img {
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
    }
}
.search-bar-input {
    font-size: 24px;
    font-weight: 700;
    border: none;
    width: 100%;
    height: 100%;
    padding: 0 16px 0 70px;
    
    ::placeholder {
        color: rgba(0, 0, 0, 0.37);
        font-weight: 400;
    }
}
</style>