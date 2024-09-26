<template>
  <div class="buttons">
    <button class="find-button">
      <img src="../../assets/icons/가계부_검색_버튼.svg" alt="검색">
    </button>
    <button class="insert-button">
      <img src="../../assets/icons/가계부_추가_버튼.svg" alt="추가">
    </button>
    <button class="category-button">
      <img src="../../assets/icons/가계부_카테고리관리_버튼.svg" alt="카테고리">
    </button>
  </div>
</template>

<script setup>

</script>

<style scoped>
/* 가계부 상단의 검색/추가/카테고리 관리 버튼 */
.buttons {
  display: flex;
  //flex-wrap: wrap;
  //flex-direction: row;
  align-content: space-evenly;
  justify-content: flex-end;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;

  //position: absolute;
  //width: 133px;
  //height: 37px;
  //left: 1199px;
  //top: 163px;
}

.find-button {
  width: 37px;
  height: 37px;
  border: none;
  background-color: #ffffff;
  backface-visibility: hidden;
  cursor: pointer;
}

.insert-button {
  margin-left: 8px;
  margin-right: 8px;

  width: 37px;
  height: 37px;
  border: none;
  background-color: #ffffff;
  backface-visibility: hidden;
  cursor: pointer;
}

.category-button {
  margin-right: 6px;

  width: 37px;
  height: 37px;
  border: none;
  background-color: #ffffff;
  backface-visibility: hidden;
  cursor: pointer;
}
</style>