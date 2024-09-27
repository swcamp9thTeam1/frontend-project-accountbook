<template>
    <div class="write-review-textarea-container">
        <label>{{ props.label }}</label>
        <textarea name="" id=""></textarea>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    label: String
});

</script>

<style scoped>
.write-review-textarea-container {
    display: flex;
    width: 100%;

    label {
        font-size: 16px;
        width: 100px;
    }

    textarea {
        font-size: 20px;
        border: 1px rgba(198, 198, 235) solid;
        background-color:#f8f8ff;
        padding: 10px;
        resize: none;
        flex-grow: 1;
        height: 70px;

        &:focus-visible {
            outline: none;
        }
    }
}
</style>