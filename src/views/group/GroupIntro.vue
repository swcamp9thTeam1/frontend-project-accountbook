<template>
    <div class="page">
        <div class="layer1">
            <h1>그룹명</h1>
            <p>그룹 소개글</p>
        </div>
        <div class="layer2">
            <button type="submit" class="oBtn">그룹 탈퇴하기</button>
        </div>
        <div class="layer3">
            <div class="l3ch1">
                <button class="goPostList">그룹 게시판 ></button>
            </div>
            <div class="l3ch2">
                <div class="posts" v-for="p in lists" :key="p.code">
                    <div class="line">
                        <p>{{ p.name }}</p>
                        <p>{{ p.nickName }}</p>
                        <p>{{ p.createAt }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="layer4">
            <div class="l4ch">
                <p>다른 그룹원의 가계부 구경하러 가기</p>
                <button class="goAcc"> > </button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {ref} from 'vue';

</script>

<style scoped>
    .page {
        display: grid;
        grid-template-columns: 900px;
        grid-template-rows: 100px 40px 850px 550px;
        align-content: center;
        margin-top: 100px;
    }
    .layer1 {
        margin: 0 10px 0 10px;
    }
    h1 {
        margin: 0;
    }
    .layer2 {
        display: grid;
        justify-content: right;
        margin: 0 10px 0 10px;
    }
    .oBtn {
        width: 100px;
        height: 30px;
        font-size: 13px;
        border-radius: 3px;
        border: 0.3px solid #ACACAC;
        background: #FCFCFC;
        box-shadow: 2px 2px 4px 0px #9A9AC8;
        color: #ACACAC;
        font-family: "Noto Sans KR";
        font-style: normal;
        font-weight: 350;
        line-height: normal;
    }
    .layer3 {
        display: grid;
        grid-template-rows: 100px 750px;
        align-content: center;
        border-radius: 23px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background: #FFF;
        box-shadow: 0px 4px 4px 0px rgba(93, 93, 93, 0.25);
    }
    .l3ch1 {
        align-self: center;
        margin-left: 50px;
    }
    .goPostList {
        width: 135px;
        height: 35px;
        flex-shrink: 0;
        border-radius: 16px;
        background: #25272F;
        color: white;
    }
    .l3ch2 {
        display: grid;
        align-self: center;
        margin: 0 50px 0 50px;
        grid-template-rows: repeat(5, 80px);
        align-content: center;
        gap: 10px 0;
    }
    .posts {
        display: grid;
        grid-template-columns: 500px 100px 200px;
    }
</style>