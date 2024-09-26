<template>
  <div class="parent-container">
    <AccountBookInsert/>
  </div>

</template>

<script setup>

import AccountBookInsert from "@/components/accbook/AccountBookInsert.vue";
</script>

<style scoped>
.parent-container {
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>