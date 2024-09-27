<template>
  <div class="button-container">
    <button
        class="button-accbook"
        v-if="item && item.title"
        @click="goDetailView(item.id)">
      <div class="flex-container">
        <div class="accbook-name">{{ item.title }}</div>
        <div class="accbook-price">{{ formattedAmount(item) }}</div>
      </div>
      <div class="category-asset-date">{{ formatCategoryAssetDate(item) }}</div>
    </button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import router from "@/router/router.js";

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

// amount에 '+' 또는 '-' 붙이기
const formattedAmount = (item) => {
  return (item.financeType === "I" ? '+' : '-') + item.amount;
};

// 카테고리, 자산, 날짜 형식 지정
const formatCategoryAssetDate = (item) => {
  const date = new Date(item.createdAt).toISOString().split('T')[0]; // YYYY-MM-DD 형식
  // const date = new Date(item.createdAt);
  return `${item.accCategoryName} | ${item.assetName} | ${date}`;
};

const goDetailView = (id) => router.push(`/account-book/detail/${id}`);
</script>

<style scoped>
    /* 가계부 내역 한 개(통째로 버튼) */
    /* 간격 조절 위해 주석처리합니다!
        margin-left: 812px;
        margin-top: 247px;
    */
    .button-accbook {
        width: 520px;
        height: 79px;

        box-shadow: 0px 0px 7px 1px #DFDFF5;
        background-color: #FFFFFF;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        margin: 10px;
    }

    .flex-container {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .accbook-name {
        margin-left: 40px;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 18px;
        color: #000000;

        text-align: left;
    }

    .accbook-price {
        margin-right: 24px;
        padding-top: 5px;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 18px;
        color: #000000;

        text-align: right;
    }

    .category-asset-date {
        margin-left: 40px;
        padding-top: 5px;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 400;
        font-size: 10px;
        line-height: 12px;

        text-align: left;
    }
</style>