<template>
    <dialog open class="modal">
        <template v-if="store">

            <div class="modal-position-main">
                <!-- 상단 가게명, 가게주소 -->
                <div class="modal-top-area">
                    <button type="button" class="btn-close" @click="emit('closeModal')">
                        <img src="/src/assets/icons/button-close.svg" alt="Close Button">
                    </button>
                    <b class="store-name">{{ store.name }}</b>
                    <div class="store-category">{{ store.category }}</div>
                    <div class="store-address">{{ store.address }}</div>
                </div>

                <div class="modal-content">
                    <!-- 착한가격 업소면 표시 -->
                    <GoodStoreBox v-if="store.good" :good="store.good" />

                    <!-- 이 가게와 연동된 가계부가 있다면 표시 -->
                    <div v-if="accountBooks.length > 0" class="store-accounts-box">
                        <div class="store-accounts-title-box">
                            <div class="store-accounts-title">내 가계부</div>
                            <ReadMoreButton v-if="store.accountBooks.length > 2" @clickMore="clickMoreAccountBooks" />
                        </div>

                        <!-- 최대 2개만 표시 -->
                        <AccountBookItem v-for="accbook in accountBooks" :key="accbook.accBookCode" />
                    </div>

                    <!-- 가게 리뷰 -->
                    <div v-if="storeReview && reviews.length > 0">
                        <div class="store-review-title-box">
                            <div class="title">리뷰 ({{ allReviews.length }}개)</div>
                            <div class="price-avg">1인당 평균 {{ storeReview.priceAvg.toLocaleString() }}원을 지출했어요!</div>
                        </div>
                        <div class="review-more-btn-wrapper">
                            <ReadMoreButton v-if="allReviews.length > 2" @clickMore="clickMoreReviews" />
                        </div>

                        <StoreReviewBox v-for="review in reviews" :review="review" />
                    </div>

                    <!-- 리뷰 작성 버튼 -->
                    <button type="button" class="btn-write-review" @click="goWriteReview">
                        리뷰 작성하러 가기
                    </button>
                </div>
            </div>

            <div class="modal-position-right" v-show="openRight">
                오른 쪽 열 렸 다 !!
            </div>
        </template>
    </dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, watchEffect } from 'vue';
import GoodStoreBox from '@/components/savemap/GoodStoreBox.vue';
import ReadMoreButton from '@/components/ReadMoreButton.vue';
import AccountBookItem from "@/components/accbook/AccountBookList.vue"
import StoreReviewBox from './StoreReviewBox.vue';

const props = defineProps({
    storeDetailId: String
});
const emit = defineEmits(["closeModal"]);

const store = ref({});
const accountBooks = ref([]);    // 최대 2개만 표시하기 위해 따로 저장
const storeReview = ref({});     // 가게 리뷰
const allReviews = ref([]);      // 가게 전체 리뷰 목록
const reviews = ref([]);    // 리뷰 2개만 표시
const openRight = ref(false);

const getStoreDetail = async (storeId) => {
    const response = await fetch(`http://localhost:8080/stores/${storeId}`);
    const data = await response.json();
    store.value = data;
    
    // 가계부는 최대 2개까지만 표시
    // (나머지는 더보기 버튼 사용하여 표시)
    if (data.accountBooks) {
        accountBooks.value = data.accountBooks.slice(0, 2);
    }
}

const getStoreReviews = async (storeId) => {
    const response = await fetch(`http://localhost:8080/store-reviews/${storeId}`);
    const data = await response.json();
    storeReview.value = data;

    // 전체 리뷰 목록 담기
    allReviews.value = data.reviews;

    // 리뷰 2개만 표시
    // (나머지는 더보기 버튼 사용하여 표시)
    reviews.value = data.reviews.slice(0, 2);
}

watchEffect(() => {
    if (!props.storeDetailId) return;

    getStoreDetail(props.storeDetailId);
    getStoreReviews(props.storeDetailId);
});

const clickMoreAccountBooks = () => {

    /* 가계부 더보기 */
    console.log("가계부 더보기");
}

const clickMoreReviews = () => {

    /* 리뷰 더보기 */
    console.log("리뷰 더보기");
}

const goWriteReview = () => {
    openRight.value = true;
}
</script>

<style scoped>
dialog.modal {
    background-color: white;
    min-width: 500px;
    max-width: 1000px;
    max-height: 80vh;
    border: none;
    border-radius: 21px;
    box-shadow: 5px 5px 9px 0px rgba(0, 0, 0, .25);
    padding: 0;

    position: fixed;
    top: 50%;                       /* 모달을 화면의 중앙에 배치 */
    transform:translateY(-50%);     /* 모달을 화면의 중앙에 배치 */
    z-index: 4;

    display: flex;

    .modal-position-main {
        display: flex;
        flex-direction: column;
    }

    &::backdrop {
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, .2);
    }

    &[open] {
        animation: show 0.5s ease normal;
        -webkit-animation: show 0.5s ease normal;
    }

    &[open]::backdrop {
        animation: show-backdrop 0.5s ease normal;
        -webkit-animation: show-backdrop 0.5s ease normal;
    }

    .modal-top-area {
        display: flex;
        flex-direction: column;
        border-bottom: 0.6px solid #ACACAC;
        padding: 20px;

        .btn-close {
            margin-left: auto;
            background-color: transparent;
            border: none;
        }

        .store-name {
            font-size: 28px;
        }

        .store-category {
            color: #ACACAC;
            font-size: 16px;
        }

        .store-address {
            font-size: 23px;
            color: #ACACAC;
            margin-left: auto;
        }
    }

    .modal-content {
        flex-grow: 1;
        overflow-y: auto;
        padding: 20px;

        .store-accounts-box {
            margin-top: 30px;
            margin-bottom: 30px;

            .store-accounts-title-box {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 15px;
                margin-bottom: 15px;

                .store-accounts-title {
                    font-size: 20px;
                    font-weight: bold;
                }
            }
        }

        .store-review-title-box {
            display: flex;
            align-items: center;

            .title {
                font-size: 20px;
                font-weight: bold;
                margin-right: 20px;
            }

            .price-avg {
                background-color: rgba(198, 198, 235);
                height: 30px;
                padding: 0 10px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
            }
        }

        .review-more-btn-wrapper {
            display: flex;
            justify-content: flex-end;
            margin-top: 10px;
            margin-bottom: 10px;
        }

        .btn-write-review {
            width: 70%;
            height: 50px;
            background-color: rgb(249, 249, 255);
            border: transparent;
            box-shadow:0 0 5px rgba(198, 198, 235, 0.5);
            margin: 0 auto;
            margin-top: 26px;
            display: block;

            font-size: 16px;
        }
    }

    .modal-position-right {
        border-left: 1px solid #ACACAC;
    }
}

@keyframes show {
    from {
        transform: translateY(-200%);
    }
    to {
        transform: translateY(-50%);        /* 원래 자리로 돌아오기 */
    }
}

@keyframes show-backdrop {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>