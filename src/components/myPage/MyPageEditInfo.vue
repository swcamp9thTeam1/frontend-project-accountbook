<template>
    <div class="info">회원정보</div>
    <div class="member-info" id="app">
        <div class="startline"></div>
        <div class="user-id">
            <div class="classification">아이디</div>
            <input type="text" class="modify-info" v-model="id">
        </div>
        <div class="nickname">
            <div class="classification">닉네임</div>
            <input type="text" class="modify-info" v-model="nickname">
        </div>
        <div class="email">
            <div class="classification">이메일</div>
            <input type="text" class="modify-info" v-model="email">
        </div>
        <div class="monthly-budget">
            <div class="classification">월 예산</div>
            <input type="number" class="modify-budget" v-model="budget">
        </div>
        <div class="endline"></div>
        <RouterLink to="/my" active-class="active">
            <button type="submit" @click="changeInfo">저장</button>
        </RouterLink>
    </div>
</template>

<script setup>
    import { RouterLink } from 'vue-router';
    import { ref } from 'vue';

    function changeInfo() {

    }
</script>

<style scoped>

</style>