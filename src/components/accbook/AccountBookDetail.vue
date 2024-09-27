<template>
  <div class="detail-accbook">
    <input type="text" class="accbook-title" name="title" placeholder="제목"
           minlength="4" maxlength="20" required>
    <input type="number" class="accbook-amount" name="amount" placeholder="금액"
           minlength="1" maxlength="19" required>

    <img src="../../assets/icons/가계부_작성란_line.svg" class="line">

    <div class="finance-type">
      <div class="classification">분류</div>
      <div class="finance-type-buttons">
        <button class="in">수입</button>
        <button class="out">지출</button>
        <button class="transfer">이체</button>
      </div>
    </div>

    <div class="select-category">
      <div class="classification">카테고리</div>
      <div class="acc-category" >취미/도서</div>
    </div>

    <div class="occur-date">
      <div class="classification">일시</div>
      <div class="datetime-container">2024-09-27</div>
    </div>

    <div class="select-asset">
      <div class="classification">사용자산</div>
      <div class="asset-container">
        <div class="asset-category">카카오뱅크체크카드</div>
      </div>
    </div>

    <div class="regular-or-not">
      <div class="classification">고정지출 여부</div>
      <div class="regular-buttons">
        <button class="regular">Y</button>
        <button class="irregular">N</button>
      </div>
    </div>

    <div class="store-info">
      <div class="classification">가게 정보</div>
      <div class="find-store">교보문고 강남점</div>
    </div>

    <div class="edit-button-container">
      <button class="modify-button">수정하기</button>
      <button class="delete-button">삭제하기</button>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
/* 가계부 작성 부분 틀 */
.detail-accbook {
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
  color: #000000;

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
  color: #000000;

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

/* 가계부 카테고리 선택 부분 */
.select-category {
  margin-left: 40px;
  align-items: center;

  display: flex;
  flex-direction: row;
  margin-top: 20px;
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
  margin-left: 100px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-size: 17px;
  line-height: 25px;

  text-align: center;
}

/* 발생일시 입력 부분 */
.occur-date {
  margin-left: 40px;
  align-items: center;

  display: flex;
  flex-direction: row;
  margin-top: 20px;
}

.datetime-container {
  display: flex;
  flex-direction: row;
  margin-left: 130px;
  font-family: 'Noto Sans KR';
}

/* 자산 선택 부분 */
.select-asset {
  margin-left: 40px;
  align-items: center;

  display: flex;
  flex-direction: row;
  margin-top: 20px;
}

.asset-container {
  display: flex;
  flex-direction: row;
}

.asset-category {
  margin-left: 98px;
  //width: 136px;
  //height: 40px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  //font-weight: 300;
  font-size: 17px;
  line-height: 25px;
  color: #000000;

  text-align: center;
  align-items: center;
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
  //color: #969696;

  text-align: center;
}

/* 고정지출 여부 선택 부분 */
.regular-or-not {
  margin-left: 40px;
  align-items: center;

  display: flex;
  flex-direction: row;
  margin-top: 20px;
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

/* 가게 입력 부분 */
.store-info {
  margin-left: 40px;
  align-items: center;

  display: flex;
  flex-direction: row;
  margin-top: 20px;
}

.find-store {
  width: 100%;
  height: 30px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  //font-weight: 300;
  font-size: 17px;
  line-height: 25px;
  text-overflow: auto;
  //color: #969696;

  margin-left: 93px;
}

/* 가계부 등록 버튼 */
.modify-button {
  //margin-left: 100px;
  //margin-top: 30px;
  //margin-bottom: 20px;
  width: 80px;
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

.delete-button {
  //margin-left: 10px;
  //margin-top: 30px;
  //margin-bottom: 20px;
  width: 80px;
  height: 32px;

  background: #FF636B;
  border-color: #FF636B;
  border-radius: 16px;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 350;
  font-size: 17px;
  //line-height: 25px;
  color: #FFFFFF;

  cursor: pointer;
}

/* 수정하기/삭제하기 버튼 컨테이너 */
.edit-button-container {
  display: flex;
  justify-content: space-between;
  margin-left: 380px;
  margin-top: 30px;
  margin-bottom: 20px;
  width: 170px;
}
</style>