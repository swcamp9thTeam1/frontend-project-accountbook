<template>
  <div class="page">
      <div class="wrapper">
          <main>
              <!-- Search -->
              <div class="search">
                  <div class="item3">
                      <img class="search-icon" src="@/assets/icons/search_white.png">
                      <input class="search-area" type="search" v-model="searchText" @keyup.enter="submitSearch" placeholder="가입하고 싶은 그룹명 검색">
                  </div>
              </div>

              <div class="container">

                  <!-- Group List -->
                  <div class="group-card" v-for="group in state.pageGroups" :key="group.id">
                      <div class="item">
                          <div class="group-text">
                              <p class="name">{{ group.name }}</p>
                              <p class="member">{{ group.member }}명 참여중</p>
                          </div>
                          <img src="@/assets/icons/group_signup.png" alt="그룹 가입 신청" class="signup-icon">
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
                  <img src="@/assets/icons/go.png" alt="그룹 생성" class="group-create">
              </div>
          </div>
        </div>
    </div>
</template>

<script setup>
  import { ref, reactive, onMounted } from 'vue';

  const state = reactive({
    groups: [
    { name: '그룹 A', id: 1, member: 10 },
            { name: '그룹 B', id: 2, member: 10},
            { name: '그룹 C', id: 3, member: 10 },
            { name: '그룹 D', id: 4, member: 10 },
            { name: '그룹 E', id: 5, member: 10 },
            { name: '그룹 F', id: 6, member: 10 },
            { name: '그룹 G', id: 7, member: 10 },
            { name: '그룹 H', id: 8, member: 10 },
            { name: '그룹 I', id: 9, member: 10 },
            { name: '그룹 J', id: 10, member: 10 },
            { name: '그룹 K', id: 11, member: 10 },
            { name: '그룹 L', id: 12, member: 10 },
            { name: '그룹 M', id: 13, member: 10 },
            { name: '그룹 N', id: 14, member: 10 },
            { name: '그룹 O', id: 15, member: 10 }
    ],
    pageGroups: [],
    index: 0,
    next: 5
  });

  const searchText = ref('');

    const submitSearch = function (){
        /* 입력받은 검색어로 그룹명 조회 */
    }

  // const fetchData = async() => {
  //     const response = await fetch('');
  //     const data = await response.json();
  //     state.groups = data;
  //     state.pageGroups = data.slice(state.index, state.next);
  // };

  const updatePageGroups = () => {
    state.pageGroups = state.groups.slice(state.index, state.next);
  };

  const goBack = () => {
    if (state.index > 0) {
      state.index -= 5;
      state.next -= 5;
      updatePageGroups();
    }
  };

  const goFirst = () => {
    state.index = 0;
    state.next = 5;
    updatePageGroups();
  };

  const goNext = () => {
    if (state.next < state.groups.length) {
      state.index += 5;
      state.next += 5;
      updatePageGroups();
    }
  };

  const goLast = () => {
    const lastIndex = state.groups.length - (state.groups.length % 5);
    state.index = lastIndex;
    state.next = state.groups.length;
    updatePageGroups();
  };

  onMounted(updatePageGroups);
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
  .p {
    display: grid;
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