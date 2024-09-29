

<template>
      <div class="wrapper">
        <main>
            <div class="container">  
  
                <!-- Group List -->
                <div class="group-card" v-for="group in pageGroups" :key="group.code">
                    <div class="item">
                        <div class="group-name">
                            {{ group.name }}
                        </div>
                        <button type="button" @click="goGroup(group.code)">
                          <img src="@/assets/icons/go.png" alt="그룹 이동" class="go-icon">
                        </button>
                    </div>
                </div>
            </div>
        </main>
  
        <div class="f">

          <!-- Pagination -->
          <div class="pagination">
            <button type="button" @click="goFirst" class="btn"> << </button>
            <button type="button" @click="goBack" class="btn"> < </button>
            <button type="button" @click="goNext" class="btn"> > </button>
            <button type="button" @click="goLast" class="btn"> >> </button>
          </div>
        </div>
      </div>
  </template>
    
  <script setup>  
    import { ref, onMounted } from 'vue';
    import {useRouter} from 'vue-router';

    const router = useRouter();

    const goGroup = (code) => {
      router.push(`intro?code=${code}`);
    };

    const groups = ref([]);
    const pageGroups = ref([]);
    const index = ref(0);
    const next = ref(10);

    localStorage.setItem("member_code", 66);
    localStorage.setItem("member_id", "HELLONG");
    const memberCode = localStorage.getItem("member_code");


    const memberGroup = (d1, d2) => {
      const gCode = ref([]);
      const gGroup = ref([]);
        for (let i = 0; i < d2.length; i++){
          if (d2[i].member_code === memberCode.value) {
            gCode.value.push(d2[i].acc_group_code);
          }
        }
        for (let j = 0; j<gCode.value.length; j++){
          for (let i = 0;i < d1.length; i++){
            if (gCode.value[j] === d1[i].code) {
              gGroup.value.push(d1[i]);
              break;
            }
          }
        }
        return gGroup.value;
    }
  
    onMounted( async() => {
        const response = await fetch("http://localhost:8080/group");
        const data = await response.json();
        const response2 = await fetch("http://localhost:8080/group-member"); 
        const data2 = await response2.json();

        groups.value = memberGroup(data, data2);  //memberCode로 내그룹 찾기
        pageGroups.value = groups.value.slice(index.value, next.value);
    });
  
    const updatePageGroups = () => {
      pageGroups.value = groups.value.slice(index.value, next.value);
    };
  
    const goBack = () => {
      if (index.value > 0) {
        if(next.value - index.value < 10) {
          next.value -= next.value % 10;
        } else {
          next.value -= 10;
        }
        index.value -= 10;
        updatePageGroups();
      }
    };
  
    const goFirst = () => {
      index.value = 0;
      next.value = 10;
      updatePageGroups();
    };
  
    const goNext = () => {
      if (next.value < groups.value.length) {
        if(next.value+10 > groups.value.length) {
          next.value = groups.value.length;
        } else {
          next.value += 10;
        }
        index.value += 10;
        updatePageGroups();
      }
    };
  
    const goLast = () => {
      next.value = groups.value.length;

      if (groups.value.length % 10 == 0){
        index.value = next.value - 10;
      } else {
        index.value = groups.value.length - (groups.value.length % 10);
      }
      
      console.log(index.value, next.value, groups.value.length);
      updatePageGroups();

    };
  </script>
  
  <style scoped>
    .wrapper {
      margin-top: 100px;
    }
    main {
      display: inline-block;
    }
    .container {
      display: grid;
      grid-template-columns: 450px  450px;
      grid-template-rows: repeat(5, 120px);
    }  
    .group-card {
      display: grid;
      align-self: center;
      justify-self: left;
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
    .f {
      display: grid;
      grid-template-columns: 300px 300px  300px;
      margin-bottom: 50px;
    }
    .pagination {
      grid-column: 2/3;
      margin: 30px 0 20px 0;
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
    button {
      background: none;
      border: none;
      padding: 0;
      margin: 0;
      cursor: pointer;
    }
  </style>
    