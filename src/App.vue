<template>
  <select name="" id="" v-model="username">
    <option value="채연">채연 컴포넌트</option>
    <option value="시우">시우 컴포넌트</option>
    <option value="현진">현진 컴포넌트</option>
    <option value="호정">호정 컴포넌트</option>
    <option value="다민">다민 컴포넌트</option>
    <option value="경희">경희 컴포넌트</option>
  </select>

  <div v-if="username === '채연'">
    <!-- 채연 컴포넌트 -->
  </div>

  <div v-else-if="username === '시우'">
    <!-- 시우 컴포넌트 -->
  </div>

  <div v-else-if="username === '현진'">
    <!-- 현진 컴포넌트 -->
    <SaveMap />
    <!-- <SearchAddress /> -->
  </div>

  <div v-else-if="username === '호정'">
    <!-- 호정 컴포넌트 -->
  </div>

  <div v-else-if="username === '다민'">
    <!-- 다민 컴포넌트 -->
  </div>

  <div v-else>
    <!-- 경희 컴포넌트 -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SaveMap from '@/components/SaveMap.vue';
import SearchBar from '@/components/SearchBar.vue';
import SearchAddress from '@/components/SearchAddress.vue';

const username = ref("");
</script>

<style scoped>

</style>
