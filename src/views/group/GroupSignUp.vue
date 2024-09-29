<template>
  <div class="page">
      <div class="wrapper">
          <main>
              <!-- Search -->
              <div class="search">
                  <div class="item3">
                      <img class="search-icon" src="@/assets/icons/search_white.png">
                      <input class="search-area" type="search" v-model.lazy="searchText" @keyup.enter="submitSearch" placeholder="가입하고 싶은 그룹명 검색"/>
                  </div>
              </div>

              <div class="container">

                  <!-- Group List -->
                  <div class="group-card" v-for="group in pageGroups" :key="group.code">
                      <div class="item">
                          <div class="group-text">
                              <p class="name">{{ group.name }}</p>
                              <p class="member">{{ group.cnt }}명 참여중</p>
                          </div>
                          <button type="button" @click="showModal(group)" class="rBtn">
                            <img src="@/assets/icons/group_signup.png" alt="그룹 가입 신청" class="signup-icon">
                          </button>
                          <RegistModal :visible="isModalVisible" title="그룹에 가입할까요?" @confirm="doRegist()" @cancel="doCancel">
                              <p>그룹장의 승인 후 최종 가입 처리됩니다.</p>
                              <p align="left" style="font-weight: bold;">그룹명: {{ groupInfo.name }}</p>
                          </RegistModal>
                      </div>
                  </div>
              </div>

              
          </main>

          <div class="p">
              <!-- Pagination -->
              <div class="pagination">
                  <button @click="goFirst" class="btn"> << </button>
                  <button @click="goBack" class="btn"> < </button>
                  <button @click="goNext" class="btn"> > </button>
                  <button @click="goLast" class="btn"> >> </button>
              </div>
          </div>
      </div>
      <div class="lstBtn">
          <div class="f">

              <!-- 그룹 생성 버튼 -->
              <div class="item2">
                  <p class="signup-text1">그룹장이 되어 그룹원을 모아보세요</p>
                  <p class="signup-text2">그룹 생성하기</p>
                  <button type="button" @click="goCreate" class="cBtn">
                    <img src="@/assets/icons/go.png" alt="그룹 생성" class="group-create">
                  </button>
              </div>
          </div>
        </div>
    </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';

  import RegistModal from "@/components/group/RegistGroupModal.vue";

  const memberCode = localStorage.getItem("member_code");

  const groups = ref([]);
  const members = ref([]);
  const pageGroups = ref([]);
  const index = ref(0);
  const next = ref(5);

  const searchText = ref('');

  const groupInfo = ref({});

  onMounted( async () => {
    const request = await fetch("http://localhost:8080/group");
    const data = await request.json();

    const req = await fetch("http://localhost:8080/group-member");
    const data2 = await req.json();

    members.value = data2;
    groups.value = data;

    getMember();
    pageGroups.value = groups.value.slice(index.value, next.value);
  });

  const getMember = () => {
    for (let i = 0; i<groups.value.length; i++) {
      var cnt = 0;
      for (let j=0; j<members.value.length; j++) {
        if (members.value[j].acc_group_code === groups.value[i].code) {
          cnt += 1;
        }
      }
      groups.value[i].cnt = cnt;
    }
  }

  const submitSearch = () => {
    const result = ref([]);
    for (let i=0; i< groups.value.length; i++) {
      if (groups.value[i].name.toLowerCase().includes(searchText.value.toLowerCase())) {
        result.value.push(groups.value[i]);
      }
    }
    groups.value = result.value;
    updatePageGroups();
  }

  const isModalVisible = ref(false);

    const showModal = (info) => {
        isModalVisible.value = true;
        groupInfo.value = info;
    };

    const doCancel = () => {
        isModalVisible.value = false;
    }

    const tmp = ref({});
    const doRegist = () => {
      tmp.value = {
        member_code: memberCode.value,
        acc_group_code: groupInfo.value.code,
        role: "ROLE_UNALLOWED"
      };
        isModalVisible.value = false;
        upload();
    }

    const upload =  async() => {
      
      try {
            const update = await fetch("http://localhost:8080/group-member", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tmp.value),
            });
            window.location.reload();
        } catch (error) {
            console.error("Error updating post:", error);
        }
    }

  const updatePageGroups = () => {
    pageGroups.value = groups.value.slice(index.value, next.value);
  };

  const goBack = () => {
    if (index.value > 0) {
      if(next.value-index.value < 5) {
        next.value -= (groups.value.length%5)
      } else {
        next.value -= 5;
      }
      index.value -= 5;
      updatePageGroups();
    }
  };

  const goFirst = () => {
    index.value = 0;
    next.value = 5;
    updatePageGroups();
  };

  const goNext = () => {
    if (next.value < groups.value.length) {
      if (next.value+5 > groups.value.length) {
        next.value = groups.value.length;
      } else {
        next.value += 5;
      }
      index.value += 5;
      updatePageGroups();
    }
  };

  const goLast = () => {
    if (groups.value.length % 5 === 0){
      next.value = groups.value.length;
      index.value = next.value-5;
    } else {
      next.value = groups.value.length;
      index.value = next.value - (groups.value.length%5);
    }
    updatePageGroups();
  };

  const goCreate = () => {
    router.push('create');
  }
