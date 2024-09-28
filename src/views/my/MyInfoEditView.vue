<!-- 회원 정보 수정 화면 -->

<template>
    <div class="member-info" id="app">
        <div class="startline"></div>
        <div class="user-id">
            <div class="classification">아이디</div>
            <input type="text" class="modify-info" v-model="member.memberId">
        </div>
        <div class="nickname">
            <div class="classification">닉네임</div>
            <input type="text" class="modify-info" v-model="member.nickname">
        </div>
        <div class="email">
            <div class="classification">이메일</div>
            <input type="text" class="modify-info" v-model="member.email">
        </div>
        <div class="monthly-budget">
            <div class="classification">월 예산</div>
            <input type="number" class="modify-budget" v-model="member.budget">
        </div>
        <div class="endline"></div>
        <RouterLink to="/my" active-class="active">
            <button type="submit" class="save" @click="changeInfo">저장</button>
        </RouterLink>
    </div>
</template>

<script setup>
    import { RouterLink } from 'vue-router';
    import { ref, onMounted } from 'vue';

    const member = ref({});
    onMounted(async () => {
        const response = await fetch('http://localhost:8080/member');
        member.value = await response.json();
    })

    // function changeInfo() {

    // }
</script>

<style scoped>
    @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap");

    .member-info {
        position: absolute;
        width: 926px;
        height: 269px;
        left: 379px;
        top: 324px;
    }

    .startline {
        width: 926px;
        border: 1.5px solid #ACACAC;

        margin-bottom: 30px;
    }

    .user-id {
        display: flex;
        flex-direction: row;

        height: 32px;
        margin-left: 11px;
    }

    .nickname,
    .email,
    .monthly-budget {
        display: flex;
        flex-direction: row;

        height: 32px;
        margin-left: 11px;
        margin-top: 30px;
    }

    .classification {
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 29px;
        color: #000000;
    }

    .modify-info {
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 29px;
        color: #000000;

        margin-left: 125px;
    }

    .modify-budget {
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 29px;
        color: #000000;

        margin-left: 121px;
    }

    .endline {
        width: 926px;
        border: 1.5px solid #ACACAC;

        margin-top: 30px;
    }

    .save {
        width: 115px;
        height: 32px;
        margin-left: 800px;
        margin-top: 60px;

        background: #9A9AC8;
        border-radius: 16px;
        border: none;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 350;
        font-size: 17px;
        line-height: 25px;
        color: #FFFFFF;

        cursor: pointer;
    }
</style>