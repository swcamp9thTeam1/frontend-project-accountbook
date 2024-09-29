<template>
  <div class="cv-header">
    <div class="cv-header-nav">
      <button
          :disabled="!headerProps.previousPeriod"
          class="previousPeriod"
          aria-label="Previous Period"
          @click.prevent="onInput(headerProps.previousPeriod!)">
        <img src="@/assets/icons/calendar-previous-month.svg" alt="Previous Month"/>
      </button>
    </div>
    <div class="periodLabel" @click="handleClickPeriodLabel">
      <slot name="label">{{ customPeriodLabel }}</slot>
    </div>
    <div class="cv-header-nav">
      <button
          :disabled="!headerProps.nextPeriod"
          class="nextPeriod"
          aria-label="Next Period"
          @click.prevent="onInput(headerProps.nextPeriod!)">
        <img src="@/assets/icons/calendar-next-month.svg" alt="Next Month"/>
      </button>
    </div>
  </div>
  <div class="triangle-button">

  </div>
</template>
<script setup lang="ts">
import type { IHeaderProps } from "vue-simple-calendar/dist/src/IHeaderProps";
import {defineProps, defineEmits, onMounted, ref, watch} from 'vue';


const props = defineProps({
  headerProps: {
    type: Object as () => IHeaderProps,
    required: true,
  },
  previousYearLabel: { type: String, default: "<<" },
  previousPeriodLabel: { type: String, default: "<" },
  nextPeriodLabel: { type: String, default: ">" },
  nextYearLabel: { type: String, default: ">>" },
})

const customPeriodLabel = ref('');
const monthMapping: { [key: string]: string } = {
  January: '1월',
  February: '2월',
  March: '3월',
  April: '4월',
  May: '5월',
  June: '6월',
  July: '7월',
  August: '8월',
  September: '9월',
  October: '10월',
  November: '11월',
  December: '12월',
};
import {useRouter} from "vue-router";

const router = useRouter();

// 월 표시 변경하는 메서드
function changeMonth() {
  // 월 변경 ('September 2024' -> '9월')
  const periodLabel = props.headerProps.periodLabel;        // 'September 2024'
  const [month, year] = periodLabel.split(' ');    // 'September'
  customPeriodLabel.value = monthMapping[month] || month;   // '9월'

  // console.log(props.headerProps)
  return customPeriodLabel.value
}

// 월 클릭 시 가계부 메인 페이지(월별 전체 조회)로 이동
const handleClickPeriodLabel = () => {
  router.push('/account-book');
}

// headerProps가 변경될 때마다 changeMonth 호출
watch(() => props.headerProps.periodLabel, () => {
  changeMonth();
});

const emit = defineEmits<{
  (e: "input", day: Date): void
}>()

changeMonth();

const onInput = (d: Date): void => emit("input", d)

</script>
<style>

.cv-header {
  display: ruby;
  flex: 0 1 auto;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  gap: 5em;
  min-height: 2.5em;
  border-width: 1px 1px 0 1px;
  text-align: center;
  font-family: 'Noto Sans KR';
}

.cv-header .periodLabel {
  display: flex;
  flex: 1 1 auto;
  flex-flow: row nowrap;
  min-height: 1.5em;
  line-height: 1;
  align-items: center;
  text-align: center;
  justify-content: center;
}

.cv-header,
.cv-header button {
  border-style: solid;
  border-color: transparent;
}

.cv-header-nav,
.cv-header .periodLabel {
  margin: 0.1em 0.6em;
}

.cv-header-nav button,
.cv-header .periodLabel {
  padding: 0.4em 0.6em;
}

.cv-header button {
  box-sizing: border-box;
  line-height: 1em;
  font-size: 1em;
  border-width: 1px;
  background-color: #F9F9FF;
}

.theme-default .cv-header, .theme-default .cv-header-day {
  background-color: #F9F9FF;
}

.theme-default .cv-header, .theme-default .cv-header-day {
  font-size: 12px;
  padding: 10px;
}

.cv-wrapper .cv-header-days div {
  padding-bottom: 10px;
}
</style>
