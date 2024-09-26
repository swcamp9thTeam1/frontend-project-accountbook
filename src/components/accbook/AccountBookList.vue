<template>
  <button class="button-accbook">
    <div class="flex-container">
      <div class="accbook-name">내역명</div>
      <div class="accbook-price">000,000원</div>
    </div>
    <div class="category-asset-date">가계부카테고리 | 사용자산 | 0000-00-00</div>
  </button>
</template>

<script setup>

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