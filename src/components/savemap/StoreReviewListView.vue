<template>
    <div class="store-review-list-container">
        
        <!-- 상단 타이틀 -->
        <div class="flex-start-center">
            <p class="title">리뷰 ({{ props.allReviews.length }}개)</p>
            <CostAvgChip :cost-avg="avg" />
        </div>

        <!-- 리뷰 목록 -->
        <div class="review-list">
            <StoreReviewBox v-for="review in allReviews" :key="review.id" :review="review" />
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import CostAvgChip from './CostAvgChip.vue';
import StoreReviewBox from './StoreReviewBox.vue';

const props = defineProps({
    allReviews: {
        type: Array,
        required: true
    },
    avg: {
        type: Number,
        required: true
    }
})
</script>

<style scoped>
.store-review-list-container {
    padding: 20px;

    .title {
        font-size: 20px;
        font-weight: bold;
        margin-right: 10px;
    }
}
.flex-start-center {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
</style>