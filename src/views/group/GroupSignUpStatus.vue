

<template>
    <div class="wrapper">
      <main>
          <div class="container">  
  
              <!-- Group List -->
              <div class="group-card" v-for="group in state.pageGroups" :key="group.id">
                  <div class="item">
                      <div class="group-name">
                          {{ group.name }}
                      </div>
                      <img src="@/assets/icons/group_cancel.png" alt="그룹 가입 취소" class="cancel-icon" @onclick="pops">
                  </div>
              </div>
          </div>
      </main>
  
      <div class="f">
        <!-- Pagination -->
        <div class="pagination">
          <button @click="goFirst" class="btn"> << </button>
          <button @click="goBack" class="btn"> < </button>
          <button @click="goNext" class="btn"> > </button>
          <button @click="goLast" class="btn"> >> </button>
        </div>
      </div>
    </div>
  </template>
    
  <script setup>
    import { ref, reactive, onMounted } from 'vue';
  
    const state = reactive({
      groups: [
      { name: '그룹 A', id: 1 },
              { name: '그룹 B', id: 2 },
              { name: '그룹 C', id: 3 },
              { name: '그룹 D', id: 4 },
              { name: '그룹 E', id: 5 },
              { name: '그룹 F', id: 6 },
              { name: '그룹 G', id: 7 },
              { name: '그룹 H', id: 8 },
              { name: '그룹 I', id: 9 },
              { name: '그룹 J', id: 10 },
              { name: '그룹 K', id: 11 },
              { name: '그룹 L', id: 12 },
              { name: '그룹 M', id: 13 },
              { name: '그룹 N', id: 14 },
              { name: '그룹 O', id: 15 }
      ],
      pageGroups: [],
      index: 0,
      next: 10
    });
  
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
        state.index -= 10;
        state.next -= 10;
        updatePageGroups();
      }
    };
  
    const goFirst = () => {
      state.index = 0;
      state.next = 10;
      updatePageGroups();
    };
  
    const goNext = () => {
      if (state.next < state.groups.length) {
        state.index += 10;
        state.next += 10;
        updatePageGroups();
      }
    };
  
    const goLast = () => {
      const lastIndex = state.groups.length - (state.groups.length % 10);
      state.index = lastIndex;
      state.next = state.groups.length;
      updatePageGroups();
    };

    const open = ref(false);
    const pops = function() {
        open.value = !open.value;
    };
  
    onMounted(updatePageGroups);
  </script>
  
  <style scoped>
    .wrapper {
      margin: 100px 0 0 0;
    }
    main {
      display: inline-block;
    }
    .title {
      width: 199px;
      height: 43px;
      background-color: #25272F;
      padding: 10px;
      border-radius: 0 21.5px 21.5px 0;
    }
    h4 {
      text-align: center;
      padding: 0;
      margin: 0;
      color: white;
      font-size: 28px;
      font-style: normal;
      font-weight: 350;
      line-height: normal;
    }
    .container {
      display: grid;
      grid-template-columns: 450px  450px;
      grid-template-rows: repeat(5, 100px);
    }  
    .group-card {
      display: grid;
      align-self: center;
      justify-self: center;
      width: 419px;
      height: 72px;
      margin: 20px;
      border-radius: 23px;
      background: var(--Grays-White, #FFF);
      box-shadow: 0px 4px 4px 0px rgba(93, 93, 93, 0.25);
    }
    .item {
      display: grid;
      align-self: center;
      justify-self: stretch;
      grid-template-columns: 80% 20%;
      gap: 5px 10px;
      margin-left: 10px;
      margin-right: 10px;
      color: #000;
      font-family: Inter;
      font-size: 24px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    .group-name {
      text-align: center;
    }
    .cancel-icon {
      align-self: center;
      justify-self: center;
      width: 20px;
      height: 20px;
    }
    .f {
      display: grid;
      grid-template-columns: 300px 300px  300px;
    }
    .pagination {
      grid-column: 2/3;
      margin: 20px;
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
  </style>
    