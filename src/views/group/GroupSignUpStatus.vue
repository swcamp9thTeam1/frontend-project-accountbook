

<template>
    <div class="wrapper">
      <main>
          <div class="container">  
  
              <!-- Group List -->
              <div class="group-card" v-for="group in pageGroups" :key="group.id">
                  <div class="item">
                      <div class="group-name">
                          {{ group.name }}
                      </div>
                      <button type="button" @click="showModal" class="oBtn">
                        <img src="@/assets/icons/group_cancel.png" alt="그룹 가입 취소" class="cancel-icon" @onclick="pops">
                      </button>
                      <CancelRegistModal :visible="isModalVisible" title="그룹 가입을 취소하시겠습니까?" @confirm="doCancel(group.code)" @cancel="rst">
                        <p align="left" style="font-weight: bold;">그룹명: {{ group.name }}</p>
                        <p align="left">취소하면 되돌릴 수  없어용~</p>
                      </CancelRegistModal>
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

    import CancelRegistModal from "@/components/group/CancelRegistModal.vue";

    const groups = ref([]);
    const pageGroups = ref([]);
    const index = ref(0);
    const next = ref(10);

    const memberCode = localStorage.getItem("member_code");

    const mId = ref([]);

    const memberGroup = (d1, d2) => {
      const gCode = ref([]);
      const gGroup = ref([]);
        for (let i = 0; i < d2.length; i++){
          if (d2[i].member_code === memberCode.value && d2[i].role === "ROLE_UNALLOWED") {
            mId.value.push(d2[i]);
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

    const isModalVisible = ref(false);

    const showModal = () => {
        isModalVisible.value = true;
    };

    const doCancel = (code) => {
        isModalVisible.value = false;

        for (let i=0;i<mId.value.length; i++) {
          if (mId.value[i].acc_group_code === code) {
            upload(mId.value[i].id);
            break;
          }
        }
    }

    const rst = () => {
        isModalVisible.value = false;
    }

  
    onMounted( async() => {
        const response = await fetch("http://localhost:8080/group");
        const data = await response.json();
        const response2 = await fetch("http://localhost:8080/group-member"); 
        const data2 = await response2.json();

        groups.value = memberGroup(data, data2);  //memberCode로 내그룹 찾기
        pageGroups.value = groups.value.slice(index.value, next.value);
    });


    const upload = async(id) => {
      try {
            const result = await fetch(`http://localhost:8080/group-member/${id}`, {
                method: "DELETE",
            });
            window.location.reload();
            if (result.ok) {
                console.log("Post updated successfully");
            } else {
                console.error("Failed to update the post");
            }
        } catch (error) {
            console.error("Error updating delete:", error);
        }
    }
  
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
      updatePageGroups();

    };
  </script>
  
  <style scoped>
    .wrapper {
      margin: 100px 0 0 0;
    }
    main {
      display: inline-block;
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
      align-self: end;
    }
    .pagination {
      grid-column: 2/3;
      margin: 40px 0 0 0;
      padding-top: 20px;
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
    .oBtn {
      background: none;
      border: none;
      padding: 0;
      margin: 0;
      cursor: pointer;
    }
    button {
      cursor: pointer;
    }
  </style>
    