<template>
  <div>
    <CalendarView
        :show-date="showDate"
        :starting-day-of-week="0"
        :items="state.items"
        :weekday-name-format="'short'"
        :locale="'en-US'"
        @clickDate="handleClickDate"
        :current-period-label="themeOptions.currentPeriodLabel"
        :class="`theme-${state.theme}`"
        class="theme-default holiday-us-traditional holiday-us-official">

      <!-- 헤더 슬롯 -->
      <template #header="{ headerProps }">
        <CustomCalendarViewHeader
            :previous-period-label="themeOptions.previousPeriodLabel"
            :header-props="headerProps"
            :next-period-label="themeOptions.nextPeriodLabel"
            @input="setShowDate"
        />
      </template>

      <!-- 날짜 슬롯 -->
      <template #day-content="{ day }">
        <div :class="[getEvaluationClass(day)]">
          {{ day.getDate()}}
        </div>
      </template>
    </CalendarView>
  </div>
  <div>
    {{ state.message }}
  </div>
</template>

<script setup>
import {CalendarView} from 'vue-simple-calendar';
import {ref, computed, reactive, onMounted, defineEmits, toRaw } from 'vue';

import 'vue-simple-calendar/dist/style.css';
import 'vue-simple-calendar/dist/css/default.css';
import 'vue-simple-calendar/dist/css/holidays-us.css';
import CustomCalendarViewHeader from '@/components/calendar/CustomCalendarViewHeader.vue';
import router from "@/router/router.js";

const showDate = ref(new Date());
const emit = defineEmits(['dateClicked']);
const accbookdata = ref([]);

const setShowDate = (d) => {
  showDate.value = d;
};

const state = reactive({
  theme: "gcal",
  items: []  // items의 초기값을 빈 배열로 설정
});

const themeOptions = computed(() => state.theme === "gcal"
    ? {
      top: "2.6em",
      height: "2.1em",
      border: "0px",
      previousYearLabel: "\uE5CB\uE5CB",
      previousPeriodLabel: "\uE5CB",
      nextPeriodLabel: "\uE5CC",
      nextYearLabel: "\uE5CC\uE5CC",
      currentPeriodLabel: "Today",
    }
    : {
      top: "1.4em",
      height: "1.4em",
      border: "2px",
      previousYearLabel: "<<",
      previousPeriodLabel: "<",
      nextPeriodLabel: ">",
      nextYearLabel: ">>",
      currentPeriodLabel: "",
    }
);

// 수입/지출 아이템을 생성하는 메서드
const createCalendarItems = (accbookdata) => {
  var items = [];
  accbookdata.forEach((entry) => {
    const startDay = new Date(entry.dailyDate);
    const endDay = new Date(entry.dailyDate);

    // totalIAmount가 0이 아니면 수입 아이템 생성
    if (entry.totalIAmount !== 0) {
      const inItem = {
        id: `${entry.dailyDate}-I`,
        title: `+${entry.totalIAmount.toLocaleString()}`,
        startDate: startDay,
        endDate: endDay,
        classes: ['item-in', 'item-top'],
      };
      items.push(inItem);
    }
    // totalOAmount가 0이 아니면 지출 아이템 생성
    if (entry.totalOAmount !== 0) {
      const outItem = {
        id: `${entry.dailyDate}-O`,
        title: `-${entry.totalOAmount.toLocaleString()}`,
        startDate: startDay,
        endDate: endDay,
        classes: ['item-out', 'item-top'],
      };
      items.push(outItem);
    }
  });

  return items;
};

// 평가에 따른 클래스 이름을 반환하는 메서드
const getEvaluationClass = (date) => {
  const todayString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  const entry = accbookdata.value.find(item => item.dailyDate === todayString);

  if (!entry) {
    return 'cv-day-no-eval'; // entry가 null인 경우
  }

  const rawEntry = toRaw(entry);

  // evaluation이 null인 경우 'cv-day-no-eval' 클래스를 반환
  if (rawEntry.evaluation === null || rawEntry.evaluation === undefined) {
    return 'cv-day-no-eval';
  }

  return rawEntry.evaluation === "Good" ? 'cv-day-good' : 'cv-day-bad';
}

