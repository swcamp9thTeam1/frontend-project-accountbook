<template>
    <div class="page">
        <div class="layer1" v-bind="group">
            <h1>{{ group.name }}</h1>
            <p>{{ group.intro }}</p>
        </div>
        <div class="layer2">
            <button type="button" class="oBtn" @click="showModal">그룹 탈퇴하기</button>
            <DialogModal :visible="isModalVisible" title="그룹 탈퇴" @confirm="doLeft" @cancel="doCancel">
                <p>정말 탈퇴할거야???</p>
            </DialogModal>
        </div>
        <div class="layer3">
            <div class="l3ch1">
                <button class="goPostList" type="button" @click="goPosts">그룹 게시판 ></button>
            </div>
            <div class="l3ch2">
                <div class="posts" v-for="p in posts.slice(0,5)" :key="p.code">
                    <a class="p1" href="" @click="goPost(p.code)">{{ p.title }}</a>
                    <a class="p2" href="" @click="goAcc(p.member_code)">{{ p.id }}</a>
                    <a class="p3">{{ p.created_at }}</a>
                </div>
            </div>
        </div>
        <div class="layer4">
            <div class="l4ch">
                <p>그룹원의 가계부 구경하러 가기</p>
                <button type="button" @click="accPage" class="pBtn">
                    <img src="@/assets/icons/go.png" alt="다른 그룹원 가계부 보러 가기">
                </button>
            </div>
        </div>
    </div>

    
</template>

<script setup>
    import {ref, onMounted} from 'vue';
    import {useRoute, useRouter} from 'vue-router';

    import DialogModal from "@/components/group/MemberOutModal.vue";

    const route = useRoute();
    const router = useRouter();

    const memberCode = localStorage.getItem("member_code");
    const groupCode = route.query.code;

    const posts = ref([]);
    const group = ref({});
    const members = ref([]);

    const isDel = ref(false);

    const getPosts = (data) => {
        for (let i=0; i < data.length; i++){
            let date =  data[i].created_at.split(' ')[0];
            data[i].created_at = date;
            if(data[i].acc_group_code === parseInt(groupCode)){
                posts.value.push(data[i]);
            }
        }
    }

    const getGroup = (data) => {
        for(let i=0; i< data.length; i++){
            if(data[i].code === groupCode) {
                group.value = data[i];
                break;
            }
        }
    }

    onMounted( async() => {
        const response = await fetch("http://localhost:8080/group-post");
        const data = await response.json();

        const response2 = await fetch("http://localhost:8080/group");
        const data2 = await response2.json();

        const response3 = await fetch("http://localhost:8080/group-member");
        const data3 = await response3.json();

        members.value = data3;
        getPosts(data);
        getGroup(data2);

    });

    const goPosts = () => {
        router.push(`posts?code=${groupCode}`);
    }

    const goPost = (post) => {
        router.push(`post?code=${post}`)
    };
    const goAcc = (acc) => {
        router.push(`acc?code=${acc}`)
    };
    const accPage = () => {
        router.push(`acc?code=${groupCode}`);
    }

    const isModalVisible = ref(false);

    const showModal = () => {
        isModalVisible.value = true;
    };

    const doCancel = () => {
        isModalVisible.value = false;
    }

    const doLeft = () => {
        let len = members.value.length;
        for (let i=0; i< len; i++){
            if(members.value[i].member_code === parseInt(memberCode) && 
                members.value[i].acc_group_code === parseInt(groupCode)) {
                members.value.splice(i, 1);
                break;
            }
        }
        isModalVisible.value = false;
        router.push(`my?code=${memberCode}`);
    }


    const memUpload = async() => {
        try {
            const update = await fetch("http://localhost:8080/group-member", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(members),
            });
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };


</script>

<style scoped>
    .page {
        display: grid;
        grid-template-columns: 900px;
        grid-template-rows: 100px 40px 450px 100px;
        margin-top: 100px;
    }
    .layer1 {
        margin: 0 10px 0 10px;
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
        cursor: pointer;
    }
    .layer3 {
        display: grid;
        grid-template-rows: 100px 400px;
        align-content: center;
        border-radius: 23px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background: #FFF;
        box-shadow: 0px 4px 4px 0px rgba(93, 93, 93, 0.25);
    }
    .l3ch1 {
        align-self: center;
        margin: 30px 50px 0 50px;
    }
    .goPostList {
        width: 135px;
        height: 35px;
        flex-shrink: 0;
        border-radius: 16px;
        background: #25272F;
        color: white;
        cursor: pointer;
    }
    .l3ch2 {
        display: grid;
        align-self: start;
        margin: 0 50px 0 50px;
        grid-template-rows: repeat(5, 60px);
        align-content: center;
        gap: 10px 0;
    }
    .posts {
        display: grid;
        grid-template-columns: 500px 100px 200px;
        border-radius: 10px;
        background: #F9F9FF;
    }
    a {
        text-decoration-line: none;
        align-self: center;
    }
    .p1 {
        align-self: center;
        margin-left: 20px;
    }
    .p2 {
        justify-self: center;
    }
    .p3 {
        justify-self: center;
    }
    .layer4 {
        display: grid;
        grid-template-columns: 200px 400px 200px;
        align-content: end;
    }
    .l4ch {
        grid-column: 2/3;
        justify-self: stretch;
        align-self: center;
        display: inline-flex;
        align-content: center;
        justify-content: center;
        gap: 0 20px;
        border-radius: 23.451px;
        border: 1.02px solid rgba(0, 0, 0, 0.15);
        background: #FFF;
        box-shadow: 0px 4.078px 4.078px 0px rgba(93, 93, 93, 0.25);

    }
    .pBtn {
        background: none;
        border: none;
        padding: 0;
        margin: 0;
        cursor: pointer;
    }
    img {
        width: 22px;
        height: 22px;
        align-self: center;
    }
</style>