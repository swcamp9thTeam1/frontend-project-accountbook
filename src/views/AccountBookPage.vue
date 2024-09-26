<template>
    <h1>가계부 Main</h1>

    <nav>
        <RouterLink to="/account-book" active-class="active" replace>Home</RouterLink>
        <RouterLink to="/account-book/add" active-class="active" replace>Add</RouterLink>
        <RouterLink to="/account-book/all" active-class="active" replace>All</RouterLink>
        <RouterLink to="/account-book/daily" active-class="active" replace>Daily</RouterLink>
        <RouterLink to="/account-book/detail" active-class="active" replace>Detail</RouterLink>
    </nav>

    <div  class="container">
        <div class="calendar-container">
            <CustomCalendarView />
        </div>
        <div class="router-container">
            <RouterView />
        </div>
    </div>
</template>

<script setup>
import CustomCalendarView from '@/components/calendar/CustomCalendarView.vue';
import AccbookAddView from './accountbook/AccbookAddView.vue';
import AccbookAllListView from './accountbook/AccbookAllListView.vue';
import AccbookDailyListView from './accountbook/AccbookDailyListView.vue';
import AccbookDetailView from './accountbook/AccbookDetailView.vue';
import { RouterView } from 'vue-router';

</script>

<style scoped>
.container {
    flex: 1;
    display: flex;
}

.calendar-container {
    flex: 1;
    /* 왼쪽 영역 (CustomCalendarView) */
    display: flex;
    justify-content: center;
    /* 수평 중앙 정렬 */
    align-items: center;
    /* 수직 중앙 정렬 */
}

.router-container {
    flex: 1;
    /* 오른쪽 영역 (RouterView) */
    display: flex;
    justify-content: center;
    /* 수평 중앙 정렬 */
    align-items: flex-start;
    /* 상단 정렬 */
    padding-top: 20px;
    /* 상단 여백 */
}

nav {
    margin-bottom: 20px;
    /* 링크와 컨테이너 간 여백 */
}
</style>
