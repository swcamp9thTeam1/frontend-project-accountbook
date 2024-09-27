<script setup>
    import { RouterLink } from 'vue-router';
    import { ref, defineProps } from 'vue';

    const props = defineProps({
        asset:Object
    })

    function confirmDelete(id) {
        const isConfirmed = confirm('정말 삭제하시겠습니까?');
        if (isConfirmed) {
            this.deleteAsset(id);
        }
    }       // 아직 구현중
            // categoryTotal 구현 필요
</script>

<template>
    <div class="asset-classification">
        <div class="asset-category">{{ asset.category }}</div>
        <div class="category-total">총 {{ categoryTotal }}원</div>
    </div>
    
    <div class="asset">
        <div class="asset-name">{{ asset.name }}</div>
        <div class="asset-balance">{{ asset.balance.toLocaleString() }}원</div>
        <RouterLink :to="`/my/asset/${ asset.id }/modify`">
            <button type="button" class="modify">수정</button>
        </RouterLink>
        <button type="button" class="delete" @click="confirmDelete(asset.id)">삭제</button>
    </div>
</template>

<style scoped>
    @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap");

    .asset-classification {
        display: flex;
        flex-direction: row;
        margin-top: 30px;
        align-items: center;

        text-wrap: nowrap;
    }

    .asset-category {
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

    .asset {
        display: flex;
        flex-direction: row;
        width: 750px;
        height: 90px;
        align-items: center;
        margin-top: 10px;

        background: #F9F9FF;
        box-shadow: 0px 0px 7px 1px #DFDFF5;
        border-radius: 15px;
    }

    .asset-name {
        text-align: left;
        margin-left: 48px;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 35px;
        color: #25272F;

        text-wrap: nowrap;
    }

    .asset-balance {
        width: 180px;
        text-align: right;
        margin-left: 270px;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 350;
        font-size: 24px;
        line-height: 30px;
        color: #484848;

        text-wrap: nowrap;
    }

    .modify {
        width: 64px;
        height: 32px;
        margin-left: 12px;
        background: #25272F;
        border-radius: 7px;
        border: none;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 350;
        font-size: 17px;
        line-height: 20px;
        color: #FFFFFF;
    }

    .delete {
        width: 64px;
        height: 32px;
        margin-left: 6px;
        background: #B1B1D2;
        border-radius: 7px;
        border: none;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 350;
        font-size: 17px;
        line-height: 20px;
        color: #FFFFFF;
    }
</style>