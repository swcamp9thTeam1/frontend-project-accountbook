<template>
    <dialog open class="modal">

        <!-- 상단 가게명, 가게주소 -->
        <div class="top-area">
            <button type="button" class="btn-close" @click="emit('closeModal')">
                <img src="/src/assets/icons/button-close.svg" alt="Close Button">
            </button>
            <b class="store-name">{{ store.name }}</b>
            <div class="store-category">{{ store.category }}</div>
            <div class="store-address">{{ store.address }}</div>
        </div>

        <!-- 착한가격 업소면 표시 -->
        <GoodStoreBox v-if="store.good" :good="store.good" />

        <!-- 이 가게와 연동된 가계부가 있다면 표시 -->
        
    </dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, watchEffect } from 'vue';
import GoodStoreBox from './savemap/GoodStoreBox.vue';

const props = defineProps({
    storeDetailId: Number
});
const emit = defineEmits(["closeModal"]);

const store = ref({});

const getStoreDetail = async (storeId) => {
    const response = await fetch(`http://localhost:8080/stores/${storeId}`);
    const data = await response.json();
    store.value = data;
}

watchEffect(() => {
    if (!props.storeDetailId) return;

    getStoreDetail(props.storeDetailId);
});

</script>

<style scoped>
dialog.modal {
    background-color: white;
    min-width: 500px;
    max-width: 1000px;
    max-height: 80vh;
    border: none;
    border-radius: 21px;
    box-shadow: 5px 5px 9px 0px rgba(0, 0, 0, .25);
    padding: 20px;

    position: fixed;
    top: 50%;                       /* 모달을 화면의 중앙에 배치 */
    transform:translateY(-50%);     /* 모달을 화면의 중앙에 배치 */
    z-index: 4;

    &::backdrop {
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, .2);
    }

    &[open] {
        animation: show 0.5s ease normal;
        -webkit-animation: show 0.5s ease normal;
    }

    &[open]::backdrop {
        animation: show-backdrop 0.5s ease normal;
        -webkit-animation: show-backdrop 0.5s ease normal;
    }

    .top-area {
        display: flex;
        flex-direction: column;
        border-bottom: 0.6px solid #ACACAC;
        padding-bottom: 10px;

        .btn-close {
            margin-left: auto;
            background-color: transparent;
            border: none;
        }

        .store-name {
            font-size: 28px;
        }

        .store-category {
            color: #ACACAC;
            font-size: 16px;
        }

        .store-address {
            font-size: 23px;
            color: #ACACAC;
            margin-left: auto;
        }
    }
}

@keyframes show {
    from {
        transform: translateY(-200%);
    }
    to {
        transform: translateY(-50%);        /* 원래 자리로 돌아오기 */
    }
}

@keyframes show-backdrop {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>