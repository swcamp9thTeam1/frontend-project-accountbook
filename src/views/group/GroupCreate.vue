

<template>
    <div class="wrapper">
      <main>
          <div class="container">  
  
              <!-- 가입 양식 -->
                <p class="text1">그룹 명</p>
                <input class="name" placeholder="식비 절약하기">
                <p class="text2">한줄 소개</p>
                <input class="intro" placeholder="식비 절양하는 방법 공유해요!">
          </div>
      </main>
      <div class="sub">
        <button type="submit" class="create-btn">생성</button>
      </div>
    </div>
  </template>
    
  <script setup>
    import { ref, reactive, onMounted } from 'vue';
  
    
  </script>
  
  <style scoped>
    .wrapper {
        display: grid;
        grid-template-rows: 600px 100px;
      margin: 100px 0 0 0;
    }
    .h {
      margin-top: 50px;
      margin-bottom: 50px;
      
    }
    main {
      display: inline-block;
    }
    .container {
      display: grid;
      grid-template-columns: 200px  700px;
      grid-template-rows: repeat(2, 100px);
    }  
    .text1 {
        color: var(--, #101424);
        font-family: "Noto Sans KR";
        font-size: 22px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        align-self: center;
    }
    .text2 {
        color: var(--, #101424);
        font-family: "Noto Sans KR";
        font-size: 22px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        align-self: center;
    }
    .name {
        width: 580px;
        align-self: center;
        font-family: Inter;
        font-size: 22px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        border: none;
        outline: none;
        border-bottom: 1px solid #B1B1D2;

    }
    .intro {
        width: 580px;
        align-self: center;
        font-family: Inter;
        font-size: 22px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        border: none;
        outline: none;
        border-bottom: 1px solid #B1B1D2;
    }
    ::placeholder {
        color: rgba(0, 0, 0, 0.37);
    }
    .sub {
        display: grid;
        grid-template-columns: 780px;
    }
    .create-btn {
        justify-self: right;
        width: 80px;
        height: 50px;
        border-radius: 13px;
        background-color: #101424;
        color: var(--Grays-White, #FFF);
        font-family: "Noto Sans KR";
        font-size: 22px;
        font-style: normal;
        font-weight: 350;
        line-height: normal;
        align-self: right;
    }
</style>
    