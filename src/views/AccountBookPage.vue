<template>
    <div  class="container">
      <div class="calendar-container">
            <CustomCalendarView @dateClicked="onDateClicked"/>
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

// 캘린더에서 날짜 클릭 시 라우팅
const onDateClicked = (date) => {
  router.push(`/account-book/daily/${date}`);
};

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
</style>