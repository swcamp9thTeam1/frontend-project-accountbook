<template>
    <div class="container">
        <div class="wrap">
            <div v-for="member in pageMembers" :key="member.id" class="rows">
                <div class="items">
                    <p>{{ member.id }}</p>
                    <p>{{ group.name }}</p>
                    <button type="button" @click="ok(member)" class="b1">승인</button>
                    <button type="button" @click="no(member)" class="b2">거절</button>
                    <AlertModal :visible="isModalVisible">
                        <p>{{ txt }}</p>
                    </AlertModal>
                </div>
            </div>
        </div>
        <div class="btns">
            <button type="button" @click="goFirst" class="btn"> << </button>
            <button type="button" @click="goBack" class="btn"> < </button>
            <button type="button" @click="goNext" class="btn"> > </button>
            <button type="button" @click="goLast" class="btn"> >> </button>
        </div>
    </div>
</template>

<script setup>
    import {ref, onMounted} from 'vue';
    import {useRoute} from 'vue-router';

    import AlertModal from "@/components/group/SignUpManageModal.vue";

    const route = useRoute();

    // const memberCode = localStorage.getItem("member_code");
    // const groupCode = route.query.code;

    

    const pageMembers = ref([]);
    const members = ref([]);
    const index = ref(0);
    const next = ref(5);

    // 그룹 코드
    const group = ref({});

    onMounted( async () => {
        const request = await fetch("http://localhost:8080/group");
        const data = await request.json();

        const req = await fetch("http://localhost:8080/group-member");
        const data2 = await req.json();

        const memberCode = ref(1);
        const groupCode = ref(3);

        group.value = data.find( m => m.code == groupCode.value );

        members.value = data2.filter( m => (m.acc_group_code === groupCode.value && m.role === "ROLE_UNALLOWED") );

        pageMembers.value = members.value.slice(index.value, next.value);
    });

    const txt = ref('');

    const ok = (member) => {
        isModalVisible.value = true;

        setTimeout(() => {
            isModalVisible.value = false;
            window.location.reload();            
        }, 3000);
        txt.value = `[${member.id}]님의 그룹 가입이 승인되었습니다!`

        accept(member);
    }

    const no = (member) => {
        isModalVisible.value = true;

        setTimeout(() => {
            isModalVisible.value = false;
            window.location.reload();
        }, 3000);

        txt.value = `[${member.id}]님의 그룹 가입이 거절되었습니다!`
        reject(member);
    }

    const isModalVisible = ref(false);

    const accept =  async(member) => {
        member.role = "ROLE_FOLLOWER";
    
        try {
            const update = await fetch(`http://localhost:8080/group-member/${member.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(member),
            });
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    const reject =  async(member) => {
    
        try {
            const update = await fetch(`http://localhost:8080/group-member/${member.id}`, {
                method: "DELETE"
            });
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };


    const updatePageMembers = () => {
        pageMembers.value = members.value.slice(index.value, next.value);
    };

    const goBack = () => {
        if (index.value > 0) {
        if(next.value-index.value < 5) {
            next.value -= (members.value.length%5)
        } else {
            next.value -= 5;
        }
        index.value -= 5;
        updatePageMembers();
        }
    };

    const goFirst = () => {
        index.value = 0;
        next.value = 5;
        updatePageMembers();
    };

    const goNext = () => {
        if (next.value < members.value.length) {
        if (next.value+5 > members.value.length) {
            next.value = members.value.length;
        } else {
            next.value += 5;
        }
        index.value += 5;
        updatePageMembers();
        }
    };

    const goLast = () => {
        if (groups.value.length % 5 === 0){
        next.value = members.value.length;
        index.value = next.value-5;
        } else {
        next.value = members.value.length;
        index.value = next.value - (members.value.length%5);
        }
        updatePageMembers();
    };

</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        width: 800px;
        height: 600px;
        justify-items: center;
        align-items: center;
        margin-top: 100px;
    }
    .wrap {
        flex: 6;
        display: grid;
        grid-template-rows: repeat(5, 1fr);
        flex-direction: column;
        align-items: center;
        justify-items: center;
        
    }
    .items {
        display: grid;
        height: 40px;
        grid-template-columns: 2fr 5fr 1fr 1fr;
        padding: 20px;
        margin: 0;
        gap: 0 20px;
        align-items: center;
        border-radius: 23.451px;
        border: 1.02px solid rgba(0, 0, 0, 0.15);
        background: #F9F9FF;
        box-shadow: 0px 4.078px 4.078px 0px rgba(93, 93, 93, 0.25);
    }
    p {
        margin: 0;
        font-weight: bold;
        text-align: center;
    }
    .btns {
        flex: 1;
        display: flex;
        justify-items: center;
        align-items: flex-end;
    }
    .b1 {
        width: 60px;
        height: 32px;
        background-color: #25272F;
        color: white;
        border-radius: 16px;
    }
    .b2 {
        width: 60px;
        height: 32px;
        background-color: #B1B1D2;
        color: white;
        border-radius: 16px;
    }
    .btns button {
        padding: 10px 15px;
        margin: 0 5px;
        cursor: pointer;
        background-color: #B1B1D2;
        color: white;
        border: none;
        border-radius: 5px;
    }
    button {
        background: none;
        border: none;
        padding: 0;
        margin: 0;
        cursor: pointer;
    }

</style>