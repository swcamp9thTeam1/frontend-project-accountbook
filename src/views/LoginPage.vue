<template>
    <div class="page2-title">
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
            <p>Login</p>
        </div>
        <form @submit.prevent="handleLogin"> <!-- 폼 제출 시 login 메서드 호출 -->
        <!-- <form> -->
            <label for="username">아이디</label>
            <input type="text" id="username" name="username" v-model="username">
            
            <label for="password">비밀번호</label>
            <input type="password" id="password" name="password" v-model="password">
            
            <button type="submit" class="login-btn">로그인</button>

            <div class="additional-options">
                <div class="auto-login-container">
                    <input type="checkbox" id="auto-login" v-model="autoLogin">
                    <label for="auto-login">자동 로그인</label>
                </div>
                <RouterLink to="/find">
                    <a href="#" class="find-info">아이디/비밀번호 찾기</a>
                </RouterLink>
            </div>

            <div class="sns-login">
                <p>SNS 로그인</p>
                <button type="button" class="kakao-login">
                    <img src="/src/assets/icons/kakao-icon.svg" alt="Kakao Logo" class="kakao-icon">
                    <span>카카오로 간편 로그인</span>
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { RouterLink, useRouter } from 'vue-router';
    import { useAuth } from '@/components/useAuth';

    const { login } = useAuth();
    const username = ref('');  
    const password = ref('');  
    const router = useRouter();

    const autoLogin = ref(false); 

    const handleLogin = async () => {
        const loginData = {
            username: username.value,
            password: password.value 
        };
        try {
    const response = await fetch(`http://localhost:8080/users?username=${loginData.username}&password=${loginData.password}`);
    const users = await response.json();

    if (users.length > 0) {
      login();  // 로그인 시 user 상태를 true로 변경
      localStorage.setItem('nickname', users[0].nickname);
      router.push('/account-book');  // 로그인 후 이동할 페이지
    } else {
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  } catch (error) {
    console.error('로그인 중 오류 발생:', error);
  }
};

//     const login = () => {

//         console.log("Username:", username.value);
//         console.log("Password:", password.value);
//         console.log("Auto Login:", autoLogin.value);
// };

</script>

<style scoped>
    .page2-title {
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
    margin-top: 5%;
    position: absolute;
    left: 25%; 
    transform: translateX(-50%);
    top: 35%;
}

.app-logo {
    width: 130x;
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
    width: 300px;
    padding: 20px;
    margin-top: 100px;
    position: absolute;
    right: 25%; 
    transform: translateX(50%);
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
    cursor: pointer;
}

.login-section h2 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 20px;
}

.login-section form {
    display: flex;
    flex-direction: column;
}

.login-section input[type="text"], 
.login-section input[type="password"] {
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
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
    cursor: pointer;
}

.additional-options {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.auto-login-container {
    display: flex;
    align-items: center;
}

.auto-login-container input {
    margin-right: 5px; 
}

.auto-login-container label {
    font-size: 13px;
}

.find-info {
    color: #666;
    text-decoration: none;
    font-size: 13px;
    font-weight: bold;
}

.sns-login {
    text-align: center;
}

.sns-login p {
    margin-bottom: 10px;
    font-size: 0.9rem;
    color: #666;
} 

.kakao-login {
    background-color: #F7E600;
    color: #000;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    width: 100%;
    display: flex;
    align-items: center;
}

.kakao-login .kakao-icon {
    width: 20px;
    height: 20px;
}

.kakao-login span {
    margin-left: 10px; 
    text-align: center;
    margin-left: -15px;
    flex: 1; 
}

.sns-login p::before,
.sns-login p::after {
    content: '';
    position: absolute;
    top: 82.5%;
    width: 33%; 
    height: 1px;
    background-color: #ccc;
}

.sns-login p::before {
    left: 5%; 
}

.sns-login p::after {
    right: 5%;
}

a {
    text-decoration: none;
}
</style>