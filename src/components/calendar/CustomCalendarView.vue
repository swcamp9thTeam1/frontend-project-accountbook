<template>
    <div>
        <CalendarView 
            :show-date="showDate" 
            :starting-day-of-week="0"
            :items="state.items"
            @clickDate="onClickDate"
            class="theme-default holiday-us-traditional holiday-us-official">
            <template #header="{ headerProps }">
                <CustomCalendarViewHeader 
                    :previous-period-label="themeOptions.previousPeriodLabel" 
                    :header-props="headerProps"
                    :next-period-label="themeOptions.nextPeriodLabel"
                    @input="setShowDate" 
                    />
            </template>
        </CalendarView>
    </div>
    <div>
    {{ state.message }}
</div>

</template>

<script setup>
import { CalendarView } from 'vue-simple-calendar';
import { ref, computed, reactive, onMounted, defineEmits } from 'vue';

import 'vue-simple-calendar/dist/style.css';
import 'vue-simple-calendar/dist/css/default.css';
import 'vue-simple-calendar/dist/css/holidays-us.css';
import CustomCalendarViewHeader from '@/components/calendar/CustomCalendarViewHeader.vue';
import router from "@/router/router.js";

const showDate = ref(new Date());
const emit = defineEmits(['dateClicked']);
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

    // console.log(items);
    return items;
};

// 초기 데이터 생성
const accbookdata = ref([]);

onMounted(async () => {
    try {
        // fetch로 json 데이터 가져오기
        const response = await fetch('http://localhost:8080/monthly-eval');
        const data = await response.json(); 

        // accbookdata에 가져온 데이터 저장
        accbookdata.value = data;

        // result 배열을 사용해 아이템 생성
        state.items = createCalendarItems(data); 
    } catch (error) {
        console.error('데이터를 가져오는 중 오류 발생:', error);
    }
});

const onClickDate = (day) => {
  const todayString = `${day.getFullYear()}-${(day.getMonth() + 1).toString().padStart(2, '0')}-${day.getDate().toString().padStart(2, '0')}`;
  // console.log("You clicked:", todayString);

  // 날짜 클릭 시 부모 컴포넌트로 이벤트 전달 (부모 컴포넌트에서 라우팅 처리)
  emit('dateClicked', todayString);
}

</script>

<!-- <style scoped> -->
<style>

.cv-wrapper {
	width: 607px;
	height: 496px;
	left: 88px;
	top: 308px;
	background: #F9F9FF;
	border-radius: 30px;
  font-family: 'Noto Sans KR';
}


/* item margin용 css */
.item-top {
    margin-top: 10px; /* 최상위 아이템에만 주는 margin 값 */
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

.cv-day.good {
    margin-top: 0.25rem;
    background-color: #1a73e8;
    color: #fff;
}
.cv-day.bad {
    margin-top: 0.25rem;
    background-color: #1a73e8;
    color: #fff;
}
.theme-default .cv-item {
    background-color: transparent;
    border-color: transparent;
    font-size: 14px;
    text-align: center;
}
.theme-default .cv-day.past {
    background-color: #F9F9FF;
}

.cv-wrapper, .cv-wrapper div {
    box-sizing: border-box;
    line-height: 1em;
    font-size: 20px;
    text-align: center;
}

.theme-gcal .cv-item {
    border-color: transparent;
    border-radius: 0.25em;
    background-color: transparent; /* 배경 투명 */
    padding-top: 0.325em;
    padding-bottom: 0.325em;
    padding-left: 0.6em;

    /* Figma Css 추가 */
    font-size: 10px;
}

.cv-day {
	display: flex;

	/* Font 크기 설정 */
	font-weight: 400;
	font-size: 20px;
	line-height: 24px;

	/* Shorthand flex: 1 1 0 not supported by IE11 */
	flex-grow: 1;
	flex-shrink: 0;
	flex-basis: 0;
	position: relative; /* Fallback for IE11, which doesn't support sticky */
	position: sticky; /* When week's items are scrolled, keep the day content fixed */
	top: 0;
	border-width: 1px 1px 0 0;

	/* Restore user's direction setting (overridden for week) */
	direction: initial;
	
}

.cv-day-number {
    font-size: 10px;
}

.cv-day.outsideOfMonth {
    visibility: hidden; /* 요소는 숨기되 공간은 차지함 */
    height: 0; /* 높이를 0으로 설정 */
    overflow: hidden; /* 넘치는 내용은 숨김 */
}

.theme-default .cv-day.today {
    background-color: #F9F9FF
}

</style>
