<template>
    <div class="review-box">
        <div class="review-top-area">
            <div class="review-nickname">{{ props.review.nickname }}</div>

            <div class="chip-area">
                <ReviewChip :label="`${props.review.peopleNum}명 이용`" />
                <ReviewChip :label="`${props.review.totalPrice.toLocaleString()}원`"/>
            </div>
        </div>

        <div class="review-content-area">
            <div class="review-content">
                {{ props.review.content }}
            </div>

            <div class="review-image-area" v-if="props.review.images.length > 0">
                <img :src="props.review.images[0]" alt="Review Picture">

                <!-- 이미지가 2개 이상이면 chip 표시 -->
                <div v-if="props.review.images.length > 1" class="review-image-cnt">
                    {{ props.review.images.length }}
                </div>
            </div>
            
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import ReviewChip from '@/components/ReviewChip.vue';

const props = defineProps({
    review: Object
});
</script>

<style scoped>
.review-box {
    background-color: white;
    border-radius: 9px;
    box-shadow: 0 0 5px rgba(198, 198, 235, 0.5);
    padding: 16px 14px;

    .review-top-area {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .review-nickname {
            font-size: 16px;
            color: #4C4C4C;
        }
    }

    + .review-box {
        margin-top: 10px;
    }

    .chip-area {
        display: flex;
    }

    .review-content-area {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;

        .review-content {
            font-size: 22px;
        }
    }

    .review-image-area {
        width: 100px;
        height: 100px;
        position: relative;

        img {
            width: 100%;   /* 부모 요소에 크기 맞추기 */
            height: 100%;  /* 부모 요소에 크기 맞추기 */

            object-fit: cover;
        }

        .review-image-cnt {
            position: absolute;
            top: 0;
            right: 0;

            background-color: rgba(16, 20, 36, 0.6);
            width: 24px;
            height: 24px;

            color: white;
            font-size: 14px;
        }
    }
}
</style>