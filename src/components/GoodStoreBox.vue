<template>
    <div class="store-good">
        <div class="good-store-title">
            이 가게는<br>
            <span class="highlight">착한가격업소</span> 입니다. 
        </div>

        <div class="good-store-menu">
            <div class="menu-name">
                {{ props.good.menu }}
            </div>
            <div class="menu-price">
                {{ props.good.price.toLocaleString() }}원
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    good: Object
})

</script>

<style scoped>
.store-good {
    background-color: white;
    border:rgba(154, 224, 159, 0.8) 2px solid;
    padding: 20px;
    border-radius: 3px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;

    .good-store-title {
        font-size: 20px;

        .highlight {
            color: rgba(154, 224, 159, 0.8);
        }
    }
    
    .good-store-menu {
        display: flex;
        align-items: center;

        .menu-name {
            background-color: rgba(154, 224, 159, 0.8);
            width: 156px;
            height: 40px;
            border-radius: 3px;
            font-size: 20px;
            margin-right: 10px;

            display: flex;
            justify-content: center;
            align-items: center;
        }

        .menu-price {
            font-size: 20px;
        }
    }
}
</style>