<!-- 회원 정보 조회 화면 -->

<script setup>
    import { RouterLink } from 'vue-router';
    import { onMounted, ref } from 'vue';

    const userNickname = localStorage.getItem('nickname');
    const users = ref([]);
    const loginUser = ref([]);

    onMounted(async () => {
        const response = await fetch('http://localhost:8080/users');
        users.value = await response.json();

        loginUser.value = users.value.filter(user => user.nickname === userNickname);
        console.log(loginUser);
    })
</script>

<template>
    <div v-for="user in loginUser" :key="user.id" class="member-info">
        <div class="startline"></div>
        <div class="user-id">
            <div class="classification">아이디</div>
            <div class="select-info">{{ user.username }}</div>
        </div>
        <div class="nickname">
            <div class="classification">닉네임</div>
            <div class="select-info">{{ user.nickname }}</div>
        </div>
        <div class="email">
            <div class="classification">이메일</div>
            <div class="select-info">{{ user.email }}</div>
        </div>
        <div class="monthly-budget">
            <div class="classification">월 예산</div>
            <div class="select-budget">{{ Number(user.monthlyBudget).toLocaleString() }} 원</div>
        </div>
        <div class="endline"></div>
        <RouterLink to="/my/edit-info" active-class="active">
            <button type="button" class="modify">수정하기</button>
        </RouterLink>
    </div>
</template>

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

    .select-info {
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 29px;
        color: #000000;

        margin-left: 125px;
    }

    .select-budget {
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

    .modify {
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