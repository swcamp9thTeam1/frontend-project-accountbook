<!-- 회원 정보 수정 화면 -->

<template>
    <form @submit.prevent="submitEdit" class="member-info" id="app">
        <div class="startline"></div>
        <div class="user-id">
            <div class="classification">아이디</div>
            <input type="text" class="modify-info" v-model="memberData.memberId">
        </div>
        <div class="nickname">
            <div class="classification">닉네임</div>
            <input type="text" class="modify-info" v-model="memberData.nickname">
        </div>
        <div class="email">
            <div class="classification">이메일</div>
            <input type="text" class="modify-info" v-model="memberData.email">
        </div>
        <div class="monthly-budget">
            <div class="classification">월 예산</div>
            <input type="number" class="modify-budget" v-model="memberData.budget">
        </div>
        <div class="endline"></div>
    </form>
        <button @click="editInfo" type="submit" class="save">저장</button>
</template>

<script setup>
    import { RouterLink, useRouter } from 'vue-router';
    import { ref, onMounted, } from 'vue';

    const memberData = ref({});
    const router = useRouter();

    // JSON 데이터에서 member 정보 가져오기
    onMounted(async () => {
        const response = await fetch('http://localhost:8080/member');
        memberData.value = await response.json();
    })

    async function editInfo() {
        // 수정된 데이터를 JSON 파일에 반영하는 로직
        const response = await fetch('http://localhost:8080/member', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( memberData.value )      // 수정된 데이터
        });

        if (response.ok) {
            alert('회원 정보가 수정되었습니다.');
            router.push('/my')
        } else {
            alert('회원 정보 수정에 실패했습니다.');
        }
    }
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
        margin-left: 770px;
        margin-top: 600px;

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

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>