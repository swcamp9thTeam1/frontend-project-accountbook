<template>
    <div class="container">
        <div class="set">
            <div class="classification">자산명</div>
            <input class="name" type="text" placeholder="자산명을 입력해주세요.">
        </div>
        <div class="line"></div>
        <div class="set">
            <div class="classification">결제일</div>
                <input class="day" type="number" min="1" max="31" placeholder="카드 결제일을 숫자만 입력해주세요.">일
        </div>
        <div class="line"></div>
        <div class="set">
            <div class="classification">잔액</div>
            <input class="balance" type="number" min="0" placeholder="금액을 숫자만 입력해주세요.">원
        </div>
        <div class="line"></div>
        <div class="set">
            <div class="classification">연동 계좌</div>
            <select name="account" class="connected">
                <option v-for="account in accounts" :key="account" value="{{ account }}"></option>
            </select>
        </div>
        <div class="set">
            <div class="classification">카테고리</div>
            <select name="category" class="category"></select>
        </div>
    </div>
    <RouterLink to="/my/asset">
        <button @click="addAsset" class="save">등록</button>
    </RouterLink>
</template>

<script setup>
    import { onMounted, ref } from 'vue';

    const assets = ref([]);
    const accounts = ref([]);
    onMounted(async () => {
        const response = await fetch('http://localhost:8080/asset');
        assets.value = await response.json();

        for(let i = 0; i < assets.length; i++) {
            if(assets[i].categoty === '은행계좌') {
                accounts.value.push(assets[i].name);
            }
        };
        return accounts;
    })

    function addAsset() {
        // 구현 예정
    }
</script>

<style scoped>
    @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap");

    .container {
        display: flex;
        flex-direction: column;
        margin-top: 80px;
    }

    .set {
        display: flex;
        flex-direction: row;
        margin-top: 66px;
        align-items: center;
    }

    .classification {
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 500;
        font-size: 22px;
        line-height: 26px;
        color: #101424;
    }
    
    .name {
        width: 560px;
        height: 29px;
        margin-left: 180px;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 300;
        font-size: 18px;
        line-height: 22px;
        color: #101424;
        border: none;
    }

    .line {
        width: 540px;
        margin-left: 240px;
        margin-top: 2px;
        background: #B1B1D2;
        border: 1px solid #B1B1D2;
    }

    .day {
        width: 540px;
        height: 29px;
        margin-left: 180px;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 300;
        font-size: 18px;
        line-height: 22px;
        color: #101424;
        border: none;
    }

    .balance {
        width: 540px;
        height: 29px;
        margin-left: 200px;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 300;
        font-size: 18px;
        line-height: 22px;
        color: #101424;
        border: none;
    }

    .connected {
        width: 560px;
        height: 40px;
        margin-left: 155px;

        border: 1px solid #B1B1D2;
        border-radius: 5px;
    }

    .category {
        width: 560px;
        height: 40px;
        margin-left: 161px;

        border: 1px solid #B1B1D2;
        border-radius: 5px;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    select {
        appearance:none;
        background:url('../../../src/assets/icons/가계부_셀렉트박스_화살표.svg') no-repeat right 8px center;
        padding-right: 30px;
        border-color: #B1B1D2;
        border-radius: 5px;
    }

    .save {
        width: 84px;
        height: 48px;
        margin-left: 740px;
        margin-top: 70px;

        background: #101424;
        border-radius: 13px;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 350;
        font-size: 24px;
        line-height: 26px;
        color: #FFFFFF;

        cursor: pointer;
    }
</style>