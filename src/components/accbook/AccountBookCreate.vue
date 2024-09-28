<template>
  <div class="add-accbook">
      <input type="text" class="accbook-title" name="title" placeholder="제목을 입력해주세요."
        minlength="4" maxlength="20" required
        v-model="inputData.title">
        <input type="number" class="accbook-amount" name="amount" placeholder="금액을 입력해주세요."
        minlength="1" maxlength="19" required
        v-model="inputData.amount">

        <img src="../../assets/icons/가계부_작성란_line.svg" class="line">

        <div class="finance-type">
            <div class="classification">분류</div>
            <div class="finance-type-buttons">
              <button
                  class="in"
                  :class="{ active: InOutTranferType === 'I' }"
                  @click="selectType('I')"
              >
                수입
              </button>
              <button
                  class="out"
                  :class="{ active: InOutTranferType === 'O' }"
                  @click="selectType('O')"
              >
                지출
              </button>
              <button
                  class="transfer"
                  :class="{ active: InOutTranferType === 'T' }"
                  @click="selectType('T')"
              >
                이체
              </button>
            </div>
        </div>

        <div class="select-category">
            <div class="classification">카테고리</div>
            <div class="category-container">
                <select class="acc-category" id="acc-category" required v-model="parentCategory">
                    <option value="">상위 카테고리</option>
                    <option value="근로수입">근로수입</option>
                </select>
                <select class="sub-category" id="sub-category" required v-model="subCategory">
                    <option value="">하위 카테고리</option>
                    <option value="급여">급여</option>
                </select>
            </div>
        </div>

        <div class="occur-date">
            <div class="classification">일시</div>
            <div class="datetime-container">
                <input type="text" class="year" name="year" placeholder="2024" pattern="\d*" maxlength="4" required
                       v-model="year">
                <div class="datetime-class">년</div>
                <input type="text" class="month" name="month" placeholder="01" pattern="\d*" maxlength="2" required
                       v-model="month">
                <div class="datetime-class">월</div>
                <input type="text" class="day" name="day" placeholder="01" pattern="\d*" maxlength="2" required
                       v-model="day">
                <div class="datetime-class">일</div>
                <input type="text" class="time" name="time" placeholder="00:00" minlength="5" maxlength="5" required
                       v-model="time">
            </div>
        </div>

        <div class="select-asset">
            <div class="classification">변동자산</div>
            <div class="asset-container">
                <select class="asset-category" id="asset-category" required v-model="parentAsset">
                    <option value="">카테고리</option>
                    <option value="신용카드">신용카드</option>
                </select>
                <select class="asset-name" id="asset-name" required v-model="subAsset">
                    <option value="">자산을 선택해주세요.</option>
                    <option value="삼성카드">삼성카드 1234</option>
                </select>
            </div>
        </div>

        <div class="regular-or-not">
            <div class="classification">고정지출 여부</div>
            <div class="regular-buttons">
              <button
                  class="regular"
                  :class="{ active: regularType === 'Y' }"
                  @click="selectRegularType('Y')"
              >
                Y
              </button>
              <button
                  class="irregular"
                  :class="{ active: regularType === 'N' }"
                  @click="selectRegularType('N')"
              >
                N
              </button>
            </div>
        </div>

        <div class="store-info">
            <div class="classification">가게 정보</div>
          <div class="input-container">
            <input type="text" class="find-store" name="store-name" placeholder="방문한 가게명을 입력해주세요.">
            <div class="find-icon">
              <img src="../../assets/icons/가계부_가게입력_돋보기_이미지.svg">
            </div>
          </div>
        </div>

        <button class="add-button" @click="submitInputData">
          등록하기
        </button>
    </div>
</template>

<script setup>

import {ref} from "vue";
import router from "@/router/router.js";

const InOutTranferType = ref('I'); // 선택된 버튼 상태 관리 (기본값: 수입)
const regularType = ref('N'); // 고정지출 버튼 상태 관리 (기본값: N)

/* input data */
const parentCategory = ref('');
const subCategory = ref('');

const year = ref('');
const month = ref('');
const day = ref('');
const time = ref('');

const parentAsset = ref('');
const subAsset = ref('');

const storeCode = ref('')

const selectType = (type) => {
  InOutTranferType.value = type; // 클릭된 버튼의 타입으로 상태 변경
};

const selectRegularType = (type) => {
  regularType.value = type;
};

const inputData = ref({
  accbookCode: '',
  createdAt: '',
  amount: '',
  isRegular: '',
  title: '',
  memberCode: '',
  accCategoryName: '',
  storeCode: '',
  assetName: '',
  financeType: '',
  inAssetCode: '',
  accCommentDTOList: []
})

