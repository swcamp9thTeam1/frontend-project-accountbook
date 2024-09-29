<script setup>
    import MyAssetList from '@/components/myPage/MyAssetList.vue';
    import { provide, onMounted, ref, watchEffect } from 'vue';
    import { RouterLink } from 'vue-router';

    const assets = ref([]);
    const member = ref({});
    const totalAsset = ref(0);
    const categories = ref([]);

    onMounted(async () => {
        const response = await fetch('http://localhost:8080/member');
        member.value = await response.json();
    })

    onMounted(async () => {
        const response = await fetch('http://localhost:8080/asset');
        assets.value = await response.json();
    });

    watchEffect(() => {
        // 총 합계
        totalAsset.value = assets.value.reduce((sum, asset) => sum + asset.balance, 0);

        // 카테고리별로 새로운 배열 만들기
        categories.value = [...new Set(assets.value.map(asset => asset.category))];
    })

    provide('assets', assets);

    function calcTotalBalance(category) {
        return assets.value.filter(asset => asset.category === category).reduce((sum, asset) => sum + asset.balance, 0);
    }
</script>

<template>
    <div class="container">
        <div class="total">
            <div class="total-balance">{{ member.nickname }} 님의 보유 자산 총액은 {{ totalAsset.toLocaleString() }}원 입니다.</div>
            <RouterLink to="/my/asset/add">
                <button type="button" class="insert">자산 추가</button>
            </RouterLink>
        </div>
        <div class="list">
            <div v-for="category in categories" :key="category" class="categories">
                <div class="category-container">
                    <div class="category-name">
                        {{ category }}
                    </div>
                    <div class="category-total">
                        총 {{ (calcTotalBalance(category)).toLocaleString() }}원
                    </div>
                </div>
                <div v-for="asset in assets.filter(val => val.category === category)" :key="asset.id">
                    <MyAssetList :asset/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap");

    .categories {
        margin-top: 30px;
    }

    .category-container {
        display: flex;
        justify-content: space-between;
    }

    .category-name {
        width: 150px;
        height: 32px;
        background: #25272F;
        border-radius: 16px;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 28px;
        color: #FFFFFF;

        text-align: center;
    }

    .category-total {
        margin-left: 550px;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 24px;
        color: #484848;
    }

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

        cursor: pointer;
    }

    .list {
        margin-top: 200px;
    }
</style>