<template>
  <div class="parent-container">
    <AccountBookListButtons/>
    <div class="scrollable-content" v-if="accbookListData.length > 0">
      <AccountBookDays
          :date="date"
          :totalIn="totalIn"
          :totalOut="totalOut"
      />
      <AccountBookList
          v-for="accbook in accbookListData"
          :item="accbook"
          @itemClicked="goDetailView"
      />
    </div>
    <div
        class="no-result"
        v-else>{{date}}에 저장된 가계부가 없습니다</div>
  </div>


</template>

<script setup>
import {useRoute} from "vue-router";
import AccountBookList from "@/components/accbook/AccountBookList.vue";
import {ref, watch} from "vue";
import router from "@/router/router.js";
import AccountBookDays from "@/components/accbook/AccountBookDays.vue";
import AccountBookListButtons from "@/components/accbook/AccountBookListButtons.vue";

const route = useRoute();
const date = ref(route.params.date);
const accbookListData = ref([]);

const totalIn = ref(0);
const totalOut = ref(0);

// 캘린더에서 클릭한 날짜의 데이터를 호출하는 함수
const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:8080/daily');
    const dailyData = await response.json();
    const specificDateData = dailyData[date.value]; // 클릭한 날짜 값만 가져오기

    // 해당 날짜 데이터가 없으면 빈 배열로 설정
    accbookListData.value = specificDateData || [];

    // 수입, 지출 합계 계산
    totalIn.value = 0;
    totalOut.value = 0;

    accbookListData.value.forEach(item => {
      if (item.financeType === 'I') {
        totalIn.value += item.amount;
      } else if (item.financeType === 'O') {
        totalOut.value += item.amount;
      }
    })

  } catch (error) {
    console.error('데이터를 가져오는 중 오류 발생:', error);
  }
};

// date가 변경될 때마다 fetchData 호출
watch(
    // date가 변경되는지 watch
    () => route.params.date,

    // date가 변경되면 업데이트 후 fetchData
    (newDate) => {
      date.value = newDate;
      fetchData();
    }
);

// 초기 데이터 가져오기
fetchData();

// 상세조회 페이지로 이동
const goDetailView = (id) => router.push(`/account-book/detail/${id}`);

</script>

<style scoped>
.parent-container {
  height: 80vh;
  display: flex;
  flex-direction: column;
}

/* 스크롤 가능한 영역 (스크롤바 숨기기) */
.scrollable-content {
  flex-grow: 1;
  overflow-y: scroll;
  padding-right: 10px;
}

.scrollable-content::-webkit-scrollbar {
  display: none;
}

.scrollable-content {
  scrollbar-width: none;
}

.no-result {
  width: 520px;
  font-family: "Noto Sans KR", sans-serif;
  text-align: center;
  margin-top: 100px;
}
</style>