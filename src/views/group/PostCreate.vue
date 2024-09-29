<template>
    <div class="page">
        <h4>게시글 작성하기</h4>
        <div class="container">
            <div class="title">
                <p>제목</p>
                <div>
                    <input id="t" type="text" placeholder="제목을 입력해주세요" v-model="pTitle">
                </div>
            </div>
            <div class="content">
                <p>내용</p>
                <div>
                    <textarea id="c" type="string" placeholder="내용을 입력해주세요" v-model="pContent" />
                </div>
            </div>
            <div class="attached">
                <p>첨부파일</p>
                <div class="upBtn">
                    <input id="f" type="string" :value="imgs" placeholder="선택된 파일 없음" readonly />
                    <div class="b">
                        <label for="att">파일찾기
                            <input id="att" type="file" accept=".png, .jpeg, .jpg" @change="add($event)" multiple>
                        </label>
                    </div>
                    <input type="button" value="파일삭제" @click="rst" />
                </div>
            </div>
            <div class="btn">
                <button @click="submit">글쓰기</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import {ref, onMounted} from 'vue';
    import {useRoute, useRouter} from 'vue-router';

    const route = useRoute();
    const router = useRouter();

    const pTitle = ref('');
    const pContent = ref('');
    const imgs = ref([]);
    const date = ref('');

    const file = ref([]);
    const post = ref({});
    const lastIndex1 = ref(0);
    const length1 = ref(0);
    const lastIndex2 = ref(0);
    const length2 = ref(0);

    const groupCode = route.query.code;
    const id = localStorage.getItem("member_id");
    const code = localStorage.getItem("member_code");

    const getDate = () => {
        const tmp = new Date();
        date.value = tmp.toISOString().split('.')[0].replace('T',' ');
    }

    onMounted(async () => {
        const resp = await fetch("http://localhost:8080/group-post");
        const data = await resp.json();

        const resp2 = await fetch("http://localhost:8080/group-post-file");
        const data2 = await resp2.json();

        lastIndex1.value = data[data.length-1].code+1;
        lastIndex2.value = data2[data2.length-1].code+1;

        length1.value = data.length;
        length2.value = data2.length;
    });

    const add = function (vals) {
        const val = vals.target.files;
        for(let i=0; i<val.length;i++){
            imgs.value.push(val[i].name);
        }
        var tmp = String(imgs.value).split(',');
        imgs.value = tmp;
    };
    const rst = function () {
        imgs.value = [];
    };

    const submit = function() {
        getDate();    
        post.value = {
            acc_group_code: parseInt(groupCode),
            code: lastIndex1.value,
            created_at: date.value,
            title: pTitle.value,
            detail: pContent.value,
            id: id.value,
            member_code: code.value
        };

        for(let i=0;i<imgs.value.length;i++){
            file.value.push({
                code: lastIndex2.value+i,
                name: imgs.value[i],
                path: imgs.value[i],
                acc_group_post_code: lastIndex1.value,
                id: id.value
            });
        }

        postUpload();

        router.push(`post?code=${lastIndex1.value}`);
    }

    const postUpload = async() => {
        try {
            const update1 = await fetch("http://localhost:8080/group-post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(post.value),
            });
            for (let i = 0; i < file.value.length; i++) {
                const update2 = await fetch("http://localhost:8080/group-post-file", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(file.value[i]),
                });
            }
            
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

</script>

<style scoped>
    .page {
        display: inline-block;
        margin-top: 50px;
    }
    .container {
        display: grid;
        width: 900px;
        height: 800px;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 4fr 0.7fr 0.8fr;
        border-radius: 20px;
        background: hsla(0, 0%, 96%, 0.596);
    }
    .container div p {
        justify-self: right;
        align-self: top;
        padding-top: 10px;
        font-weight: bold;
        margin: 0;
    }
    input[type=text], input[type=string], textarea {
        margin-left: 30px;
        border: none;
        outline: none;
        border-radius: 16px;
        padding: 10px;
        font-size: 20px;
    }
    .title {
        display: grid;
        grid-template-columns: 1fr 6fr;
        height: 50px;
        align-self: end;
        margin-bottom: 20px;
    }
    .title input {
        width: 650px;
    }
    
    .content {
        display: grid;
        grid-template-columns: 1fr 6fr;
    }
    .content textarea {
        width: 650px;
        height: 450px;
    }
    .attached {
        display: grid;
        grid-template-columns: 1fr 6fr;
        height: 50px;
    }
    .btn {
        display: inline-flex;
    }
    .upBtn {
        display: inline-flex;
        width: 700px;
        
    }
    .upBtn input:nth-child(1) {
        width: 550px;
        text-overflow: ellipsis;
    }
    .b {
        display: inline-flex;
        text-align: center;
        align-items: center;
    }
    .b label, .upBtn :nth-child(3) {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #D9D9D9;
        margin-left: 10px;
        height: 50px;
        width: 80px;
        border: none;
        outline: none;
        border-radius: 16px;
    }
    .b label {
        font-size: 15px;
    }
    #att {
        display: none;
    }
    .btn {
        margin-right: 70px;
        justify-content: right;
    }
    .btn button {
        width: 103px;
        height: 47px;
        background-color: #B1B5FF;
        grid-area: 1 / 2;
        border: none;
        border-radius: 16px;
    }
    ::placeholder {
        color: gray;
    }
</style>