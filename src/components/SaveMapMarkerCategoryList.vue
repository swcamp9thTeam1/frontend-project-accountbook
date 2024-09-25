<template>
    <ul class="container-save-map-marker-category">
        <li v-for="markerCategory in markerCategories" :key="markerCategory.id" 
        @click="changeMarkerCategory(markerCategory.id)"
        :class="{selected: selectedCategoryId === markerCategory.id}">
            {{ markerCategory.name }}
        </li>
    </ul>
</template>

<script setup>
import { ref } from 'vue';

const markerCategories = ref([
    {id: "goodStore", name: "착한가격업소"},
    {id: "visited", name: "방문한가게"},
    {id: "costAvg", name: "1인소비금액"}
]);
const selectedCategoryId = ref("");       // 선택된 마커 카테고리의 id 관리

function changeMarkerCategory(categoryId) {
    selectedCategoryId.value = categoryId;
}
</script>

<style scoped>
.container-save-map-marker-category {
    list-style-type: none;
    padding: 0;
    margin: 0;

    display: flex;
    flex-direction: column;
    align-items: stretch;

    position: absolute;
    top: 10px;
    right: 16px;
    z-index: 2;

    li {
        font-size: 16px;
        color: #8181B0;
        font-weight: 400;

        width: 130px;
        height: 50px;
        border: 1px solid #B1B1D2;
        border-radius: 5px;
        box-shadow: 5px 5px 9px 0px rgba(0, 0, 0, .25);
        background-color: white;

        display: flex;
        justify-content: center;
        align-items: center;

        + li {
            margin-top: 10px;
        }

        &.selected {
            box-shadow: 0 0 0 4px #101424 inset, 5px 5px 9px 0px rgba(0, 0, 0, .25);
            font-weight: 700;
            color: #101424;
        }
    }
}
</style>