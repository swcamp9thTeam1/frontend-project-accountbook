<template>
    <ul class="container-save-map-marker-category">
        <li v-for="markerCategory in markerCategories" :key="markerCategory" 
        @click="changeMarkerCategory(markerCategory)"
        :class="{selected: selectedCategory === markerCategory}">
            {{ markerCategory }}
        </li>
    </ul>
</template>

<script setup>
import { ref } from 'vue';

const markerCategories = ref(["goodStore", "visited", "costAvg"]);
const selectedCategory = ref("");

function changeMarkerCategory(category) {
    selectedCategory.value = category;
}

</script>

<style scoped>
.container-save-map-marker-category {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    align-items: stretch;

    li {
        font-size: 16px;
        color: #8181B0;
        font-weight: 400;

        width: 130px;
        height: 50px;
        border: 1px solid #B1B1D2;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 5px 5px 9px 0px rgba(0, 0, 0, .25);

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