</script>

<style scoped>
  page {
    display: inline-flex;
    flex-direction: row;
    align-content: space-between;
  }
  .wrapper {
      margin-top: 50px;
  }
  main {
    display: grid;
    grid-template-columns: 900px;
  }
  .search {
        display: grid;
        border-radius: 16px;
        border: 1px solid #B0B7C3;
        background: var(--Grays-White, #FFF);
        grid-template-columns: 900px;
        grid-template-rows: 60px;
        gap: 0 20px;
        align-content: center;
        align-self: center;
        margin-bottom: 20px;
        margin-top: 30px;
    }
    .item3 {
        display: grid;
        grid-template-columns: 100px 800px;
    }
    .search-icon {
        align-self: center;
        justify-self: center;
    }
    .search-area {
        width: 700px;
        align-self: center;
        font-family: Inter;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        border: none;
        outline: none;
    }
    ::placeholder {
        color: rgba(0, 0, 0, 0.37);
    }
  .container {
    display: grid;
    grid-template-columns: 900px;
    grid-template-rows: repeat(5, 90px);
    gap: 10px 0;
  }  
  .group-card {
    display: grid;
    align-self: center;
    height: 90px;
    border-radius: 15px;
    background: #F9F9FF;
    box-shadow: 0px 0px 7px 1px #DFDFF5;
  }
  .item {
    display: grid;
    grid-template-columns: 80% 20%;
    gap: 5px 10px;
    margin-left: 10px;
    margin-right: 10px;
    color: #000;
    font-family: Inter;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .group-text {
    text-align: left;
    align-self: center;
    margin-left: 80px;
  }
  .name {
    color: #000;
    font-family: "Noto Sans KR";
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 5px 0 10px 0;
  }
  .member {
    color: #858585;
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 10px 0 5px 0;
  }
  .signup-icon {
    align-self: center;
    justify-self: left;
    width: 90px;
    height: 35px;
  }
  .rBtn, .cBtn {
        background: none;
        border: none;
        padding: 0;
        margin: 0;
        cursor: pointer;
    }
  .p {
    display: grid;
    margin: 20px 0 20px 0;
    grid-template-columns: 300px 300px  300px;
  }
  .pagination {
    grid-column: 2/3;
    margin-top: 10px;
    text-align: center;
  }
  .pagination .btn {
    padding: 10px 15px;
    margin: 0 5px;
    cursor: pointer;
    background-color: #25272F;
    color: white;
    border: none;
    border-radius: 5px;
  }
  .pagination .btn:hover {
    background-color: #444;
  }
  .lstBtn {
    display: flex;
    align-content: end;
  }
  .f {
    display: grid;
    grid-template-columns: 900px;
    grid-template-rows: 80px;
    justify-content: stretch;
    margin-top: 20px;
  }  
  .item2 {
    display: grid;
    justify-self: stretch;
    grid-template-columns: 600px 200px 100px;
    align-content: center;
    align-self: flex-end;
    justify-content: center;
    /* width: 850px; */
    height: 60px;
    border-radius: 23px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    background: #F9F9FF;
    box-shadow: 0px 4px 4px 0px rgba(93, 93, 93, 0.25);
  }
  .signup-text1 {
    margin-left: 80px;
    color: #000;
    text-align: center;
    font-family: Inter;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .signup-text2 {
    align-self: center;
    justify-self: right;
    color: #000;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .group-create {
    margin-right: 30px;
    align-self: center;
    justify-self: center;
    width: 33px;
    height: 33px;
  }
</style>