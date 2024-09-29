<template>
    <form @submit.prevent="submitEdit" class="container">
        <div class="set">
            <div class="classification">카테고리</div>
            <select v-model="editingAsset.category" name="category" class="category" @change="onCategoryChange">
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
            <input v-model="editingAsset.name" class="name" type="text">
        </div>
        <div class="line"></div>
        <div class="set">
            <div class="classification">결제일</div>
                <input v-model="editingAsset.paymentDate" class="day" type="number" min="1" max="31">일
        </div>
        <div class="line"></div>
        <div class="set">
            <div class="classification">잔액</div>
            <input v-model="editingAsset.balance" class="balance" type="number" min="0">원
        </div>
        <div class="line"></div>
        <div class="set">
            <div class="classification">연동 계좌</div>
            <select v-model="editingAsset.connectedAsset" name="account" class="connected">
                <option v-for="account in filteredAccounts()" :key="account.id" :value="account.name">
                    {{ account.name }}
                </option>
            </select>
        </div>
    </form>
    <button type="submit" @click="editAsset" class="save">등록</button>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    const router = useRouter();
    const route = useRoute();
    const assets = ref([]);
    const editingAsset = ref({});

    onMounted(async () => {
        const response = await fetch('http://localhost:8080/asset');
        assets.value = await response.json();

        const assetId = route.params.id;    // URL 파라미터에서 ID 가져오기
        editingAsset.value = assets.value.find(asset => asset.id === assetId);  // 해당 자산 데이터 찾기
    })

    // 카테고리가 '은행계좌'인 자산만 필터링
    function filteredAccounts() {
        return assets.value.filter(asset => 
            asset.category === '은행계좌' && editingAsset.value.category === '체크카드'
        )
    }

    // 카테고리 변경 시 호출되는 함수
    const onCategoryChange = () => {
        if (editingAsset.value.category !== '체크카드') {
            editingAsset.value.connectedAsset = ''; // 카테고리가 체크카드가 아닐 경우 초기화
        }
    };

    async function editAsset() {
        const index = assets.value.findIndex(asset => asset.id === editingAsset.value.id);
        if (index !== -1) {
            assets.value[index] = { ...editingAsset.value };    // 수정된 데이터로 업데이트
        }

        const response = await fetch(`http://localhost:8080/asset/${editingAsset.value.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editingAsset.value)
        });

        if (response.ok) {
            alert('자산 정보가 수정되었습니다.');
            router.push('/my/asset')
        } else {
            alert('자산 정보 수정에 실패했습니다.');
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