

<template>
    <div class="wrapper">
      <main>
          <div class="container">  
  
              <!-- 가입 양식 -->
                <p class="text1">그룹 명</p>
                <input v-model="name" class="name" placeholder="식비 절약하기">
                <p class="text2">한줄 소개</p>
                <input v-model="texts" class="intro" placeholder="식비 절양하는 방법 공유해요!">
          </div>
      </main>
      <div class="sub">
        <button type="button" @click="create" class="create-btn">생성</button>
        <GroupCreateModal :visible="isModalVisible">
              <p>그룹이 생성 되었습니다!</p>
        </GroupCreateModal>
      </div>
    </div>
  </template>
    
  <script setup>
    import { ref, reactive, onMounted } from 'vue';
    import {useRouter} from 'vue-router';

    import GroupCreateModal from "@/components/group/CreateGroupModal.vue";

    const router = useRouter();

    const memberCode = localStorage.getItem('member_code');

    const name = ref('');
    const texts = ref('');

    const group = ref({});
    const index = ref(0);
    const member = ref({});

    onMounted(async() => {
      const req = await fetch("http://localhost:8080/group");
      const req2 = await fetch("http://localhost:8080/group-member");

      const data = await req.json();
      const data2 = await req2.json();

      const tmp = data;
      index.value = tmp[tmp.length-1].code+1;
    });

    const create = () => {
      group.value = {
        code: index.value,
        name: name.value,
        intro: texts.value
      };

      member.value = {
        member_code: memberCode.value,
        acc_group_code: index.value,
        role: "ROLL_LEADER"
      };

      upload();
      
      showModal();

      setTimeout(() => {
        isModalVisible.value = false;
        router.push(`intro?code=${index.value}`);
      }, 3000);
      
    }

    const upload = async() => {
      try {
            const update1 = await fetch("http://localhost:8080/group", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(group.value),
            });
            const update2 = await fetch("http://localhost:8080/group-member", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(member.value),
            });
            
        } catch (error) {
            console.error("Error updating post:", error);
        }
    }

    const isModalVisible = ref(false);

    const showModal = () => {
        isModalVisible.value = true;
    };
  
    
  </script>
  
  <style scoped>
    .wrapper {
        display: grid;
        grid-template-rows: 600px 100px;
      margin: 100px 0 0 0;
    }
    main {
      display: inline-block;
    }
    .container {
      display: grid;
      grid-template-columns: 200px  700px;
      grid-template-rows: repeat(2, 100px);
    }  
    .text1 {
        color: var(--, #101424);
        font-family: "Noto Sans KR";
        font-size: 22px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        align-self: center;
    }
    .text2 {
        color: var(--, #101424);
        font-family: "Noto Sans KR";
        font-size: 22px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        align-self: center;
    }
    .name {
        width: 580px;
        align-self: center;
        font-family: Inter;
        font-size: 22px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        border: none;
        outline: none;
        border-bottom: 1px solid #B1B1D2;

    }
    .intro {
        width: 580px;
        align-self: center;
        font-family: Inter;
        font-size: 22px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        border: none;
        outline: none;
        border-bottom: 1px solid #B1B1D2;
    }
    ::placeholder {
        color: rgba(0, 0, 0, 0.37);
    }
    .sub {
        display: grid;
        grid-template-columns: 780px;
    }
    .create-btn {
        justify-self: right;
        width: 80px;
        height: 50px;
        border-radius: 13px;
        background-color: #101424;
        color: var(--Grays-White, #FFF);
        font-family: "Noto Sans KR";
        font-size: 22px;
        font-style: normal;
        font-weight: 350;
        line-height: normal;
        align-self: right;
    }
</style>
    