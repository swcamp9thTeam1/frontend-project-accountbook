<template>
    <div class="buttons">
        <button class="find-button">
            <img src="../assets/icons/가계부_검색_버튼.svg" alt="검색">
        </button>
        <button class="insert-button">
            <img src="../assets/icons/가계부_추가_버튼.svg" alt="추가">
        </button>
        <button class="category-button">
            <img src="../assets/icons/가계부_카테고리관리_버튼.svg" alt="카테고리">
        </button>
    </div>

    <div class="day-stats">
        <div class="day">00일</div>
        <div class="stats-container">
            <div class="stats-in">+200,000원</div>
            <div class="stats-out">-20,000원</div>
        </div>
    </div>

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
    /* 가계부 상단의 검색/추가/카테고리 관리 버튼 */
    .buttons {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-content: space-evenly;

        position: absolute;
        width: 133px;
        height: 37px;
        left: 1199px;
        top: 163px;
    }

    .find-button {
        width: 37px;
        height: 37px;
        border: none;
        background-color: #ffffff;
        backface-visibility: hidden;
        cursor: pointer;
    }

    .insert-button {
        margin-left: 8px;
        margin-right: 8px;

        width: 37px;
        height: 37px;
        border: none;
        background-color: #ffffff;
        backface-visibility: hidden;
        cursor: pointer;
    }

    .category-button {
        margin-right: 6px;

        width: 37px;
        height: 37px;
        border: none;
        background-color: #ffffff;
        backface-visibility: hidden;
        cursor: pointer;
    }

    /* 일일 통계(날짜, 하루의 수입과 지출 총액)  */
    .day-stats {
        position: absolute;
        width: 512px;
        height: 26px;
        left: 820px;
        top: 216px;
    }

    .day {
        position: absolute;
        margin-left: 8px;
        margin-top: 6px;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        text-wrap: nowrap;
        color: #000000;
    }

    .stats-container {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        column-gap: 0;
    }

    .stats-in {
        margin-right: 8px;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 400;
        font-size: 10px;
        line-height: 12px;
        text-align: right;
        color: #505050;
    }

    .stats-out {
        margin-right: 8px;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 400;
        font-size: 10px;
        line-height: 12px;
        text-align: right;
        color: #505050;
    }

    /* 가계부 내역 한 개(통째로 버튼) */
    .button-accbook {
        width: 520px;
        height: 79px;
        margin-left: 812px;
        margin-top: 247px;

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