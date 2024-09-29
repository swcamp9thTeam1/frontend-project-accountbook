<template>
    <form @submit.prevent="submitNewAsset" class="container">
        <div class="set">
            <div class="classification">카테고리</div>
            <select v-model="newAsset.category" name="category" class="category" @change="onCategoryChange">
                <option value="현금">현금</option>
                <option value="은행계좌">은행계좌</option>
                <option value="체크카드">체크카드</option>
                <option value="신용카드">신용카드</option>
                <option value="저축">저축</option>
                <option value="대출">대출</option>
            </select>
        </div>
        <div class="set">
            <div class="classification">자산명</div>
            <input v-model="newAsset.name" class="name" type="text" placeholder="자산명을 입력해주세요.">
        </div>
        <div class="line"></div>
        <div class="set">
            <div class="classification">결제일</div>
                <input v-model="newAsset.paymentDate" class="day" type="number" min="1" max="31" placeholder="카드 결제일을 숫자만 입력해주세요.">일
        </div>
        <div class="line"></div>
        <div class="set">
            <div class="classification">잔액</div>
            <input v-model="newAsset.balance" class="balance" type="number" min="0" placeholder="금액을 숫자만 입력해주세요.">원
        </div>
        <div class="line"></div>
        <div class="set">
            <div class="classification">연동 계좌</div>
            <select v-model="newAsset.connectedAsset" name="account" class="connected">
                <option v-for="account in filteredAccounts()" :key="account.id" :value="account.name">
                    {{ account.name }}
                </option>
            </select>
        </div>
    </form>
    <button type="submit" @click="addAsset" class="save">등록</button>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const assets = ref([]);
    onMounted(async () => {
        const response = await fetch('http://localhost:8080/asset');
        assets.value = await response.json();
    })

    const newAsset = ref({
        id: '',
        category: '',
        name: '',
        balance: 0,
        paymentDate: '',
        connectedAsset: ''
    });

    // 카테고리가 '은행계좌'인 자산만 필터링
    function filteredAccounts() {
        return assets.value.filter(asset => 
            asset.category === '은행계좌' && newAsset.value.category === '체크카드'
        )
    }

    // 카테고리 변경 시 호출되는 함수
    const onCategoryChange = () => {
        if (newAsset.value.category !== '체크카드') {
            newAsset.value.connectedAsset = ''; // 카테고리가 체크카드가 아닐 경우 초기화
        }
    };

    async function addAsset() {
        newAsset.value.id = String(Math.max(...assets.value.map(asset => parseInt(asset.id, 10))) + 1);

        const response = await fetch(`http://localhost:8080/asset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAsset.value),
            });

            if (response.ok) {
                // 서버에서 새로운 자산을 추가한 후, 클라이언트의 assets 업데이트
                const addedAsset = await response.json();
                assets.value.push(addedAsset);  // 새로운 자산을 assets 배열에 추가
                console.log(assets.value);      // 추가 후의 배열 확인

                router.push('/my/asset');
            } else {
                console.error('자산 추가에 실패했습니다.');
            }
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