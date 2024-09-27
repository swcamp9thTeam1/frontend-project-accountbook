<template>
    <div class="write-review-container">
        <div class="title">리뷰 작성</div>

        <WriteReviewInput :label="'방문 인원'" :suffixWord="'명'" />
        <WriteReviewInput :label="'총 지출액'" :suffixWord="'원'" />
        <br>
        <WriteReviewTextarea :label="'한 줄 리뷰'" />

        <!-- 이미지 업로드 부분 -->
        <div class="review-image-area">
            <div class="flex-between-center">
                <UploadImageButton @onChangeFile="onChangeFile" :currentCnt="previews.length" :maxCnt="maxImageCnt" />
                <span class="helper-text">최대 {{ maxImageCnt }}장까지 등록 가능</span>
            </div>

            <div class="images">
                <div class="image-item" v-for="preview in previews" :key="preview">
                    <img :src="preview" alt="리뷰 이미지">
                    <button type="button" class="btn-remove" @click="removeImage(preview)">
                        <img src="@/assets/icons/button-close.svg" alt="이미지 삭제">
                    </button>
                </div>
            </div>

            <div class="flex-between-center">
                <button type="button" class="btn-action btn-cancel" @click="emit('closeRightView')">취소</button>
                <button type="button" class="btn-action btn-save" @click="saveReview">저장하기</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import WriteReviewInput from '@/components/forms/WriteReviewInput.vue';
import WriteReviewTextarea from '@/components/forms/WriteReviewTextarea.vue';
import UploadImageButton from '@/components/buttons/UploadImageButton.vue';

const emit = defineEmits(['closeRightView']);

const previews = ref([]);
const maxImageCnt = 8;

const onChangeFile = (newImages) => {
    previews.value = [...previews.value, ...newImages];
}

const removeImage = (imageSrc) => {
    URL.revokeObjectURL(imageSrc);
    previews.value = previews.value.filter(item => item !== imageSrc);
}

const saveReview = () => {
    
    // TODO:: 가게 리뷰를 저장합니다.
}

</script>

<style scoped>
.write-review-container {
    padding: 20px;

    .title {
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 30px;
    }

    .review-image-area {
        margin-top: 30px;

        .helper-text {
            font-size: 16px;
            color: #ACACAC;
        }

        .images {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-gap: 20px;
            margin-top: 20px;
            margin-bottom: 20px;

            .image-item {
                position: relative;
                width: 120px;
                height: 120px;

                img {
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                }

                .btn-remove {
                    background-color: transparent;
                    border: none;
                    position: absolute;
                    top: -7px;
                    right: -7px;
                }
            }
        }
    }

    .btn-action {
        border-radius: 30px;
        border-style: solid;
        font-size: 16px;
        width: 110px;
        height: 35px;
    }

    .btn-cancel {
        background-color: white;
        color: rgb(97, 97, 177);
        border-color:rgb(97, 97, 177);
    }

    .btn-save {
        background-color: #25272F;
        color: white;
        border-color: #25272F;
    }
}

.flex-between-center {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>