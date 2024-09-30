<!-- 회원 정보 수정 화면 -->

<template>
    <form @submit.prevent="submitEdit" class="member-info" id="app">
        <div class="startline"></div>
        <div class="user-id">
            <div class="classification">아이디</div>
            <input type="text" class="modify-info" v-model="loginUser.username">
        </div>
        <div class="nickname">
            <div class="classification">닉네임</div>
            <input type="text" class="modify-info" v-model="loginUser.nickname">
        </div>
        <div class="email">
            <div class="classification">이메일</div>
            <input type="text" class="modify-info" v-model="loginUser.email">
        </div>
        <div class="monthly-budget">
            <div class="classification">월 예산</div>
            <input type="number" class="modify-budget" v-model="loginUser.monthlyBudget">
        </div>
        <div class="endline"></div>
    </form>
        <button @click="editInfo" type="submit" class="save">저장</button>
</template>

<script setup>
    import { RouterLink, useRouter } from 'vue-router';
    import { ref, onMounted, } from 'vue';

    const userNickname = localStorage.getItem('nickname');
    const users = ref([]);
    const loginUser = ref({});
    const router = useRouter();

    // 로그인한 user의 정보 가져오기
    onMounted(async () => {
        const response = await fetch('http://localhost:8080/users');
        users.value = await response.json();

        loginUser.value = users.value.find(user => user.nickname === userNickname);
    })

    async function editInfo() {
        const index = users.value.findIndex(user => user.id === loginUser.value.id);
        if (index !== -1) {
            users.value[index] = { ...loginUser.value };    // 수정된 데이터로 업데이트
        }

        // 수정된 데이터를 JSON 파일에 반영하는 로직
        const response = await fetch(`http://localhost:8080/users/${loginUser.value.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginUser.value)      // 수정된 데이터
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