<template>
    <h1>
        all
      <div class="container">
        <AccountBookListButtons/>
        <AccountBookDays/>
        <AccountBookList/>
      </div>

    </h1>

</template>

<script setup>
import "@/components/accbook/AccountBookList.vue"
import AccountBookList from "@/components/accbook/AccountBookList.vue";
import AccountBookListButtons from "@/components/accbook/AccountBookListButtons.vue";
import AccountBookDays from "@/components/accbook/AccountBookDays.vue";
</script>

<style scoped>
/* 전체 컨테이너 */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: auto;
  padding: 20px;
}

</style>
