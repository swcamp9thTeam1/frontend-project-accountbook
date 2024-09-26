<template>
    <div>
        <MyPageSideMenu/>
    </div>
    <div class="info">회원정보</div>
    <div class="member-info" id="app">
        <div class="startline"></div>
        <div class="user-id">
            <div class="classification">아이디</div>
            <div class="select-info">{{ myId }}</div>
        </div>
        <div class="nickname">
            <div class="classification">닉네임</div>
            <div class="select-info">{{ myNickname }}</div>
        </div>
        <div class="email">
            <div class="classification">이메일</div>
            <div class="select-info">{{ myEmail }}</div>
        </div>
        <div class="monthly-budget">
            <div class="classification">월 예산</div>
            <div class="select-budget">{{ Number(myBudget).toLocaleString() }} 원</div>
        </div>
        <div class="endline"></div>
        <RouterLink to="/my/edit-info" active-class="active">
            <button type="button" class="modify">수정하기</button>
        </RouterLink>
    </div>
</template>

<script setup>
    import { RouterLink } from 'vue-router';
    import { ref } from 'vue';
    import MyPageSideMenu from '@/components/MyPageSideMenu.vue';

    const myId = ref('iamhong01');
    const myNickname = ref('동에번쩍서에번쩍');
    const myEmail = ref('honggildonng@gmail.com');
    const myBudget = ref('500000');
</script>

<style scoped>
    @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap");
    
    .info {
        position: absolute;
        width: 199px;
        height: 43px;
        left: 290px;
        top: 189px;

        background: #25272F;
        border-radius: 0px 21.5px 21.5px 0px;
        border: none;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 350;
        font-size: 22px;
        line-height: normal;
        text-align: center;
        color: #FFFFFF;
    }

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