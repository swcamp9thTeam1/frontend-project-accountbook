<template>
    <header>
        <nav>
            <RouterLink to="/">
                로고이미지로 바꿔주세요
            </RouterLink>
            
        </nav>        

        <div v-if="user">
            <RouterLink to="/my">
                <button type="button">마이페이지</button>
            </RouterLink>
        </div>
    </header>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const user = ref("");   // 이거로 유저 있는지 없는지 컨트롤

</script>

<style scoped>

</style>