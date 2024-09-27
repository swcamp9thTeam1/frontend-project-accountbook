<script setup>
    import MyAssetList from '@/components/myPage/MyAssetList.vue';
    import { computed, onMounted, ref } from 'vue';
    import { RouterLink } from 'vue-router';

    const assets = ref([]);
    const member = ref({});
    const totalAsset = ref(0);

    onMounted(async () => {
        const response = await fetch('http://localhost:8080/member');
        member.value = await response.json();
    })

    onMounted(async () => {
        const response = await fetch('http://localhost:8080/asset');
        assets.value = await response.json();

        totalAsset.value = assets.value.reduce((sum, asset) => sum + asset.balance, 0);
    })
</script>

<template>
    <div class="container">
        <div class="total">
            <div class="total-balance">{{ member.memberId }} 님의 보유 자산 총액은 {{ totalAsset.toLocaleString() }}원 입니다.</div>
            <RouterLink to="/my/asset/add">
                <button type="button" class="insert">자산 추가</button>
            </RouterLink>
        </div>
        <div class="list">
            <ul>
                <MyAssetList v-for="asset in assets" :key="asset.id" :asset/>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
    }

    .total {
        display: flex;
        flex-direction: row;
        position: absolute;
        top: 220px;
    }

    .total-balance {
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 400;
        font-size: 26px;
        line-height: 30px;
        color: #4D4D4D;
    }

    .insert {
        position: absolute;
        width: 120px;
        height: 38px;
        margin-left: 126px;

        background: #F3F3FF;
        border-radius: 25.5px;
        border: none;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 350;
        font-size: 18px;
        line-height: 25px;
        color: #25272F;
    }

    .list {
        display: flex;
        flex-direction: column;
        margin-top: 170px;
    }
</style>