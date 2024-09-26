<!-- <template>
    <div class="page10-title">
        <p>반가워요!<br>세이브피그와 절약해봐요!!</p>
    </div>
    <div class="logo">
        <img src="/src/assets/icons/logo.svg" alt="Save Pig" class="app-logo">
    </div>

    <div class="divider"></div>

    <div class="login-section">
        <div class="a">
            <RouterLink to="/">
                <img src="/src/assets/icons/back-logo.svg" alt="arrow" class="arrow">
            </RouterLink>
            <p>Create Account</p>
        </div>
            <form @submit.prevent="signup">
            <label for="username">아이디</label>
            <input type="text" id="username" name="username" v-model="username">
            
            <div class="auto-login-container"> 
                <input type="checkbox" id="idConfirm" name="idConfirm" v-model="idConfirm">
                <label for="auto-login">중복확인</label>
            </div>  
            
            <label for="password">비밀번호</label>
            <input type="password" id="password" name="password" v-model="password">

            <label for="password-conform">비밀번호 확인</label>
            <input type="password" id="passwordConfirm" name="passwordConfirm" v-model="passwordConfirm">

            <label for="nickname">닉네임</label>
            <input type="nickname" id="nickname" name="nickname" v-model="nickname">
            <div class="auto-login-container"> 
                <input type="checkbox" id="auto-login" v-model="autoLogin">
                <label for="auto-login">중복확인</label>
            </div> 

            <label for="email">이메일</label>
            <input type="email" id="email" name="email" placeholder="gildonnggii@naver.com" v-model="email">

            <div class="auth">
                <input type="auth" id="auth" name="auth" v-model="auth">
                <button class="verify-btn">인증하기</button>
            </div>

            <button type="submit" class="login-btn">회원가입</button>

            <p>이미 계정이 있나요? <button class="highlight">로그인 하기</button></p>
        </form>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { RouterLink } from 'vue-router';
    

    const username = ref('');  
    const idConfirm = ref(false);
    const password = ref('');
    const passwordConfirm = ref('');  
    const nickname = ref('');
    const autoLogin = ref(false); 
    const email = ref('');
    const auth = ref('');



    const signup = async () => {
    
    const user = {
        username: username.value,
        password: password.value,
        passwordConfirm: passwordConfirm.value,
        nickname: nickname.value,
        email: email.value,
        idConfirm: idConfirm.value,
        autoLogin: autoLogin.value,
        auth: auth.value
    };

    try {
        const response = await fetch('http://localhost:8080/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            console.log('회원가입 성공:', await response.json());
        } else {
            console.error('회원가입 실패:', response.statusText);
        }
    } catch (error) {
        console.error('회원가입 중 오류 발생:', error);
    }
};
</script>

<style scoped>
    .page10-title {
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
    width: 45%; 
    height: 100%; 
    padding: 20px;
    margin-right: 37px;
    top: 6%;
    box-sizing: border-box; 
}

.login-section .a {
    display: flex;
    align-items: center; 
}

.login-section .arrow {
    width: 25px;
    height: 25px;
    margin-left: -50px;
    margin-right: 30px;
}

.login-section .a p {
    font-size: 30px;
}


.back-button {
    font-size: 1.5rem;
    color: #000;
    text-decoration: none;
    display: block;
    margin-bottom: 20px;
}

.login-section h2 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 20px;
}

.login-section form {
    display: flex;
    flex-direction: column;
    margin-top: -20px;
}

.login-section input[type="text"], 
.login-section input[type="password"],
.login-section input[type="nickname"], 
.login-section input[type="email"] {
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
}

.login-section input[type="auth"] {
    padding: 10px;
    width: 500px;
    margin-bottom: 15px;
    border: none;
    border-bottom: 1px solid #ccc;
    border-radius: 5px;
    outline: none; 
    text-decoration: none;
}

.auth .verify-btn {
    padding: 10px 20px;
    background-color: #ACACAC;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
}

.login-btn {
    background-color: #25272F;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    margin-bottom: 20px;
    text-align: center;
}

.auto-login-container {
    display: flex;
    align-items: center;
    margin-top: -15px;
    margin-bottom: 20px;
}

.auto-login-container input {
    margin-right: 5px;
}

.auto-login-container label {
    font-size: 13px;
}

.login-section p {
    display: inline;
    font-size: 12px;
    flex-direction: column;
    text-align: center;
}

.login-section .highlight {
    display: inline; 
    color: blue;
    border: none;
    background: none;
    flex-direction: column;
    cursor: pointer
}
</style> -->