// 서버에서 평가 데이터를 가져오는 메서드
const fetchMonthlyEvalData = async () => {
  try {
    const response = await fetch('http://localhost:8080/monthly-eval');
    if (!response.ok) {
      throw new Error('데이터 가져오기 실패');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('데이터를 가져오는 중 오류 발생:', error);
    return null;
  }
};

// accbookdata와 state.items를 업데이트하는 메서드
const updateCalendarItems = (data) => {
  if (data) {
    // accbookdata 업데이트
    accbookdata.value = data;

    // result 배열을 사용해 아이템 생성
    state.items = createCalendarItems(data);
  }
};

onMounted(async () => {
  const data = await fetchMonthlyEvalData(); // 데이터 가져오기
  updateCalendarItems(data); // 캘린더 아이템 업데이트
});

const handleClickDate = (day) => {
  const todayString = `${day.getFullYear()}-${(day.getMonth() + 1).toString().padStart(2, '0')}-${day.getDate().toString().padStart(2, '0')}`;

  // 날짜 클릭 시 부모 컴포넌트로 이벤트 전달 (부모 컴포넌트에서 라우팅 처리)
  emit('dateClicked', todayString);
}

</script>

<style>

.cv-wrapper {
  width: 607px;
  height: 496px;
  left: 88px;
  top: 308px;
  background: #F9F9FF;
  border-radius: 30px;
  font-family: 'Noto Sans KR';
  box-shadow: 0px 0px 7px 1px #DFDFF5;
  border: none;
  cursor: pointer;
  margin: 10px;

  padding-top: 20px;
  padding-bottom: 10px;
  padding-left: 40px;
  padding-right: 40px;
}


/* item margin용 css */
.item-top {
  margin-top: 20px; /* 최상위 아이템에만 주는 margin 값 */
}

.item-in {
  color: #0A88BE;
}

.item-out {
  color: #FF6D6D;
}

.cv-header-days,
.cv-header-day,
.cv-weeks,
.cv-week,
.cv-day,
.cv-item {
  border-style: solid;
  border-color: #F9F9FF;
  background-color: #F9F9FF;
  font-size: 14px;
}

.vc-header .cv-header-days {
  background-color: #F9F9FF;
}

.theme-default .cv-item {
  background-color: transparent;
  border-color: transparent;
  font-size: 12px;
  text-align: center;
}

.theme-default .cv-day.past {
  background-color: #F9F9FF;
}

.cv-wrapper, .cv-wrapper div {
  box-sizing: border-box;
  line-height: 1em;
  font-size: 16px;
  text-align: center;
  //margin-top: 5px;
}

.theme-gcal .cv-item {
  border-color: transparent;
  border-radius: 0.25em;
  background-color: transparent;
  padding-top: 0.325em;
  padding-bottom: 0.325em;
  padding-left: 0.6em;

  font-size: 10px;
}

.cv-day {
  display: flex;

  font-weight: 400;
  font-size: 16px;
  line-height: 24px;

  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0;
  //position: relative;
  position: sticky;
  top: 0;
  border-width: 1px 1px 0 0;
  direction: initial;
  padding-right: 5px;

  justify-content: center;
}

.cv-day-number {
  width: 0px;
  height: 0px;

  /* 캘린더에 기본으로 표시되는 day number를 hidden으로 변경 */
  visibility: collapse;
}

.cv-day-good {
  background-color: rgba(10, 136, 190, 0.27);
  height: 30px;
  width: 30px;
  border-radius: 50%;
  font-size: 10px;
  padding-top: 5px;
}

.cv-day-bad {
  background-color: rgba(247, 68, 71, 0.27);
  font-size: 14px;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  padding-top: 5px;
}

.cv-day-no-eval {
  background-color: transparent;
  font-size: 14px;
  height: 30px;
  width: 30px;
  border-radius: 50%;
}

.cv-day.outsideOfMonth {
  visibility: hidden;
  height: 0;
  overflow: hidden;
}

.theme-default .cv-day.today {
  background-color: #F9F9FF
}
</style>