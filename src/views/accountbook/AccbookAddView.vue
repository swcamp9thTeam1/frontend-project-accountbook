<template>
  <div class="parent-container">
    <AccountBookListButtons/>
    <div class="page-title">가계부 작성</div>
    <AccountBookCreate/>
  </div>

</template>

<script setup>

import AccountBookCreate from "@/components/accbook/AccountBookCreate.vue";
import AccountBookListButtons from "@/components/accbook/AccountBookListButtons.vue";
</script>

<style scoped>
.parent-container {
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* 작성 부분 상단의 "가계부 작성" 텍스트 */
.page-title {
  position: relative;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
  margin-left: 50px;
  align-self: flex-start;
}
</style>