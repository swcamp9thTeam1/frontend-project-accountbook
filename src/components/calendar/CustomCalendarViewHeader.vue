<template>
	<div class="cv-header">
		<div  class="cv-header-nav">
			<button
				:disabled="!headerProps.previousPeriod"
				class="previousPeriod"
				aria-label="Previous Period"
				@click.prevent="onInput(headerProps.previousPeriod!)">
				<
			</button>
		</div>
		<div class="periodLabel">
			<slot name="label">{{ headerProps.periodLabel }}</slot>
		</div>
		<div>
			<button 
				:disabled="!headerProps.nextPeriod" 
				class="nextPeriod" 
				aria-label="Next Period" 
				@click.prevent="onInput(headerProps.nextPeriod!)">
                >
			</button>
		</div>
	</div>
</template>
<script setup lang="ts">
import { IHeaderProps } from "vue-simple-calendar/dist/src/IHeaderProps";

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
	display: flex;
	flex: 0 1 auto;
	flex-flow: row nowrap;
	align-items: center;
	justify-content: space-between;
	min-height: 2.5em;
	border-width: 1px 1px 0 1px;
	text-align: center;
}

.cv-header .periodLabel {
	display: flex;
	flex: 1 1 auto;
	flex-flow: row nowrap;
	min-height: 1.5em;
	line-height: 1;
	font-size: 1.5em;
	align-items: center; /* 수직 정렬 */
	text-align: center; /* 텍스트를 가운데 정렬 */
	justify-content: center; /* 수평 정렬 */

}

.cv-header,
.cv-header button {
	border-style: solid;
	border-color: #ddd;
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

/* Figma CSS 추가 */
.triangle-button {
	background-color: #B1B1D2;
	color: transparent; /* 글자 색을 투명하게 설정 */
	width: 0; /* 너비를 0으로 설정 */
	height: 0; /* 높이를 0으로 설정 */
	border-left: 12px solid transparent; /* 왼쪽 삼각형 */
	border-right: 12px solid transparent; /* 오른쪽 삼각형 */
	border-bottom: 20px solid #B1B1D2; /* 아래쪽 삼각형 */
	transform: rotate(-90deg); /* 회전 */
}

.triangle-button span {
	position: absolute; /* span의 위치를 절대적으로 설정 */
	left: 50%;
	transform: translateX(-50%); /* span을 가운데로 이동 */
	top: 100%; /* span을 삼각형 아래에 위치 */
}
</style>
