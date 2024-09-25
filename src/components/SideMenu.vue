<template>
    <div>
        <div v-for="menu in menus" :key="menu.id">
            <RouterLink :to="menu.path">
                {{ menu.name }}
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
    menus: Array
});

</script>

<style scoped>

</style>