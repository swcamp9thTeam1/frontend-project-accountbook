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
		<div class="periodLabel">
			<slot name="label">{{ headerProps.periodLabel }}</slot>
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

defineProps({
	headerProps: {
		type: Object as () => IHeaderProps,
		required: true,
	},
	previousYearLabel: { type: String, default: "<<" },
	previousPeriodLabel: { type: String, default: "<" },
	nextPeriodLabel: { type: String, default: ">" },
	nextYearLabel: { type: String, default: ">>" },
})

const emit = defineEmits<{
	(e: "input", day: Date): void
}>()

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
  font-size: 16px;
  padding: 10px;
}

.cv-wrapper .cv-header-days div {
  padding-bottom: 10px;
}
</style>