const formatDate = () => {
  // 현재 날짜를 기준으로 초기값 설정
  let basicYear = year.value || new Date().getFullYear();
  let basicMonth = month.value || new Date().getMonth() + 1;
  let basicDay = day.value || new Date().getDate();
  let basicTime = time.value || '00:00';

  return `${String(basicYear)}-${String(basicMonth).padStart(2, '0')}-${String(basicDay).padStart(2, '0')}T${basicTime}:00`;
}

const formatCategory = () => {
  return `${String(parentCategory.value)}>${String(subCategory.value)}`
}

const saveInputData = () => {
  inputData.value.createdAt = formatDate()
  inputData.value.financeType = InOutTranferType.value
  inputData.value.isRegular = regularType.value
  inputData.value.accCategoryName = formatCategory()
  inputData.value.assetName = subAsset.value

  inputData.value.accbookCode = 1 // 임시로 1번 가계부로 지정
  inputData.value.memberCode = 1 // 임시로 1번 회원으로 지정

  console.log(inputData)
}

const submitInputData = async () => {
  // 데이터를 inputData 객체에 저장
  saveInputData()

  // json server에 POST 요청
  try {
    const response = await fetch('http://localhost:8080/monthly', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputData.value)
    });

    if (response.ok) {
      // 서버에서 반환된 데이터에서 id 추출
      const responseData = await response.json()
      const id = responseData.id;
      console.log('가계부 등록 성공:', id);

      // 해당 가계부의 상세보기 페이지로 리다이렉트
      router.push(`/account-book/detail/${id}`);

    } else {
      console.error('가계부 등록 실패:', response.statusText);
    }
  } catch (error) {
    console.log('가계부 등록 중 에러 발생:', error)
  }
}

</script>

