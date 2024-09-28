<template>
    <div class="group-member-accbook-container">
        <div class="top-area flex-between-center">
            <div class="title"><b>{{ props.groupMember.nickname }}</b>님의 가계부</div>

            <select v-if="currentView === 'LIST'" v-model="selectedMonth">
                <option v-for="month in months" :key="month" :value="month">{{ month }}월</option>
            </select>
        </div>
        
        <!-- 상황에 따라 가계부 리스트 View or 가계부 자세히보기 View -->
        <!-- 가계부 리스트 View -->
        <div class="acc-book-list-area" v-if="currentView === 'LIST'">

            <!-- 가계부 없을 때 -->
            <div v-if="accBookListByMonth.length === 0">작성된 가계부가 없습니다!</div>

            <!-- 가계부 있을 때 -->
            <div v-for="accBookByDate in accBookListByDate" :key="accBookByDate.date" class="acc-book-by-date">
                <div class="flex-between-center">
                    <p class="date">{{ accBookByDate.date }}일</p>
                    <div class="total-in-out">
                        <div>+{{ accBookByDate.totalIn.toLocaleString() }}원</div>
                        <div>-{{ accBookByDate.totalOut.toLocaleString() }}원</div>
                    </div>
                </div>
                <AccountBookItem v-for="accbook in accBookByDate.accBooks" :key="accbook.id" :item="accbook" @item-clicked="clickAccBook" />
            </div>
        </div>

        <!-- 가계부 자세히보기 View -->
        <div v-else-if="currentView === 'DETAIL'" class="acc-book-detail-area">
            <button type="button" @click="backToList" class="btn-back">
                <img src="@/assets/icons/button-back.svg" alt="돌아가기">
                <p>목록으로 돌아가기</p>
            </button>

            <AccountBookDetail :item="{ id: selectedAccBookId }" :readonly="true" />
        </div>
    </div>
</template>

<script setup>
import { defineProps, onMounted, ref, watch } from 'vue';
import AccountBookItem from '@/components/accbook/AccountBookList.vue';
import AccountBookDetail from '@/components/accbook/AccountBookDetail.vue';

const props = defineProps({
    groupMember: {
        type: Object,
        required: true
    }
})

const selectedAccBookId = ref(null);                            // 자세히보기 할 가계부 id
const currentView = ref("LIST");                                // ["LIST", "DETAIL"]

const months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const selectedMonth = ref("");                                  // 선택된 month
const accBookListByMonth = ref([]);                             // 선택된 달에 해당하는 가계부 목록
const accBookListByDate = ref([]);                              // 일자별 가계부 리스트

onMounted(() => {
    selectedMonth.value = String(new Date().getMonth() + 1);    // 현재 달(month)을 기본값으로 설정
})

// 선택된 month에 해당하는 가계부 목록만 골라내기
watch(selectedMonth, () => {
    accBookListByMonth.value = props.groupMember.accountBooks
                                                .filter(e => (new Date(e.createdAt).getMonth() + 1) == selectedMonth.value);
})

// accBookListByDate 만들기
watch(accBookListByMonth, () => {
    const dates = new Set();

    // 1. 존재하는 date 리스트 뽑기
    accBookListByMonth.value.forEach(e => {
        const accBookDate = new Date(e.createdAt).getDate();
        dates.add(accBookDate);
    });

    // 2. Set -> Array (내림차순 정렬)
    const dateList = Array.from(dates).sort((a, b) => b - a);

    const result = [];

    dateList.forEach(date => {
        const resultItem = {};

        const accBooks = accBookListByMonth.value.filter(e => (new Date(e.createdAt).getDate()) === date);
        const inTypeAccBooks = accBooks.filter(e => e.financeType === "I");  // 수입만 뽑기
        const outTypeAccBooks = accBooks.filter(e => e.financeType === "O"); // 지출만 뽑기
        
        resultItem.date = date;
        resultItem.totalIn = inTypeAccBooks.map(e => e.amount).reduce((acc, val) => acc + val, 0);
        resultItem.totalOut = outTypeAccBooks.map(e => e.amount).reduce((acc, val) => acc + val, 0);
        resultItem.accBooks = accBooks;

        result.push(resultItem);
    });

    accBookListByDate.value = result;
})

const clickAccBook = (accBookId) => {
    selectedAccBookId.value = accBookId;
    currentView.value = "DETAIL";
}

const backToList = () => {
    selectedAccBookId.value = null;
    currentView.value = "LIST";
}
</script>

<style scoped>
.group-member-accbook-container {
    padding-left: 100px;

    .top-area {
        margin-bottom: 20px;

        .title {
            font-size: 32px;
            font-weight: lighter;
        }

        select {

            /* select box 화살표 모양 커스텀 */
            -moz-appearance: none; /* Firefox */
            -webkit-appearance: none; /* Safari and Chrome */
            appearance: none;
            background-image: url("@/assets/icons/ic-triangle-down-purple.svg");
            background-repeat: no-repeat;
            background-position: right 10px top 50%;

            border: 1px solid #B1B1D2;
            border-radius: 5px;
            height: 33px;
            width: 79px;

            font-size: 16px;
            text-align: right;
            padding-right: 30px;
        }
    }

    .acc-book-by-date {
        .date {
            font-size: 16px;
        }
        .total-in-out {
            font-size: 10px;
            text-align: right;
        }
    }

    .acc-book-detail-area {
        .btn-back {
            display: flex;
            align-items: center;

            img {
                width: 24px;
                height: 24px;
            }

            p {
                margin-left: 10px;
                font-size: 15px
            }
        }
    }

    button {
        background-color: transparent;
        border: none;
    }

    .flex-between-center {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>
