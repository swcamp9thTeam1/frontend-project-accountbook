<template>
    <div class="store-category-icon-container">
        <img :src="imageSrc" alt="가게 카테고리 아이콘">
    </div>
</template>

<script setup>
import { defineProps, ref, watchEffect } from 'vue';

const props = defineProps({
    categoryCode: {
        type: String,
        required: true
    }
})

const imageSrc = ref("");

// 넘어온 categoryCode에 따라 icon src 설정
watchEffect(() => {
    switch (props.categoryCode) {
        case "FD6":
            imageSrc.value = "/src/assets/icons/ic-store-category-fd6.svg";
            break;
    
        default:
            break;
    }
});
</script>

<style scoped>
.store-category-icon-container {
    width: 74px;
    height: 74px;
    border-radius: 50%;
    border: 0.6px solid #B1B1D2;
    background-color: white;

    display: flex;
    align-items: center;
    justify-content: center;
}
</style>