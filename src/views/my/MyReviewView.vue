<template>
    <div class="visited-store-container">
        <ul>
            <li v-for="visitedStore in visitedStores" :key="visitedStore.id" class="item-visited-store">
                <div class="left">
                    <StoreCategoryIcon :category-code="visitedStore.categoryCode" />
                    <p>{{ visitedStore.name }}</p>
                </div>
                <div class="right">
                    <button type="button" class="btn-view-store" @click="clickViewStore">가게 보기</button>
                    <button type="button" v-if="visitedStore.review === null" class="btn-add-review">리뷰 추가</button>
                    <button type="button" v-else class="btn-view-review">리뷰 보기</button>
                </div>
            </li>
        </ul>

        <StoreDetailModal :store-detail-id="storeDetailId" @on-closed-modal="onClosedModal" />
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import StoreCategoryIcon from '@/components/myPage/StoreCategoryIcon.vue';
import StoreDetailModal from '@/components/savemap/StoreDetailModal.vue';
import { openStoreDetailDialog } from '@/utils/dialogManager';

const visitedStores = ref([]);
const storeDetailId = ref("");

onMounted(() => {
    fetch(`http://localhost:8080/my-visited-stores`)
    .then(response => response.json())
    .then(data => {
        visitedStores.value = data;
    })
    .catch(err => alert("방문한 가게 정보를 가져오는동안 에러가 발생했습니다."));
})

const clickViewStore = (storeId) => {
    storeDetailId.value = "1";      // 일단 1번 가게보기로 고정
    openStoreDetailDialog();
}

const onClosedModal = () => {
    storeDetailId.value = "";
}
</script>

<style scoped>
.visited-store-container {
    margin-top: 130px;

    ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
            + li {
                margin-top: 20px;
            }

            &.item-visited-store {
                background-color: #F9F9FF;
                padding: 20px;
                border-radius: 12px;
                box-shadow: 0 0 7px 1px #DFDFF5;
                width: 1000px;

                display: flex;
                justify-content: space-between;
                align-items: center;

                .left, .right {
                    display: flex;
                    align-items: center;
                }

                .left {
                    p {
                        margin-left: 16px;
                        font-weight: 500;
                    }
                }

                .right {
                    button {
                        background-color: transparent;
                        border: none;
                        border-radius: 19.5px;
                        font-size: 19px;
                        border-width: 1px;
                        border-style: solid;
                        width: 122px;
                        height: 39px;

                        + button {
                            margin-left: 16px;
                        }
                    }

                    .btn-view-store {
                        border-color: black;
                        background-color: white;
                    }

                    .btn-add-review {
                        border-color: #101424;
                        background-color: #101424;
                        color: white;
                        font-weight: 300;
                    }

                    .btn-view-review {
                        border-color: #B1B1D2;
                        background-color: #B1B1D2;
                        color: white;
                        font-weight: 300;
                    }
                }
            }
        }
    }
}
</style>