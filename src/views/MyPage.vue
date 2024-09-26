<template>
    <div>
        <RouterLink to="/my/edit-info" active-class="active">
            <button type="button" class="modify">수정하기</button>
        </RouterLink>
    </div>
    <div>
        <RouterView/>
    </div>
</template>

<script setup>
    import { RouterView, RouterLink } from 'vue-router';
    import { ref } from 'vue';
</script>

<style scoped>

</style>