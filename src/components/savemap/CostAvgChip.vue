<template>
    <div class="price-avg">1인당 평균 {{ props.costAvg.toLocaleString() }}원을 지출했어요!</div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    costAvg: {
        type: Number,
        required: true
    }
})

</script>

<style scoped>
.price-avg {
    background-color: rgba(198, 198, 235);
    height: 30px;
    padding: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    border-radius: 5px;
}
</style>