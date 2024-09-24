<template>
    <div>
        <SearchBar @onEnterKeyDown="searchAddress" />
        <SearchAddressResult :addressResults="addressResults" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import SearchAddressResult from '@/components/SearchAddressResult.vue';

const { VITE_KAKAO_REST_API_KEY } = import.meta.env;

const addressResults = ref([]);

async function searchAddress(keyword) {
    console.log(keyword);

    if (!keyword) {
        window.alert("검색 키워드를 입력해주세요!");
        return;
    }

    const response = await fetch(
        `https://dapi.kakao.com/v2/local/search/keyword?query=${keyword}`,
        {
            headers: {
                'Authorization': `KakaoAK ${VITE_KAKAO_REST_API_KEY}`
            },
    });
    const { documents } = await response.json();
    addressResults.value = documents;
}

</script>

<style scoped>

</style>