<template>
    <div class="page10-title">
        <p>반가워요!<br>세이브피그와 절약해봐요!!</p>
    </div>
    <div class="logo">
        <img src="/src/assets/icons/logo.svg" alt="Save Pig" class="app-logo">
    </div>

    <div class="divider"></div>

    <div class="login-section">
        <div class="a">
            <RouterLink to="/">
                <img src="/src/assets/icons/back-logo.svg" alt="arrow" class="arrow">
            </RouterLink>
            <p>Create Account</p>
        </div>

        <form @submit.prevent="signup">
            <label for="username">아이디</label>
            <input type="text" id="username" name="username" v-model="username">
            <div v-if="usernameError" class="error">{{ usernameError }}</div>
            
            <div class="auto-login-container"> 
                <input type="checkbox" id="idConfirm" name="idConfirm" v-model="idConfirm">
                <label for="idConfirm">중복확인</label>

            </div>  
            
            <label for="password">비밀번호</label>
            <input type="password" id="password" name="password" v-model="password">

            <label for="password-confirm">비밀번호 확인</label>
            <input type="password" id="passwordConfirm" name="passwordConfirm" v-model="passwordConfirm">
            <div v-if="passwordError" class="error">{{ passwordError }}</div>

            <label for="nickname">닉네임</label>
            <input type="nickname" id="nickname" name="nickname" v-model="nickname">
            <div class="auto-login-container"> 
                <input type="checkbox" id="auto-login" v-model="autoLogin">
                <label for="auto-login">중복확인</label>
            </div> 
            <div v-if="nicknameError" class="error">{{ nicknameError }}</div>

            <label for="email">이메일</label>
            <input type="email" id="email" name="email" placeholder="gildonnggii@naver.com" v-model="email">

            <div class="auth">
                <input type="auth" id="auth" name="auth" v-model="auth">
                <button type="button" @click="verifyCode" class="verify-btn">인증하기</button>
            </div>

            <button type="submit" class="login-btn">회원가입</button>

            <p>이미 계정이 있나요? <button class="highlight">로그인 하기</button></p>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import Confirm from '@/components/Confirm.vue'; // import Confirm.vue component

const router = useRouter();

const username = ref('');  
const idConfirm = ref(false);
const password = ref('');
const passwordConfirm = ref('');  
const nickname = ref('');
const autoLogin = ref(false); 
const email = ref('');
const auth = ref('');
const verified = ref(false);

const usernameError = ref('');
const passwordError = ref('');
const nicknameError = ref('');

const verifyCode = () => {
    if (auth.value) {
        // 인증 코드가 무엇이든 성공했다고 가정
        verified.value = true;
        alert('인증이 완료되었습니다.');
    } else {
        alert('인증 번호를 입력해주세요.');
    }
};

const validate = () => {
    let valid = true;

    // 아이디 중복 확인 (예시: idConfirm이 false면 중복된 것으로 처리)
    if (!idConfirm.value) {
        usernameError.value = '아이디가 중복되었습니다.';
        valid = false;
    } else {
        usernameError.value = '';
    }

    // 비밀번호 확인
    if (password.value !== passwordConfirm.value) {
        passwordError.value = '비밀번호가 일치하지 않습니다.';
        valid = false;
    } else {
        passwordError.value = '';
    }

    // 닉네임 중복 확인 (예시: nicknameConfirm이 false면 중복된 것으로 처리)
    if (!nicknameConfirm.value) {
        nicknameError.value = '닉네임이 중복되었습니다.';
        valid = false;
    } else {
        nicknameError.value = '';
    }

    return valid;
};

const signup = async () => {
    if (!verified.value) {
        alert('인증을 먼저 완료해주세요.');
        return;
    }

        if (!validate()) {
        return; // 유효성 검증 실패 시, 회원가입 중단
    }

    const user = {
        username: username.value,
        password: password.value,
        passwordConfirm: passwordConfirm.value,
        nickname: nickname.value,
        email: email.value,
        idConfirm: idConfirm.value,
        autoLogin: autoLogin.value,
        auth: auth.value
    };

    try {
        const response = await fetch('http://localhost:8080/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            console.log('회원가입 성공:', await response.json());
            router.push('/confirm'); // 회원가입 성공 시 Confirm 페이지로 이동
        } else {
            console.error('회원가입 실패:', response.statusText);
        }
    } catch (error) {
        console.error('회원가입 중 오류 발생:', error);
    }
};
</script>

<style scoped>
    .page10-title {
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
    width: 45%; 
    height: 100%; 
    padding: 20px;
    margin-right: 37px;
    top: 6%;
    box-sizing: border-box; 
}

.login-section .a {
    display: flex;
    align-items: center; 
}

.login-section .arrow {
    width: 25px;
    height: 25px;
    margin-left: -50px;
    margin-right: 30px;
}

.login-section .a p {
    font-size: 30px;
}


.back-button {
    font-size: 1.5rem;
    color: #000;
    text-decoration: none;
    display: block;
    margin-bottom: 20px;
}

.login-section h2 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 20px;
}

.login-section form {
    display: flex;
    flex-direction: column;
    margin-top: -20px;
}

.login-section input[type="text"], 
.login-section input[type="password"],
.login-section input[type="nickname"], 
.login-section input[type="email"] {
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
}

.login-section input[type="auth"] {
    padding: 10px;
    width: 500px;
    margin-bottom: 15px;
    border: none;
    border-bottom: 1px solid #ccc;
    border-radius: 5px;
    outline: none; 
    text-decoration: none;
}

.auth .verify-btn {
    padding: 10px 20px;
    background-color: #ACACAC;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
}

.login-btn {
    background-color: #25272F;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    margin-bottom: 20px;
    text-align: center;
}

.auto-login-container {
    display: flex;
    align-items: center;
    margin-top: -15px;
    margin-bottom: 20px;
}

.auto-login-container input {
    margin-right: 5px;
}

.auto-login-container label {
    font-size: 13px;
}

.login-section p {
    display: inline;
    font-size: 12px;
    flex-direction: column;
    text-align: center;
}

.login-section .highlight {
    display: inline; 
    color: blue;
    border: none;
    background: none;
    flex-direction: column;
    cursor: pointer
}
</style> 