<style scoped>
    /* 가계부 작성 부분 틀 */
    .add-accbook {
        position: relative;
        box-shadow: 0px 0px 7px 1px #DFDFF5;
        border-radius: 30px;
        display: flex;
        flex-direction: column;
        margin: 20px;
        padding-right: 20px;
    }

    /* 가계부 제목 입력 부분 */
    .accbook-title {
        position: relative;
        margin-left: 40px;
        margin-top: 30px;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #969696;

        border-width: 0;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* 가계부 금액 입력 부분 */
    .accbook-amount {
        position: relative;
        margin-left: 40px;
        margin-top: 20px;
        margin-bottom: 10px;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 24px;
        color: #969696;

        border-width: 0;
    }

    .line {
        position: relative;
        //left: 6.6%;
        //right: 5.94%;
        top: 0%;
        bottom: 80%;
        padding-left: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    /* 분류(수입/지출/이체) 선택 부분 */
    .finance-type {
        margin-left: 40px;
        //margin-top: 112px;
        align-items: center;

        display: flex;
        flex-direction: row;
        margin-top: 20px;
    }

    .classification {
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 21px;
        color: #000000;

        text-wrap: nowrap;
    }

    .finance-type-buttons {
        position: relative;
        margin-left: 130px;

        display: flex;
        flex-direction: row;
    }


    .in {
      width: 61px;
      height: 32px;
      margin-right: 12px;

      background: #F9F9FF;
      border-radius: 16px;
      border: 0;

      font-family: 'Noto Sans KR';
      font-style: normal;
      font-weight: 350;
      font-size: 17px;
      line-height: 25px;
      color: #000000;

      cursor: pointer;
    }

    .in.active {
      background: #848BA4;
      color: white;
    }

    .out {
      width: 61px;
      height: 32px;
      margin-right: 12px;

      background: #F9F9FF;
      border-radius: 16px;
      border: 0;

      font-family: 'Noto Sans KR';
      font-style: normal;
      font-weight: 350;
      font-size: 17px;
      line-height: 25px;
      color: #000000;

      cursor: pointer;
    }

    .out.active {
      background: #848BA4;
      color: white;
    }

    .transfer {
      width: 61px;
      height: 32px;

      background: #F9F9FF;
      border-radius: 16px;
      border: 0;

      font-family: 'Noto Sans KR';
      font-style: normal;
      font-weight: 350;
      font-size: 17px;
      line-height: 25px;
      color: #000000;

      cursor: pointer;
    }


    .transfer.active {
      background: #848BA4;
      color: white;
    }

    /* 가계부 카테고리 선택 부분 */
    .select-category {
        margin-left: 40px;
        margin-top: 22px;

        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .category-container {
        position: relative;

        display: flex;
        flex-direction: row;
    }

    /* 셀렉트박스 틀, 화살표 설정 */
    select {
        appearance:none;
        background:url('./가계부_셀렉트박스_화살표.svg') no-repeat right 8px center;
        padding-right: 30px;
        border-color: #B1B1D2;
        border-radius: 5px;
    }

    .acc-category {
        margin-left: 95px;
        width: 183px;
        height: 40px;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 300;
        font-size: 17px;
        line-height: 25px;
        color: #969696;

        text-align: center;
    }

    .sub-category {
        margin-left: 2px;
        width: 183px;
        height: 40px;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 300;
        font-size: 17px;
        line-height: 25px;
        color: #969696;

        text-align: center;
    }

    /* 발생일시 입력 부분 */
    .occur-date {
        margin-left: 40px;
        margin-top: 16px;

        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .datetime-container {
        display: flex;
        flex-direction: row;
    }

    .datetime-class {
        margin-left: 5px;
        margin-top: 12px;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 21px;
        color: #000000;
    }

    .year {
        width: 64px;
        height: 38px;
        margin-left: 128px;

        border: 1px solid #B1B1D2;
        border-radius: 5px;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 300;
        font-size: 17px;
        line-height: 25px;
        color: #969696;
        text-align: center;
    }

    .month,
    .day {
        width: 42px;
        height: 38px;
        margin-left: 16px;

        border: 1px solid #B1B1D2;
        border-radius: 5px;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 300;
        font-size: 17px;
        line-height: 25px;
        color: #969696;
        text-align: center;
    }

    .time {
        width: 82px;
        height: 38px;
        margin-left: 20px;

        border: 1px solid #B1B1D2;
        border-radius: 5px;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 300;
        font-size: 17px;
        line-height: 25px;
        color: #969696;
        text-align: center;
    }

    /* 자산 선택 부분 */
    .select-asset {
        margin-left: 40px;
        margin-top: 8px;

        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .asset-container {
        display: flex;
        flex-direction: row;
    }

    .asset-category {
        margin-left: 95px;
        width: 136px;
        height: 40px;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 300;
        font-size: 17px;
        line-height: 25px;
        color: #969696;

        text-align: center;
    }

    .asset-name {
        margin-left: 2px;
        width: 230px;
        height: 40px;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 300;
        font-size: 17px;
        line-height: 25px;
        color: #969696;

        text-align: center;
    }

    /* 고정지출 여부 선택 부분 */
    .regular-or-not {
        margin-left: 40px;
        margin-top: 14px;

        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .regular-buttons {
        position: relative;
        margin-left: 60px;

        display: flex;
        flex-direction: row;
    }

    .regular {
        margin-right: 12px;
        width: 61px;
        height: 32px;

        background: #F9F9FF;
        border-radius: 16px;
        border: none;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 350;
        font-size: 17px;
        line-height: 25px;
        color: #000000;

        cursor: pointer;
    }

    .regular.active {
      background: #848BA4;
      color: white;
    }

    .irregular {
      width: 61px;
      height: 32px;

      background: #F9F9FF;
      border-radius: 16px;
      border: none;

      font-family: 'Noto Sans KR';
      font-style: normal;
      font-weight: 350;
      font-size: 17px;
      line-height: 25px;
      color: #000000;

      cursor: pointer;
    }

    .irregular.active {
      background: #848BA4;
      color: white;
    }

    /* 가게 입력 부분 */
    .store-info {
        margin-left: 40px;
        margin-top: 12px;

        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .input-container {
        position: relative;
        margin-left: 92px;
        width: 370px;
        display: flex;
    }

    .find-store {
        //margin-left: 92px;
        //width: 327px;
        width: 100%;
        height: 40px;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 300;
        font-size: 17px;
        line-height: 25px;
        text-overflow: auto;
        color: #969696;

        border: 1px solid #B1B1D2;
        border-radius: 5px;
        padding-left: 20px;
        padding-right: 30px;
        box-sizing: border-box;
    }

    .find-icon {
      position: absolute; /* 절대 위치로 설정하여 입력창 안에 배치 */
      right: 10px; /* 아이콘의 위치 설정 */
      top: 50%; /* 수직 중앙 정렬 */
      transform: translateY(-50%); /* 수직 중앙 정렬 보정 */
    }

    .find-icon img {
      width: 20px; /* 아이콘 크기 조정 */
      height: auto; /* 비율 유지 */
    }

    /* 가계부 등록 버튼 */
    .add-button {
        margin-left: 480px;
        margin-top: 30px;
      margin-bottom: 20px;
        width: 89px;
        height: 32px;

        background: #25272F;
        border-radius: 16px;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 350;
        font-size: 17px;
        line-height: 25px;
        color: #FFFFFF;

        cursor: pointer;
    }
</style>