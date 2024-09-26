<template>
    <div class="page-title">가계부 작성</div>

    <div class="add-accbook">
        <input type="text" class="accbook-title" name="title" placeholder="제목을 입력해주세요."
        minlength="4" maxlength="20" required>
        <input type="number" class="accbook-amount" name="amount" placeholder="금액을 입력해주세요."
        minlength="1" maxlength="19" required>

        <img src="../assets/icons/가계부_작성란_line.svg" class="line">

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
            <div class="category-container">
                <select class="acc-category" id="acc-category" required>
                    <option value="">상위 카테고리</option>
                    <option value="근로수입">근로수입</option>
                </select>
                <select class="sub-category" id="sub-category" required>
                    <option value="">하위 카테고리</option>
                    <option value="급여">급여</option>
                </select>
            </div>
        </div>

        <div class="occur-date">
            <div class="classification">일시</div>
            <div class="datetime-container">
                <input type="text" class="year" name="year" placeholder="2000" pattern="\d*" maxlength="4" required>
                <div class="datetime-class">년</div>
                <input type="text" class="month" name="month" placeholder="01" pattern="\d*" maxlength="2" required>
                <div class="datetime-class">월</div>
                <input type="text" class="day" name="day" placeholder="01" pattern="\d*" maxlength="2" required>
                <div class="datetime-class">일</div>
                <input type="text" class="time" name="time" placeholder="00:00" minlength="5" maxlength="5" required>
            </div>
        </div>

        <div class="select-asset">
            <div class="classification">변동자산</div>
            <div class="asset-container">
                <select class="asset-category" id="asset-category" required>
                    <option value="">카테고리</option>
                    <option value="신용카드">신용카드</option>
                </select>
                <select class="asset-name" id="asset-name" required>
                    <option value="">자산을 선택해주세요.</option>
                    <option value="삼성카드">삼성카드 1234</option>
                </select>
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
            <input type="text" class="find-store" name="store-name" placeholder="방문한 가게명을 입력해주세요.">
            <div class="find-icon">
                <img src="../assets/icons/가계부_가게입력_돋보기_이미지.svg">
            </div>
        </div>

        <button class="add-button">등록하기</button>
    </div>
</template>

<script setup>

</script>

<style scoped>
    /* 작성 부분 상단의 "가계부 작성" 텍스트 */
    .page-title {
        position: absolute;
        left: 797px;
        top: 212px;
        width: 90px;
        height: 20px;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
        color: #000000;
    }

    /* 가계부 작성 부분 틀 */
    .add-accbook {
        position: absolute;
        width: 606px;
        height: 463px;
        left: 776px;
        top: 251px;

        box-shadow: 0px 0px 7px 1px #DFDFF5;
        border-radius: 30px;

        display: flex;
        flex-direction: column;
    }

    /* 가계부 제목 입력 부분 */
    .accbook-title {
        position: absolute;
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
        position: absolute;
        margin-left: 40px;
        margin-top: 58px;

        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 24px;
        color: #969696;

        border-width: 0;
    }

    .line {
        position: absolute;
        left: 6.6%;
        right: 5.94%;
        top: 20%;
        bottom: 80%;
    }

    /* 분류(수입/지출/이체) 선택 부분 */
    .finance-type {
        margin-left: 40px;
        margin-top: 112px;
        align-items: center;

        display: flex;
        flex-direction: row;
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
        position: absolute;
        margin-left: 160px;

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
        margin-top: 22px;

        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .category-container {
        position: absolute;

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
        margin-left: 160px;
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
        margin-left: 97px;
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
        position: absolute;
        margin-left: 160px;

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
        margin-top: 12px;

        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .find-store {
        margin-left: 92px;
        width: 327px;
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
        padding-left: 8px;
        padding-right: 30px;
    }

    .find-icon {
        position: absolute;
        margin-left: 82.5%;
    }

    /* 가계부 등록 버튼 */
    .add-button {
        margin-left: 488px;
        margin-top: 36px;
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