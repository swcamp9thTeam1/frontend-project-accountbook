<template>
    <div class="app">
        <div class="semi-title">
            <p>간편하게 기록하고 공유하세요</p>
        </div>
        <div class="eng-title">
            <p>Expense<br>Tracker</p>
            <img src="/src/assets/icons/logo.svg" alt="Save Pig" class="logo">
        </div>
        <div class="title">
            <p>Save Pig</p>
        </div>
        <div class="buttons">
            <button class="login-btn">login</button>
            <button class="signup-btn">sign up</button>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.app {
    margin-left: 5vw;
}
.semi-title p {
    font-size: 2.0vw;
    margin-top: 7%;
    margin-left: 10%;
}

.eng-title {
    display: flex;
    font-size: 2.5vw;
    margin-left: 10%;
    margin-top: -3%;
    font-weight: bold; 
    align-items: center;
}      

.eng-title .logo{
    width: 5%;
    transform: rotate(15deg);
    flex-direction: column;
}

.title p {
    font-size: 2.5vw;
    margin-left: 10%;
    margin-top: -1%;
    margin-bottom: 2%;
    color: #25272F;
    font-weight: 800; 
}

.buttons .login-btn{
    position: relative;
    background-color: #25272F;
    width: 115px;
    height: 35px;
    border: none;
    margin-left: 10%;
    border-radius: 5px;
    color: white;
    cursor: pointer;
}

.buttons .signup-btn {
    position: relative;
    background-color: #EDEFF8;
    width: 115px;
    height: 35px;
    border: none;
    margin-top: -100px;
    margin-left: 3%;
    border-radius: 5px;
    color: #25272F;
    cursor: pointer;
}
</style>