<template>
    <div class="write-review-container">
        <div class="title">리뷰 작성</div>

        <WriteReviewInput :label="'방문 인원'" :suffixWord="'명'" />
        <WriteReviewInput :label="'총 지출액'" :suffixWord="'원'" />
        <br>
        <WriteReviewTextarea :label="'한 줄 리뷰'" />

        <div style="display: flex; margin-top: 30px; justify-content: space-between;align-items: center;">
            <button style="background-color:rgb(243, 243, 255);border: 0px; border-radius: 50px;display: flex; align-items: center; width: 134px; height: 45px;">
                    <!-- <img src="/image/plus_button.svg" alt="" style="width: 30px;"> -->
                    <span style="font-size: 20px;margin-left: 8px;">사진등록</span>
            </button>
            <span style="color: #ACACAC; font-size: 16px;">최대 8장까지 등록 가능</span>
        </div>

        <div>
            <!-- 리뷰 사진 8장 -->
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); grid-gap: 20px; margin-top: 20px;">
                <!-- <div style="position: relative;">
                    <img src="/image/짜장면 1.svg" alt="" style="width: 100%; height: auto;">
                    <button style="background-color: transparent; border: none; position: absolute; top: -7px; right: -7px;">
                        <img src="/image/button_close.svg" alt="">
                    </button>
                </div>

                <div style="position: relative;">
                    <img src="/image/짜장면 1.svg" alt="" style="width: 100%; height: auto;">
                    <button style="background-color: transparent; border: none; position: absolute; top: -7px; right: -7px;">
                        <img src="/image/button_close.svg" alt="">
                    </button>
                </div>


                <div style="position: relative;">
                    <img src="/image/짜장면 1.svg" alt="" style="width: 100%; height: auto;">
                    <button style="background-color: transparent; border: none; position: absolute; top: -7px; right: -7px;">
                        <img src="/image/button_close.svg" alt="">
                    </button>
                </div>


                <div style="position: relative;">
                    <img src="/image/짜장면 1.svg" alt="" style="width: 100%; height: auto;">
                    <button style="background-color: transparent; border: none; position: absolute; top: -7px; right: -7px;">
                        <img src="/image/button_close.svg" alt="">
                    </button>
                </div>


                <div style="position: relative;">
                    <img src="/image/짜장면 1.svg" alt="" style="width: 100%; height: auto;">
                    <button style="background-color: transparent; border: none; position: absolute; top: -7px; right: -7px;">
                        <img src="/image/button_close.svg" alt="">
                    </button>
                </div>



                <div style="position: relative;">
                    <img src="/image/짜장면 1.svg" alt="" style="width: 100%; height: auto;">
                    <button style="background-color: transparent; border: none; position: absolute; top: -7px; right: -7px;">
                        <img src="/image/button_close.svg" alt="">
                    </button>
                </div>


                <div style="position: relative;">
                    <img src="/image/짜장면 1.svg" alt="" style="width: 100%; height: auto;">
                    <button style="background-color: transparent; border: none; position: absolute; top: -7px; right: -7px;">
                        <img src="/image/button_close.svg" alt="">
                    </button>
                </div>


                <div style="position: relative;">
                    <img src="/image/짜장면 1.svg" alt="" style="width: 100%; height: auto;">
                    <button style="background-color: transparent; border: none; position: absolute; top: -7px; right: -7px;">
                        <img src="/image/button_close.svg" alt="">
                    </button>
                </div> -->

            </div>


            <br>
            <div style="display: flex;justify-content: space-between;">
                <!-- 취소 버튼 -->
                <button style="background-color: white; color: rgb(97, 97, 177); border-radius: 30px; border-color:rgb(97, 97, 177);border-style: solid; font-size: 16px; width: 110px ; height: 35px;">취소</button>

                <!-- 저장하기 버튼 -->
                <button style="background-color: #25272F; color: white; border-radius: 30px; border-color: #25272F; border-style: solid; font-size: 16px; width: 110px ; height: 35px;">저장하기</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onBeforeUpdate } from 'vue';
import WriteReviewInput from '@/components/forms/WriteReviewInput.vue';
import WriteReviewTextarea from '../forms/WriteReviewTextarea.vue';

const peopleNum = ref("");

const changePeopleNum = (event) => {
    peopleNum.value = event.target.value;
}

onBeforeUpdate(() => {
    console.log("업데이트 전!!")
    peopleNum.value = peopleNum.value.replace(/[^0-9]/g, "");
    console.log(peopleNum.value)
})

</script>

<style scoped>
.write-review-container {
    padding: 20px;

    .title {
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 30px;
    }
}
</style>