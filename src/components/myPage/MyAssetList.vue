<script setup>
    import { RouterLink } from 'vue-router';
    import { ref, defineProps, onMounted, inject } from 'vue';

    const props = defineProps({
        asset:Object
    })
    
    const assets = inject('assets');

    async function confirmDelete(id) {
        const isConfirmed = confirm('정말 삭제하시겠습니까?');
        if (isConfirmed) {
            // 서버에 DELETE 요청 보내기
            const response = await fetch(`http://localhost:8080/asset/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // 삭제가 성공하면 클라이언트의 assets 업데이트
                assets.value = assets.value.filter(val => val.id !== id);
                console.log(assets.value); // 삭제 후의 배열 확인
            } else {
                console.error('삭제에 실패했습니다.');
            }
        }
    }
</script>

<template>
    <div class="asset">
        <div class="asset-name">{{ asset.name }}</div>
        <div class="asset-container">
            <div class="asset-balance">{{ Number(asset.balance).toLocaleString() }}원</div>
            <RouterLink :to="`/my/asset/${ asset.id }-modify`">
                <button type="button" class="modify">수정</button>
            </RouterLink>
            <button type="button" class="delete" @click="confirmDelete(asset.id)">삭제</button>
        </div>
    </div>
</template>

<style scoped>
    @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap");

    .asset {
        display: flex;
        padding: 0 30px;
        width: 95%;
        height: 90px;
        align-items: center;
        margin-top: 10px;
        justify-content: space-between;

        background: #F9F9FF;
        box-shadow: 0px 0px 7px 1px #DFDFF5;
        border-radius: 15px;
    }

    .asset-name {
        text-align: left;
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 35px;
        color: #25272F;

        text-wrap: nowrap;
    }

    .asset-container {
        display: flex;
        flex-direction: row;
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

    button {
        cursor: pointer;
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