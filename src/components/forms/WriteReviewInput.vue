<template>
    <div class="write-review-input-container">
        <label>{{ props.label }}</label>
        <input type="text" :class="{ suffix: props.suffixWord }" >
        <span v-if="props.suffixWord">{{ props.suffixWord }}</span>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    label: String,
    suffixWord: String
});

</script>

<style scoped>
.write-review-input-container {
    display: flex;
    align-items: center;
    position: relative;

    + .write-review-input-container {
        margin-top: 16px;
    }

    label {
        font-size: 16px;
        width: 100px;
    }

    input {
        font-size: 20px;
        border: 1px rgba(198, 198, 235) solid;
        background-color:#f8f8ff;
        flex-grow: 1;
        text-align: right;
        padding: 5px 10px;

        &:focus-visible {
            outline: none;
        }

        &.suffix {
            padding-right: 30px;
        }
    }

    span {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: gray;
    }
}
</style>