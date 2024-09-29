<template>
    <div class="group-accounts-container">
        <div class="list-group-member">
            <div 
                v-for="groupMember in groupMembers" 
                :key="groupMember.id" 
                class="item-member" 
                :class="{ active: groupMember.id === selectedMember?.id }"
                @click="clickMember(groupMember)">{{ groupMember.nickname }}</div>
        </div>
        <div class="account-book-area">
            <div v-if="selectedMember === null" class="empty-selected-member">
                가계부 볼 그룹원을 선택해주세요!
            </div>
            <GroupMemberAccBookList v-else :groupMember="selectedMember" />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import GroupMemberAccBookList from "@/components/group/GroupMemberAccBookList.vue";

const groupMembers = ref([]);
const selectedMember = ref(null);       // 가계부 볼 그룹원 (가계부 목록까지 다 있음)

onMounted(async () => {
    const response = await fetch("http://localhost:8080/group-members");
    const data = await response.json();
    groupMembers.value = data;
})

const clickMember = (member) => {
    selectedMember.value = member;
}
</script>

<style scoped>
.group-accounts-container {
    display: flex;

    .list-group-member {
        width: 300px;
        border-right: 1px solid #898d93;
        padding: 50px 0;

        .item-member {
            font-size: 23px;
            text-align: center;
            font-weight: lighter;
            cursor: default;
            padding: 10px;

            &.active {
                font-weight: bold;
            }
        }
    }

    .account-book-area {
        flex-grow: 1;

        .empty-selected-member {
            text-align: center;
            position: relative;
            top: 50%;
            transform: translateY(-50%);

            font-size: 20px;
        }
    }
}
</style>