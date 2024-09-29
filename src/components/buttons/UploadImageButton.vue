<template>
    <button type="button" class="btn-upload-image" @click="clickUpload">
        <img src="@/assets/icons/button-plus.svg" alt="사진 업로드">
        <span>사진등록</span>
    </button>
    <input type="file" multiple accept="image/*" ref="refInputFile" style="display: none;" @change="changeFile">
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue';

const emit = defineEmits(['onChangeFile']);
const props = defineProps({
    maxCnt: Number,
    currentCnt: {
        type: Number,
        required: true
    }
})

const refInputFile = ref(null);

const clickUpload = () => {
    refInputFile.value.click();
}

const changeFile = (event) => {
    const { target: { files } } = event;
    const length = files.length;
    const newImages = [];

    if (props.maxCnt) {
        if (props.currentCnt + length > props.maxCnt) {
            alert(`최대 ${props.maxCnt}장까지 업로드 가능합니다.`);
            return;
        }
    }

    for (let i = 0; i < length; i++) {
        const file = files[i];
        newImages.push(URL.createObjectURL(file));    // 프리뷰 이미지 생성
    }

    emit('onChangeFile', newImages);
}
</script>

<style scoped>
.btn-upload-image {
    background-color:rgb(243, 243, 255);
    border: 0px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    width: 134px;
    height: 45px;

    img {
        width: 30px;
    }

    span {
        font-size: 20px;
        margin-left: 8px;
    }
}
</style>