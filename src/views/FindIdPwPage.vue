<template>
    <div class="page5-title">
        <p>반가워요!<br>세이브피그와 절약해봐요!!</p>
    </div>
    <div class="logo">
        <img src="/src/assets/icons/logo.svg" alt="Save Pig" class="app-logo">
    </div>

    <div class="divider"></div>

    <div class="login-section">
        <div class="b">
            <RouterLink to="/login">
                <img src="/src/assets/icons/back-logo.svg" alt="arrow" class="arrow">
            </RouterLink>
        </div>
        <div class="tabs">
            <!-- <button class="tab active">아이디 찾기</button>
            <button class="tab">비밀번호 찾기</button> -->
            <button class="tab" :class="{ active: activeTab === '아이디 찾기' }" @click="activeTab = '아이디 찾기'">아이디 찾기</button>
            <button class="tab" :class="{ active: activeTab === '비밀번호 찾기' }" @click="activeTab = '비밀번호 찾기'">비밀번호 찾기</button>
        </div>

        <div class="form-section">
            <input type="email" placeholder="이메일 입력 (example@savepig.com)" class="email-input">
            <button class="verify-btn">인증하기</button>
        </div>
    </div>
</template>

<script setup>
    import {ref} from 'vue';
    import {RouterLink} from 'vue-router';

    const activeTab = ref('아이디 찾기');
</script>

<style scoped>
.page5-title {
    text-align: center;
    margin-top: 90px;
    font-size: 28px;
    line-height: 1.5;
    font-weight: bold;
    position: absolute;
    top: 15%;
    left: 25%; 
    transform: translateX(-50%);
}

.logo {
    display: flex;
    justify-content: center;
    margin-top: 70px;
    position: absolute;
    left: 25%; 
    transform: translateX(-50%);
    top: 35%;
}

.app-logo {
    width: 130px;
    height: 130px;
}

.divider {
    border-left: 1px solid #ACACAC;
    position: absolute;
    top: 100px; 
    bottom: 100px; 
    left: 50%;
    margin-left: -1px; 
}

.login-section {
    position: absolute;
    right: 0;
    width: 50%; 
    height: 100%; 
    padding: 20px;
    margin-top: 5%;
    box-sizing: border-box; 
}

.login-section .a {
    margin-top: 75px;
    display: flex;
    justify-content: flex-start;
}

.login-section .arrow {
    width: 25px;
    height: 25px;
}

.login-section .tabs {
    display: flex;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
}

.login-section .tab {
    flex: 1;
    padding: 10px;
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all 0.3s ease;
}

.login-section .tab.active {
    font-weight: bold;
    border-bottom: 2px solid #000;
}

.login-section .form-section {
    display: flex;
    align-items: center;
}

.login-section .email-input {
    flex: 1;
    padding: 10px;
    font-size: 14px;
    border: none;
    border-bottom: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
    outline: none; 
}

.login-section .verify-btn {
    padding: 10px 20px;
    background-color: #25272F;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>