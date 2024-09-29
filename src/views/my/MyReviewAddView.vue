<template>
    <div class="add-review-container">
        <div class="flexbox">
            <label for="">가게명</label>
            <div class="store-name">{{ storeName }}</div>
        </div>
        <div class="flexbox">
            <label for="">인원 수</label>
            <div class="input-area">
                <input type="text" v-model="peopleNum" placeholder="인원수를 입력해주세요">
                <div class="suffix-word">명</div>
            </div>
        </div>
        <div class="flexbox">
            <label for="">총 지출 금액</label>
            <div class="input-area">
                <input type="text" v-model="totalPrice" placeholder="총 지출금액을 입력해주세요">
                <div class="suffix-word">원</div>
            </div>       
        </div>
        <div class="flexbox">
            <label for="">한 줄 리뷰</label>
            <input type="text" v-model="reviewContent" placeholder="한 줄 리뷰를 작성해주세요">
        </div>
        <div class="flexbox">
            <label for="">첨부파일</label>
            <div class="selected-files">
                <p v-for="uploadFile in uploadFiles" :key="uploadFile.name">{{ uploadFile.name }}</p>
            </div>
            <button type="button" class="btn-choose-file" @click="clickUpload">파일선택</button>
            <input type="file" multiple accept="image/*" ref="refInputFile" style="display: none;" @change="changeFile">
        </div>

        <div class="flex-end">
            <button type="button" @click="clickSave" class="btn-save">등록</button>
        </div>

    </div>
</template>

<script setup>
import { openSuccessMessageDialog } from '@/utils/dialogManager';
import { ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const maxCnt = 8;

const storeName = ref("");
const peopleNum = ref("");
const totalPrice = ref("");
const reviewContent = ref("");
const uploadFiles = ref([]);


watchEffect(() => {
    storeName.value = route.query.storeName;
});

const refInputFile = ref(null);

const clickUpload = () => {
    refInputFile.value.click();
}

const changeFile = (event) => {
    const { target: { files } } = event;

    if (files.length > maxCnt) {
        alert(`최대 ${maxCnt}장까지 업로드 가능합니다.`);
        return;
    }

    uploadFiles.value = Array.from(files);
}

const clickSave = async () => {
    if (!peopleNum.value || !totalPrice.value || !reviewContent.value) {
        alert("인원 수, 총 지출금액, 한줄 리뷰는 입력 필수입니다.");
        return;
    }

    const ok = window.confirm("리뷰 등록을 진행할까요?")
    if (!ok) return;

    try {
        const response = await fetch("http://localhost:8080/my-reviews", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                peopleNum: Number(peopleNum.value),
                totalPrice: Number(totalPrice.value),
                content: reviewContent.value,
                images: [],
                storeName: storeName.value,
                storeCostAvg: 10500
            })
        });

        if (response.ok) {
            openSuccessMessageDialog();
            router.replace("/my/review");
        }
    } catch (err) {
        alert("리뷰 등록 중 에러가 발생했습니다.");
    }
}
</script>

<style scoped>
.flexbox {
    display: flex;
    align-items: center;

    + .flexbox {
        margin-top: 40px;
    }
}

.flex-end {
    display: flex;
    justify-content: flex-end;
}

button {
    border: none;
    background-color: transparent;
}

.add-review-container {
    position: relative;
    top: 150px;

    label {
        font-size: 22.84px;
        font-weight: 500;
        width: 300px;
    }
    
    input {
        font-size: 20px;
        border: none;
        border-bottom: 1px solid #B1B1D2;
        text-align: right;
        width: 500px;
        padding-bottom: 5px;

        &::placeholder {
            color: #B1B1D2;
            font-weight: 300;
        }
        
        &:focus-visible {
            outline: none;
        }
    }

    .store-name {
        font-size: 20px;
        font-weight: 400;
    }

    .selected-files {
        border: 1px solid #B1B1D2;
        padding: 10px;
        margin-right: 10px;
        width: 500px;
        min-height: 31px;

        p {
            margin: 0;

            + p {
                margin-top: 10px;
            }
        }
    }

    .btn-choose-file {
        background-color: #B1B1D2;
        border-radius: 5px;
        padding: 5px 10px;
        
        color: white;
        font-size: 20px;
    }

    .input-area {
        position: relative;

        .suffix-word {
            position: absolute;
            bottom: 0;
            right: -30px;

            font-size: 22.84px;
            font-weight: 600;
        }
    }

    .btn-save {
        border-radius: 13px;
        background-color: #101424;
        width: 100px;
        height: 55px;
        
        font-size: 32px;
        color: white;
        margin-top: 60px;
    }
}
</style>