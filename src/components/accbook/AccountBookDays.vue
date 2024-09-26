<template>
  <div class="day-stats">
    <div class="day">{{ date }}</div>
    <div class="stats-container">
      <div class="stats-in">+{{ totalIn }}원</div>
      <div class="stats-out">-{{ totalOut }}원</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  date: {
    type: String,
    required: true
  },
  totalIn: {
    type: Number,
    required: true
  },
  totalOut: {
    type: Number,
    required: true
  }
});
</script>

<style scoped>
/* 일일 통계(날짜, 하루의 수입과 지출 총액)  */
.day-stats {
  //position: absolute;
  //width: 512px;
  //height: 26px;
  //left: 820px;
  //top: 216px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin-bottom: 10px;
  margin-top: 20px;
}

.day {
  //position: absolute;
  margin-left: 8px;
  margin-top: 10px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-wrap: nowrap;
  color: #000000;
}

.stats-container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  column-gap: 0;
}

.stats-in {
  margin-right: 8px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  text-align: right;
  color: #505050;
}

.stats-out {
  margin-right: 8px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
  text-align: right;
  color: #505050;
}
</style>