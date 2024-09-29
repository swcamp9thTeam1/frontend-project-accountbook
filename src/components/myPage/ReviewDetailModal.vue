<template>
    <dialog class="modal-review-detail">
        <template v-if="review">
            <div class="top-area">
                <button type="button" @click="closeModal">
                    <img src="/src/assets/icons/ic-arrow-back.svg" alt="모달 닫기">
                </button>
                <h1>{{ review.storeName }}</h1>
            </div>

            <!-- 리뷰 이미지 -->
            <div v-if="review.images.length > 0" class="image-area">
                <div class="image-navigation">
                    <button type="button" :class="{hide: currentImageIndex === 0}" @click="previousImage">
                        <img src="@/assets/icons/previous.svg" alt="이전으로">
                    </button>
                    <img :src="review.images[currentImageIndex]" alt="리뷰 이미지">
                    <button type="button" :class="{hide: currentImageIndex === review.images.length - 1}" @click="nextImage">
                        <img src="@/assets/icons/next.svg" alt="다음으로">
                    </button>
                </div>
                
                <!-- 페이지네이션 표시 -->
                <div class="pagination">
                    <span 
                        class="dot" 
                        v-for="(reviewImage, index) in review.images" 
                        :key="reviewImage" 
                        :class="{active: index === currentImageIndex}"
                        @click="jumpToImage(index)">
                    </span>
                </div>
            </div>

            <!-- 리뷰 내용 -->
            <div class="content-area">
                <ReviewContentItem :label="'인원 수'" :value="`${review.peopleNum}명`" />
                <ReviewContentItem :label="'총 지출 금액'" :value="`${review.totalPrice.toLocaleString()}원`" />
                <ReviewContentItem :label="'이 가게의 1인 평균 지출금액'" :value="`${review.storeCostAvg.toLocaleString()}원`" />
                <ReviewContentItem :label="'한 줄 리뷰'" :value="review.content" />

                <div class="button-area">
                    <button type="button" class="btn-edit" @click="clickEditReview(review.id)">수정</button>
                    <button type="button" class="btn-remove" @click="clickRemoveReview(review.id)">삭제</button>
                </div>
            </div>
            
        </template>
    </dialog>
</template>

<script setup>
import { defineProps, ref, watchEffect, defineEmits } from 'vue';
import { closeReviewDetailDialog } from '@/utils/dialogManager';
import ReviewContentItem from '@/components/myPage//ReviewContentItem.vue';

const props = defineProps({
    reviewId: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['onClosedModal']);

const review = ref(null);
const currentImageIndex = ref(0);

watchEffect(() => {
    if (!props.reviewId) return;

    fetch(`http://localhost:8080/my-reviews/${props.reviewId}`)
    .then(response => response.json())
    .then(data => {
        review.value = data;
    })
    .catch(err => alert("리뷰 정보를 가져오는동안 에러가 발생했습니다."));
})

const closeModal = () => {
    closeReviewDetailDialog();
    emit('onClosedModal');
}

const jumpToImage = (index) => {
    currentImageIndex.value = index;
}

const previousImage = () => {
    currentImageIndex.value -= 1;
}

const nextImage = () => {
    currentImageIndex.value += 1;
}

const clickEditReview = (reviewId) => {

}

const clickRemoveReview = (reviewId) => {
    
}

</script>

<style scoped>
dialog.modal-review-detail {
    background-color: white;
    min-width: 500px;
    max-width: 1500px;
    max-height: 80vh;
    border: none;
    border-radius: 21px;
    box-shadow: 5px 5px 9px 0px rgba(0, 0, 0, .25);
    padding: 40px;

    .top-area {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        justify-items: center;

        h1 {
            font-size: 35px;
            font-weight: 500;
        }
        
    }

    .image-area {
        margin-top: 20px;
        margin-bottom: 20px;

        .image-navigation {
            display: flex;
            align-items: center;

            img {
                width: 526px;
                height: 326px;
                object-fit: cover;
                margin: 0 10px;
            }

            button {
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

    .content-area {
        padding: 0 60px;
        position: relative;

        .button-area {
            position: absolute;
            top: 0;
            right: 60px;

            button {
                color: white;
                font-size: 17px;
                border-radius: 7px;
                width: 64px;
                height: 32px;

                &.btn-edit {
                    background-color: #25272F;
                    margin-right: 10px;
                }

                &.btn-remove {
                    background-color: #B1B1D2;
                }
            }
        }
    }
}

button {
    background-color: transparent;
    border: none;
}
</style>