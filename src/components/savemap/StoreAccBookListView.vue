<template>
    <div class="store-accbook-list-container">
        <h3>이 가게와 연동된 가계부 목록 ({{ props.accBooks.length }}개)</h3>

        <AccountBookItem 
            v-for="accbook in props.accBooks" 
            :key="accbook.id" 
            :item="accbook"
            @itemClicked="clickAccBook" />
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import AccountBookItem from '@/components/accbook/AccountBookList.vue';

const props = defineProps({
    accBooks: {
        type: Array,
        required: true
    },
    currentAccBookId: Number
})

const clickAccBook = (accBookId) => {
    console.log(accBookId);
}
</script>

<style scoped>
.store-accbook-list-container {
    padding: 20px;
}
</style>