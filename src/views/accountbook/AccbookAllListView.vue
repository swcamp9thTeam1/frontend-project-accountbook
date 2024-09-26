<template>
  <div class="parent-container">
    <AccountBookListButtons/>

    <!-- 스크롤 가능한 영역 -->
    <div class="scrollable-content">
      <div v-for="(item, index) in groupedAccbookList" :key="index">
        <!-- 새로운 날짜인 경우 날짜 표시 랜더링 -->
        <AccountBookDays
            v-if="item.isNewDay"
            :date="item.date"
            :totalIn="item.totalIn"
            :totalOut="item.totalOut"
        />

        <!-- 새로운 날짜가 아닌 경우 내역 리스트 랜더링 -->
        <AccountBookList v-if="!item.isNewDay" :item="item.data" />
      </div>
    </div>
  </div>
</template>

<script setup>
import "@/components/accbook/AccountBookList.vue"
import AccountBookList from "@/components/accbook/AccountBookList.vue";
import AccountBookListButtons from "@/components/accbook/AccountBookListButtons.vue";
import AccountBookDays from "@/components/accbook/AccountBookDays.vue";
import {ref, computed, defineProps, onMounted} from 'vue';

const accbookListData = ref([]);

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

onMounted(async () => {
  try {
    // fetch로 json 데이터 가져오기
    const response = await fetch('http://localhost:8080/monthly');
    const data = await response.json();

    // accbookListData에 가져온 데이터 저장
    accbookListData.value = data;

    // 배열을 사용해 아이템 생성
    props.items = groupedAccbookList(data);
  } catch (error) {
    console.error('데이터를 가져오는 중 오류 발생:', error);
  }
});

// 날짜별로 아이템 그룹화
const groupedAccbookList = computed(() => {
  const grouped = [];
  const totals = {}; // 날짜별로 수입 및 지출 총계 저장

  accbookListData.value.forEach(item => {
    const currentDate = new Date(item.createdAt).toISOString().split('T')[0]; // YYYY-MM-DD 형식

    // 날짜에 대한 총계 초기화
    if (!totals[currentDate]) {
      totals[currentDate] = {
        totalIn: 0,
        totalOut: 0,
      };
    }

    // 수입(I)일 경우 totalIn, 지출(O)일 경우 totalOut에 합산
    if (item.financeType === "I") {
      totals[currentDate].totalIn += item.amount;
    } else if (item.financeType === "O") {
      totals[currentDate].totalOut += item.amount;
    }

    // 현재 날짜가 마지막 날짜와 다를 경우 새로운 날짜 추가
    if (grouped.length === 0 || grouped[grouped.length - 1].date !== currentDate) {
      grouped.push({ isNewDay: true, date: currentDate, totalIn: totals[currentDate].totalIn, totalOut: totals[currentDate].totalOut });
    } else {
      grouped[grouped.length - 1].totalIn = totals[currentDate].totalIn;
      grouped[grouped.length - 1].totalOut = totals[currentDate].totalOut;
    }

    // 기존 데이터 추가
    grouped.push({ isNewDay: false, data: item });

  });
  return grouped;
});



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

/* 전체 컨테이너 */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: auto;
  padding: 20px;
}

</style>
