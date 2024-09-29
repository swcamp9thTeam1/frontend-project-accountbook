<template>
    <div class="container">
        <div class="L1">
            <p>{{ list.length }}개의 글</p>
            <button type="button" @click="createPost" class="btn1">작성하기</button>
        </div>
        <div class="L2">
            <p>번호</p>
            <p>제목</p>
            <p>작성자</p>
            <p>작성일</p>
        </div>
        <div class="L3">
            <div v-for="post in list" :key="post.code" class="p">
                <a href="" @click="toPost(post.code)">{{ post.code }}</a>
                <div>
                    <a href="" @click="toPost(post.code)">{{ post.title }}</a>
                    <a>{{ post.cnt }}</a>
                </div> 
                <a href="" @click="toAcc(post.member_code)">{{ post.id }}</a> 
                <a>{{ post.created_at }}</a>
            </div>
        </div>
        <div class="L4">
            <div class="l4ch">
                <img src="@/assets/icons/goBack.png" v-on:click="goBack"/>
                <div class="nums" v-for="num in list.length" :key="num.code">
                    <button v-on:click="goPage">{{ num }}</button>
                </div>
                <img src="@/assets/icons/goNext.png" v-on:click="goNext"/>
            </div>
        </div>
        <div class="L5">
            <hr />
        </div>
        <div class="L6">
            <select class="ddBtn1">
                <option selected>전체기간</option>
                <option>직접입력</option>
            </select>
            <select class="ddBtn2">
                <option selected>게시글 + 댓글</option>
                <option>게시글</option>
                <option>댓글</option>
            </select>
            <input placeholder="검색어를 입력해주세요" type="search" v-model="searchFunc" />
        </div>
    </div>
</template>

<script setup>
    import {ref, onMounted} from 'vue';
    import {useRoute, useRouter} from 'vue-router';

    const router = useRouter();
    const route = useRoute();

    const memberCode = localStorage.getItem("member_code");
    const groupCode = route.query.code;
    const list = ref([]);
    const comments = ref(0);



    onMounted(async () => {
        const response = await fetch("http://localhost:8080/group-post");
        const data = await response.json();

        const resp2 = await fetch("http://localhost:8080/group-post-comment")
        const data2 = await resp2.json();

        makeList(data);
        cntCommt(data2);
        nums.value = ref(range(index.value, next.value));
    });

    const makeList = (data) => {
        for(let i=0; i<data.length;i++) {
            let tmp = data[i].created_at.split(' ')[0];
            data[i].created_at = tmp;
            if(data[i].acc_group_code === parseInt(groupCode)){
                list.value.push(data[i])
            }
        }
    }

    const cntCommt = (data) => {
        for(let j=0; j<list.value.length; j++){
            let num = 0;
            for(let i=0; i<data.length; i++){
                if(list.value[j].code === data[i].acc_group_post_code){
                    num += 1;
                }
            }
            list.value[j].cnt = num;
        }
    }


    const createPost = () => {
        router.push(`dopost?code=${memberCode.value}`);
    }

    const toPost = (pNum) => {
        router.push(`post?code=${pNum}`);
    }
    const toAcc = (aCode) => {
        router.push(`acc?code=${aCode}`);
    }

    const nums = ref([]);
    const index = ref(0);
    const next = ref(10);

    const goBack = () => {
        if (index.value > 0){
            if (next.value - index.value < 10){
                next.value -= (list.length % 10);
            } else {
                next.value -= 10;
            }
            index.value -= 10;
        }
        updateNums();
    }

    const goNext = () => {
        if (next.value < list.length) {
            if (next.value + 10 > list.length){
                next.value = list.length;
            } else {
                next.value += 10;
            }
            index.value += 10;
        }
        updateNums();
    }

    const updateNums = () => {
        nums.value = range(index.value, next.value);
    }
</script>

<style scoped>
    .container {
        display: grid;
        grid-template-columns: 900px;
        grid-template-rows: 80px 40px 550px 50px 30px 50px;
        margin-top: 50px;
        gap: 2px 0;
    }
    .L1 {
        display: grid;
        grid-template-columns: 800px 100px;
        align-content: end;
        gap: 2px 0;
    }
    .btn1 {
        width: 89px;
        height: 32px;
        color: white;
        border-radius: 16px;
        background: #25272F;
        align-self: flex-end;
        justify-self: end;
        margin-bottom: 5px;
        cursor: pointer;
    }
    .L2 {
        display: grid;
        grid-template-columns: 100px 500px 150px 150px;
        height: 38px;
        border-top: 1px solid black;
        border-bottom: 1px solid black;
        justify-items: center;
        align-items: center;
        font-weight: bold;
    }
    .L2 p {
        margin: 0;
        flex: 1;
    }
    .L2 p:nth-child(3) {
        justify-self: start;
    }
    .L3 {
        display:grid;
        margin-top: 10px;
        grid-template-rows: repeat(10, 50px);
        gap: 2px 0;
        align-items: center;
    }
    a, p {
        margin: 0;
        text-decoration-line: none;
    }
    .p {
        display: grid;
        grid-template-columns: 100px 500px 150px 150px;
        grid-template-rows: 50px;
        align-items: center;
        justify-items: center;
        background-color: #F9F9FF;
    }
    .p div {
        display: inline-flex;
        gap: 0 20px;
        justify-self: left;
    }
    .p div a:nth-child(2) {
        width: 18.681px;
        height: 25px;
        border-radius: 100px;
        background: #E0E0F9;
        text-align: center;
    }
    .p a:nth-child(3) {
        justify-self: left;
    }
    .L4 {
        justify-self: center;
        align-self: end;
    }
    .l4ch {
        display: inline-flex;
        gap: 0 20px;
        justify-content: center;
        align-items: center;
    }
    .l4ch img {
        width: 7px;
        height: 16.183px;    
    }
    .nums {
        display: inline-flex;
        gap: 0 10px;
        justify-content: center;
        align-items: center;
    }
    .nums button{
        width: 26px;
        height: 26px;
        border-radius: 3px;
        background-color: #B1B1D2;
        border: none;
        outline: none;
        color: white;
    }
    .L5 {
        align-self: center;
    }
    hr {
        width: 900px;
        height: 2px;
        background-color: #B1B1D2;
        border: none;
        outline: none;
    }
    
    .L6 {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0 30px;
    }
    select {
        width: 150px;
        height: 30px;
        text-align: center;
        color: gray;
        border-color: #B1B1D2;
        outline-color: #B1B1D2;
    }
    .L6 input {
        width: 300px;
        height: 30px;
        color: gray;
        outline-color: #B1B1D2;
        border: 1px solid #B1B1D2;
        
    }

</style>