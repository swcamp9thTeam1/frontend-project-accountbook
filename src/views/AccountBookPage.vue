<template>
  <div  class="container">
    <div class="calendar-container">
      <div class="calendar-message-container">
        <div class="calendar-message-button">
          <div class="calendar-message">
            {{ nickname }} 님, 남은 예산은 {{ remainingBudget }}원이에요
            <br>
            전체 예산에서 {{ usedBudgetPercentage }}%를 사용했어요
          </div>
          <button class="statistics-button">통계 보러가기</button>

        </div>
        <CustomCalendarView @dateClicked="onDateClicked"/>
      </div>
    </div>
    <div class="image-container">
      <img src="@/assets/icons/accbook-middle-line.svg"/>
    </div>
    <div class="router-container">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import CustomCalendarView from '@/components/calendar/CustomCalendarView.vue';
import { RouterView } from 'vue-router';
import router from "@/router/router.js";
import {onMounted, ref} from "vue";

const nickname = ref('');
const usedBudgetPercentage = ref(0);
const totalBudget = ref(0);       // 전체 예산
const spentBudget = ref(0);       // 사용한 금액
const remainingBudget = ref(0);   // 남은 예산


// 캘린더에서 날짜 클릭 시 라우팅
const onDateClicked = (date) => {
  router.push(`/account-book/daily/${date}`);
};

// 유저 닉네임, 월 예산 가져오기
const fetchUserInfo = async () => {
  try {
    const response = await fetch(`http://localhost:8080/member`);
    const userData = await response.json();

    if (userData) {
      nickname.value = userData.nickname;
      totalBudget.value = userData.budget;
    }
  } catch (error) {
    console.error('유저 정보를 가져오는 중 오류 발생:', error);
  }
};

// 월 지출 합계 가져오기
const fetchUserAmountInfo = async () => {
  try {
    const response = await fetch(`http://localhost:8080/monthly`);
    const accbookList = await response.json();

    if (accbookList) {
      calculateSpentAmount(accbookList);
    }
  } catch (error) {
    console.error('데이터를 가져오는 중 오류 발생:', error);
  }
};

// 지출 합 -> 남은 예산, 예산 사용 비율 계산하기
const calculateSpentAmount = (accbookList) => {
  spentBudget.value = accbookList
      .filter(item => item.financeType === 'O')  // financeType이 'O'인 항목만 필터링
      .reduce((sum, item) => sum + item.amount, 0);  // 필터링된 항목의 amount 합산

  remainingBudget.value = (totalBudget.value - spentBudget.value).toLocaleString();
  usedBudgetPercentage.value = ((spentBudget.value / totalBudget.value) * 100).toFixed(0);
};

onMounted(() => {
  fetchUserInfo();
  fetchUserAmountInfo();
});


</script>

<style scoped>
.container {
  flex: 1;
  display: flex;
  height: calc(100vh - /* header height */ 60px - /* footer height */ 60px);
}

.calendar-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.router-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 20px;
}

nav {
  margin-bottom: 20px;
}

.calendar-message {
  font-size: 15px;
  margin-left: 20px;
  margin-bottom: 20px;

}

.calendar-message-button{
  display: flex;
  flex-direction: row;
  align-items: center;
}

.statistics-button {
  width: 115px;
  height: 32px;
  margin-left: 160px;

  background: #25272f;
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

.image-container {
  position: relative;
  align-items: center;
  height: 100px;
  margin-top: 100px;
}
</style>