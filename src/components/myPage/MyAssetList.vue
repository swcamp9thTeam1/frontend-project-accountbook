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
    }
</script>

<template>
    <div class="asset-classification">
        <div class="asset-category">{{ asset.category }}</div>
        <div class="category-total">총 {{ categoryTotal }}원</div>
    </div>
    
    <div class="asset">
        <div class="asset-name">{{ asset.name }}</div>
        <div class="asset-balance">{{ Number(asset.balance).toLocaleString() }}</div>
        <RouterLink :to="`/my/asset/${ asset.id }/modify`">
            <button type="button" class="modify">수정</button>
        </RouterLink>
        <button type="button" class="delete" @click="confirmDelete(asset.id)">삭제</button>
    </div>
</template>

<style scoped>
    @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap");

    .asset-classification {
        position: relative;
        margin-left: 50px;
        margin-top: 130px;
    }

    .asset-category {
        margin-left: 56px;
        margin-top: 66px;

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
</style>