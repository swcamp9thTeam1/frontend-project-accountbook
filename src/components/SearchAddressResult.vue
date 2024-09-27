<template>
    <ul class="list-address-search-result">
        <li 
            class="item-address-search-result" 
            v-for="resultItem in props.addressResults" 
            :key="resultItem.id"
            @click="onClickResultItem">
            <div>
                <p class="place-name">{{ resultItem.place_name }}</p>
                <p class="category-name">{{ resultItem.category_name }}</p>
            </div>
            <p class="address-name">{{ resultItem.road_address_name }}</p>
        </li>
    </ul>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    addressResults: Array
});

function onClickResultItem() {
            
    /* 검색 결과 하나 클릭했을 때 동작할 부분 */
    console.log("검색결과 클릭");
}
</script>

<style scoped>
.list-address-search-result {
    border-radius: 10px;
    border: 1px solid #B1B1D2;
    background-color: white;
    box-shadow: 5px 5px 9px 0px rgba(0, 0, 0, .25);
    list-style-type: none;
    padding: 0;
    margin: 0;
    margin-top: 10px;
    max-height: 500px;
    overflow-y: auto;

    .item-address-search-result {
        padding: 20px 32px;
        display: flex;
        justify-content: space-between;

        &:hover {
            background-color: rgba(0, 0, 0, .20);
        }
    }

    p {
        margin: 0;

        &.address-name {
            font-size: 24px;
            color: rgba(0, 0, 0, .37);
        }

        &.place-name {
            font-size: 24px;
        }

        &.category-name {
            font-size: 16px;
            color: rgba(0, 0, 0, .37);
        }
    }
}
</style>