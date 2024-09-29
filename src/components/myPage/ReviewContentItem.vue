<template>
    <div class="item-review-content">
        <div class="label">{{ props.label }}</div>
        <div class="value">{{ props.value }}</div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
})

</script>

<style scoped>
.item-review-content {
    display: flex;
    align-items: center;

    .label {
        font-size: 20px;
        font-weight: 600;
        width: 250px;
        margin-right: 16px;
    }

    .value {
        font-size: 20px;
        font-weight: 400;
    }

    + .item-review-content {
        margin-top: 20px;
    }
}
</style>