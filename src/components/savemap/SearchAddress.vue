<template>
    <div class="container-search-address">
        <SearchBar @searchAddress="searchAddress" />
        <SearchAddressResult v-show="addressResults.length > 0" :addressResults="addressResults" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import SearchBar from '@/components/savemap/SearchBar.vue';
import SearchAddressResult from '@/components/savemap/SearchAddressResult.vue';

const { VITE_KAKAO_REST_API_KEY } = import.meta.env;

const addressResults = ref([]);

const searchAddress = async (keyword) => {
    if (!keyword) {         // 검색결과 지우기
        addressResults.value = [];
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
.container-search-address {
    position: absolute;
    top: 10px;
    left: 16px;
    right: 200px;
    z-index: 2;
}
</style>