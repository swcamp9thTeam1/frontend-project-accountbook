<template>
    <div class="group-member-accbook-container">
        <div class="top-area">
            <div class="title"><b>{{ props.groupMember.nickname }}</b>님의 가계부</div>
        </div>
        
        <div class="acc-book-list-area" v-if="selectedAccBookId === null">
            <AccountBookItem v-for="accbook in props.groupMember.accountBooks" :key="accbook.id" :item="accbook" @item-clicked="clickAccBook" />
        </div>
        <div v-else class="acc-book-detail-area">
            <button type="button" @click="backToList" class="btn-back">
                <img src="@/assets/icons/button-back.svg" alt="돌아가기">
                <p>목록으로 돌아가기</p>
            </button>

            <!-- 가계부 자세히보기 View -->
             <AccountBookDetail :item="{ id: selectedAccBookId }" :readonly="true" />
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import AccountBookItem from '@/components/accbook/AccountBookList.vue';
import AccountBookDetail from '@/components/accbook/AccountBookDetail.vue';

const props = defineProps({
    groupMember: {
        type: Object,
        required: true
    }
})

const selectedAccBookId = ref(null);      // 자세히보기 할 가계부 id

const clickAccBook = (accBookId) => {
    selectedAccBookId.value = accBookId;
}

const backToList = () => {
    selectedAccBookId.value = null;
}
</script>

<style scoped>
.group-member-accbook-container {
    padding-left: 100px;

    .top-area {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        .title {
            font-size: 32px;
            font-weight: lighter;
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
}
</style>
