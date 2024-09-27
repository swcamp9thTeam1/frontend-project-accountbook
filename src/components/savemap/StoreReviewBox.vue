<template>
    <div class="review-box">
        <div class="review-top-area">
            <div class="review-nickname">{{ props.review.nickname }}</div>

            <div class="chip-area">
                <ReviewChip :label="`${props.review.peopleNum}명 이용`" />
                <ReviewChip :label="`${props.review.totalPrice.toLocaleString()}원 지출`"/>
            </div>
        </div>

        <div class="review-content-area" :class="{'big-image': bigImageMode}">
            <div class="review-content">
                {{ props.review.content }}
            </div>

            <!-- 큰 이미지 영역 -->
            <div v-if="bigImageMode" class="big-image-area">
                <div class="image-navigation">
                    <button type="button" :class="{hide: currentBigImgIndex === 0}" @click="previousImage">
                        <img src="@/assets/icons/previous.svg" alt="이전으로">
                    </button>
                    <img :src="props.review.images[currentBigImgIndex]" alt="현재 보이는 큰 이미지" @click="changeToSmallImage">
                    <button type="button" :class="{hide: currentBigImgIndex === props.review.images.length - 1}" @click="nextImage">
                        <img src="@/assets/icons/next.svg" alt="다음으로">
                    </button>
                </div>
                
                <!-- 페이지네이션 표시 -->
                <div class="pagination">
                    <span 
                        class="dot" 
                        v-for="(reviewImage, index) in props.review.images" 
                        :key="reviewImage" 
                        :class="{active: index === currentBigImgIndex}"
                        @click="jumpToImage(index)">
                    </span>
                </div>
            </div>

            <!-- 기본 이미지 영역(작은 이미지) -->
            <div class="review-image-area" v-else-if="props.review.images.length > 0">
                <img :src="props.review.images[0]" alt="Review Picture" @click="changeToBigImage" >

                <!-- 이미지가 2개 이상이면 chip 표시 -->
                <div v-if="props.review.images.length > 1" class="review-image-cnt">
                    {{ props.review.images.length }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import ReviewChip from '@/components/savemap/ReviewChip.vue';

const props = defineProps({
    review: {
        type: Object,
        required: true
    }
});

const bigImageMode = ref(false);
const currentBigImgIndex = ref(0);

const changeToBigImage = () => {
    bigImageMode.value = true;
    currentBigImgIndex.value = 0;
}

const changeToSmallImage = () => {
    bigImageMode.value = false;
    currentBigImgIndex.value = 0;
}

const jumpToImage = (index) => {
    currentBigImgIndex.value = index;
}

const previousImage = () => {
    currentBigImgIndex.value -= 1;
}

const nextImage = () => {
    currentBigImgIndex.value += 1;
}
</script>

<style scoped>
.review-box {
    background-color: white;
    border-radius: 9px;
    box-shadow: 0 0 5px rgba(198, 198, 235, 0.5);
    padding: 16px 14px;
    min-width: 450px;

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

        &.big-image {
            flex-direction: column;
            justify-content: flex-start;
        }

        .big-image-area {
            align-self: center;
            margin-top: 20px;

            .image-navigation {
                display: flex;
                align-items: center;

                img {
                    width: 250px;
                    height: 250px;
                    object-fit: cover;
                    margin: 0 10px;
                }

                button {
                    background-color: transparent;
                    border: none;

                    img {
                        width: 30px;
                        height: 30px;
                        object-fit: contain;
                    }
                }

                button.hide {
                    visibility: hidden;
                }
            }

            .pagination {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 10px;

                .dot {
                    width: 8px;
                    height: 8px;
                    background-color: lightgray;
                    border-radius: 50%;

                    &.active {
                        background-color: black;
                    }

                    + .dot {
                        margin-left: 5px;
                    }
                }
            }
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

            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>