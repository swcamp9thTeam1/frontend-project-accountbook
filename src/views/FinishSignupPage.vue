<template>
    <div class="page13-title1">
        <p>회원가입이 완료되었습니다!</p>
        <img src="check.svg" alt="check" class="check-logo">
    </div>
    <div class="page13-title2">
        <p>세이브피그와 함께<br>절약을 습관화 해봐요!</p>
    </div>
    <div class="login-btn">
        <button class="btn">로그인하기</button>
    </div>
</template>

<script setup>

</script>

<style scoped>
.page13-title1 {
    text-align: center;
    position: absolute;
    left: 50%;
    top: 35%; 
    transform: translate(-50%, -50%);
}

.page13-title1 p {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 20px;
}

.check-logo {
    width: 96px; 
    height: 96px;
    margin-top: 20px;
}

.page13-title2 {
    text-align: center;
    position: absolute;
    left: 50%;
    top: 60%; 
    transform: translate(-50%, -50%);
}

.page13-title2 p {
    font-size: 20px;
    font-weight: 400;
    margin-top: 20px;
}

.login-btn .btn {
    width: 300px;
    height: 50px;
    top: 70%;
    left: 40%;
    position: absolute;
    font-size: 20px;
    border-radius: 10px;
    border: none;
    padding: 10px 20px;
    color: white;
    background-color: #25272F;
    font-weight: 300;
}
</style>