<template>
    <div class="chip">
        {{ props.label }}
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    label: String
});
</script>

<style scoped>
.chip {
    background-color: #25272F;
    padding: 5px 20px;
    border-radius: 16px;

    display: flex;
    justify-content: center;
    align-items: center;

    color: white;
    font-size: 17px;

    + .chip {
        margin-left: 10px;
    }
}
</style>