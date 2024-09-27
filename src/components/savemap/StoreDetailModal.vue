<template>
    <dialog class="modal-store-detail">
        <template v-if="store">

            <div class="modal-position-main">
                <!-- 상단 가게명, 가게주소 -->
                <div class="modal-top-area">
                    <button type="button" class="btn-close" @click="emit('closeModal')">
                        <img src="@/assets/icons/button-close.svg" alt="Close Button">
                    </button>
                    <b class="store-name">{{ store.name }}</b>
                    <div class="store-category">{{ store.category }}</div>
                    <div class="store-address">{{ store.address }}</div>
                </div>

                <div class="modal-content">
                    <!-- 착한가격 업소면 표시 -->
                    <div class="modal-content-item">
                        <GoodStoreBox v-if="store.good" :good="store.good" />
                    </div>

                    <!-- 이 가게와 연동된 가계부가 있다면 표시 -->
                    <div v-if="limitAccountBooks.length > 0" class="store-accounts-box modal-content-item">
                        <div class="store-accounts-title-box">
                            <div class="store-accounts-title">내 가계부</div>
                            <ReadMoreButton v-if="allAccountBooks.length > 2" @clickMore="showRightView('ACCBOOKS')" />
                        </div>

                        <!-- 최대 2개만 표시 -->
                        <AccountBookItem v-for="accbook in limitAccountBooks" :key="accbook.accBookCode" :item="accbook" />
                    </div>

                    <!-- 가게 리뷰 -->
                    <div v-if="storeReview && limitReviews.length > 0" class="modal-content-item">
                        <div class="store-review-title-box">
                            <div class="title">리뷰 ({{ allReviews.length }}개)</div>
                            <CostAvgChip :costAvg="storeReview.priceAvg" />
                        </div>
                        <div class="review-more-btn-wrapper">
                            <ReadMoreButton v-if="allReviews.length > 2" @clickMore="showRightView('REVIEWS')" />
                        </div>

                        <StoreReviewBox v-for="review in limitReviews" :review="review" :key="review.id" />

                        <!-- 리뷰 작성 버튼 -->
                        <button type="button" class="btn-write-review" @click="showRightView('WRITE_REVIEW')">
                            리뷰 작성하러 가기
                        </button>
                    </div>
                </div>
            </div>

            <!-- Modal 오른쪽 부분 -->
            <div class="modal-position-right" v-show="openRight">

                <!-- 오른쪽 + 윗부분 -->
                <div class="right-top-area">
                    <button type="button" class="btn-back" @click="back">
                        <img src="@/assets/icons/button-back.svg" alt="돌아가기">
                    </button>
                </div>

                <!-- 오른쪽+ 메인 content -->
                <div class="right-main-area">
                    <WriteReviewView v-if="rightView === 'WRITE_REVIEW'" @closeRightView="closeRightView" />
                    <StoreReviewListView v-else-if="rightView === 'REVIEWS'" :allReviews="allReviews" :avg="storeReview.priceAvg"/>
                </div>
            </div>
        </template>
    </dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, watchEffect } from 'vue';
import GoodStoreBox from '@/components/savemap/GoodStoreBox.vue';
import ReadMoreButton from '@/components/buttons/ReadMoreButton.vue';
import AccountBookItem from "@/components/accbook/AccountBookList.vue"
import StoreReviewBox from '@/components/savemap/StoreReviewBox.vue';
import WriteReviewView from '@/components/savemap/WriteReviewView.vue';
import StoreReviewListView from '@/components/savemap/StoreReviewListView.vue';
import CostAvgChip from '@/components/savemap/CostAvgChip.vue';

const props = defineProps({
    storeDetailId: String,
});
const emit = defineEmits(["closeModal"]);

const store = ref({});

const allAccountBooks = ref([]);    // 가게와 연동된 가계부 전체 목록
const limitAccountBooks = ref([]);  // 최대 2개만 표시하기 위해 따로 저장

const storeReview = ref({});     // 가게 리뷰
const allReviews = ref([]);      // 가게 전체 리뷰 목록
const limitReviews = ref([]);         // 리뷰 2개만 표시

const openRight = ref(false);
const rightView = ref("");       // 오른쪽에 표시될 화면("WRITE_REVIEW", "REVIEWS", "ACCBOOKS")

const getStoreDetail = async (storeId) => {
    const response = await fetch(`http://localhost:8080/stores/${storeId}`);
    const data = await response.json();
    store.value = data;
}

const getStoreAccBooks = async (storeId) => {
    const response = await fetch(`http://localhost:8080/monthly?financeType=O`);        // 일단 지출 가계부 목록 모두 가져오기
    const data = await response.json();
    allAccountBooks.value = data;

    // 가계부는 최대 2개까지만 표시
    // (나머지는 더보기 버튼 사용하여 표시)
    limitAccountBooks.value = data.slice(0, 2);
}

const getStoreReviews = async (storeId) => {
    const response = await fetch(`http://localhost:8080/store-reviews/${storeId}`);
    const data = await response.json();
    storeReview.value = data;

    // 전체 리뷰 목록 담기
    allReviews.value = data.reviews;

    // 리뷰 2개만 표시
    // (나머지는 더보기 버튼 사용하여 표시)
    limitReviews.value = data.reviews.slice(0, 2);
}

watchEffect(() => {
    if (!props.storeDetailId) return;

    getStoreDetail(props.storeDetailId);
    getStoreAccBooks(props.storeDetailId);
    getStoreReviews(props.storeDetailId);
});

const showRightView = (viewName) => {
    openRight.value = true;
    rightView.value = viewName;
}

const back = () => {
    openRight.value = false;
}

const closeRightView = () => {
    rightView.value = "";
    openRight.value = false;
}
</script>

<style scoped>
dialog.modal-store-detail {
    background-color: white;
    min-width: 500px;
    max-width: 1500px;
    max-height: 80vh;
    border: none;
    border-radius: 21px;
    box-shadow: 5px 5px 9px 0px rgba(0, 0, 0, .25);
    padding: 0;

    position: fixed;
    z-index: 4;

    .modal-position-main {
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    &::backdrop {
        background-color: rgba(0, 0, 0, .2);
    }

    &[open] {
        animation: show 0.5s ease normal;
        -webkit-animation: show 0.5s ease normal;
        display: flex;
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

        .modal-content-item + .modal-content-item {
            margin-top: 30px;
        }
    }

    .modal-position-right {
        border-left: 1px solid #ACACAC;
        flex: 1;
        display: flex;
        flex-direction: column;

        .right-top-area {
            padding: 20px;  /* 왼쪽 close 버튼과 동일한 top 위치 */

            .btn-back {
                width: 24px;
                height: 24px;
                border: none;
                background-color: transparent;
                padding: 0;

                display: flex;
                align-items: center;
                justify-content: center;

                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .right-main-area {
            flex-grow: 1;
            overflow-y: auto;
        }
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