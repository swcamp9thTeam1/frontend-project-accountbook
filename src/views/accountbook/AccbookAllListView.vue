<template>
  <div class="parent-container">
    <AccountBookListButtons/>

    <!-- 스크롤 가능한 영역 -->
    <div class="scrollable-content">
      <div v-for="(item, index) in groupedAccbookList" :key="index">
        <!-- 새로운 날짜인 경우 날짜 표시 랜더링 -->
        <AccountBookDays v-if="item.isNewDay" :date="item.date" />

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
    // title: String,
  }
});

onMounted(async () => {
  try {
    // fetch로 json 데이터 가져오기
    const response = await fetch('http://localhost:8080/result');
    const data = await response.json();

    // accbookListData에 가져온 데이터 저장
    accbookListData.value = data;

    // result 배열을 사용해 아이템 생성
    props.items = groupedAccbookList(data); // null 이므로 생성할 필요X
    console.log("View grouped: ", grouped);


    console.log(accbookListData)
  } catch (error) {
    console.error('데이터를 가져오는 중 오류 발생:', error);
  }
});


// 날짜별로 아이템 그룹화
const groupedAccbookList = computed(() => {
  const grouped = [];
  let lastDate = '';

  accbookListData.value.forEach(item => {
    const currentDate = new Date(item.createdAt).toISOString().split('T')[0]; // YYYY-MM-DD 형식
    if (currentDate !== lastDate) {
      grouped.push({ isNewDay: true, date: currentDate });
      lastDate = currentDate;
    }
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
