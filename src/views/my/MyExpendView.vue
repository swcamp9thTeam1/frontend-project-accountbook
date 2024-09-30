<template>
  <RouterLink to="/my/expend/add" style="text-decoration: none;">
  <button class="regist-post-btn" style="width: 140px; height: 48px; background-color: #F3F3FF; border: none; border-radius: 26px; display: flex; align-items: center; justify-content: space-between; font-size: 12px; padding: 17px; margin-left: 843px;margin-bottom: 20px; cursor:pointer;">

      <img src="/src/assets/icons/Community/PlusIcon.svg" alt="">
      <span class="font-300">정기지출 추가</span>

  </button>
  </RouterLink>

  <div style="display: flex; flex-direction: column; margin-left: -110px; margin-top: 7px; gap:10px;">
    
      <div v-for="expense in currentPagePosts" :key="expense.id">
        <div style="display: flex; flex-direction: column; gap: 10px;width: 100%;">
          <div style="width: 90%; height: auto;">
        <div class="post-list" style="width: 100%; height: 68px; background-color: #F9F9FF; border-radius: 11px; box-shadow:0 0 5px rgba(198, 198, 235, 0.5); display: flex; align-items: center; padding: 15px 41px; justify-content: space-between;">
          <div class="expense-left">
            <div class="expense-title">
              {{ expense.title }}
              <span class="expense-category">{{ expense.categoryName }}</span>
              </div>
              <div class="expense-info">
                매월 {{ expense.day }}일 지출
              </div>
            </div>
            <div class="expense-right">
              <div class="expense-asset">
                {{ expense.assetName }}
              </div>
            <div class="expense-fee">
              {{ expense.fee.toLocaleString() }}원
            </div>
            <div class="expense-buttons">
              <RouterLink :to="'/my/expend/' + expense.id">
                <button class="edit-button">수정</button>
              </RouterLink>
              <button class="delete-button" @click="deleteExpense(expense.id)">삭제</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>

  <!-- 페이지네이션 -->
  <div class="pagination" style="display: flex; justify-content: center; align-items: center; margin-top: 60px;">
                <span class="page-btn font-300" @click="changePage(currentPage - 1)" v-show="currentPage > 1">
                    &lt;
                </span>

                <span class="page-btn font-300" v-show="currentPage > 1" @click="changePage(currentPage - 1)">
                    {{ currentPage - 1 }}
                </span>

                <span class="currentPageBtn font-300" @click="currentPagePosts">
                    {{ currentPage }}
                </span>

                <span class="page-btn font-300" v-show="currentPage < totalPages" @click="changePage(currentPage + 1)">
                    {{ currentPage + 1 }}
                </span>

                <span class="page-btn font-300" @click="changePage(currentPage + 1)" v-show="currentPage < totalPages">
                    &gt;
                </span>
            </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { RouterLink } from 'vue-router';

const expenses = ref([]); // 모든 정기지출 데이터를 저장
const filteredExpenses = ref([]); // 필터링된 정기지출 데이터를 저장

const showDeleteBanner = ref(false); // 삭제 배너를 보여줄지 결정
const selectedExpenseId = ref(null); // 선택한 지출 ID 저장


// 로컬 스토리지에서 닉네임 가져오기
const userNickname = localStorage.getItem('nickname');


onMounted(async () => {
try {
  const response = await fetch('http://localhost:8080/regular-expense');
  const data = await response.json();

  // 현재 로그인된 유저의 닉네임과 일치하는 정기지출 데이터 필터링
  filteredExpenses.value = data.filter(expense => expense.nickname === userNickname);
} catch (error) {
  console.error('Error fetching expenses:', error);
}
});


/* 페이지네이션 */
const postsPerPage = 7; // 한 페이지당 게시글 개수
const currentPage = ref(1); // currentPage 초기값 1로 설정 

const totalPostNum = computed(() => filteredExpenses.value.length); // 게시글 전체 개수 

// 총 게시글의 페이지 수를 계산하는 메소드 
const totalPages = computed(() => {
    return Math.ceil(totalPostNum.value / postsPerPage);
});

// 현재 페이지의 게시글 목록을 보여주는 메소드 
const currentPagePosts = computed(() => {
    const start = (currentPage.value - 1) * postsPerPage;
    const end = start + postsPerPage;
    return filteredExpenses.value.slice(start, end);
});

// 페이지를 바꿔주는 메소드 
const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages.value) {
        currentPage.value = newPage;
    }
};

// 정기지출 삭제 함수
const deleteExpense = async (expenseId) => {
  try {
    const response = await fetch(`http://localhost:8080/regular-expense/${expenseId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('삭제가 완료되었습니다!');
      // 삭제 후 목록 갱신
      filteredExpenses.value = filteredExpenses.value.filter(expense => expense.id !== expenseId);
    } else {
      alert('정기지출 삭제에 실패했습니다.');
    }
  } catch (error) {
    console.error('정기지출 삭제 중 오류 발생:', error);
    alert('정기지출 삭제 중 오류가 발생했습니다.');
  }
};

</script>


<style scoped>
.regist-post-btn {
    margin-left: 20px;
}

.expense-left {
display: flex;
flex-direction: column;
}

.expense-title {
font-size: 20px;
font-weight: bold;
color: #101424;
display: flex;
align-items: center;
}

.expense-category {
background-color: #2c2c2c;
color: white;
border-radius: 20px;
padding: 3px 8px;
margin-left: 10px;
font-size: 12px;
}

.expend-button {
  margin-left: 20px;
}

span {
    text-wrap: nowrap;
}

.expense-info {
color: #8C8C8C;
font-size: 14px;
margin-top: 5px;
}

.expense-right {
display: flex;
flex-direction: column;
align-items: flex-end;
}

.expense-asset {
font-size: 16px;
font-weight: bold;
color: #101424;
}

.expense-fee {
font-size: 14px;
color: #8C8C8C;
margin-top: 5px;
}

.expense-buttons {
display: flex;
margin-top: 10px;
}

.edit-button,
.delete-button {
width: 50px;
height: 30px;
border-radius: 15px;
font-size: 13px;
margin-left: 5px;
cursor: pointer;
}

.edit-button {
background-color: #101424;
color: white;
border: none;
}

.delete-button {
background-color: #EAEAEA;
color: #8181B0;
border: none;
}

.page-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 27px;
    height: 27px;
    border: none;
    border-radius: 3px;
    background-color: white;
    color: #B1B1D2;
    margin-right: 15px; 
    font-weight: bold;
    font-size: 15px;
}
.currentPageBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 27px;
    height: 27px;
    border: none;
    border-radius: 3px;
    margin-right: 15px; 
    font-weight: bold;
    font-size: 15px;
    background-color: #B1B1D2;
    color: white;
}

</style>
