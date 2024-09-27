<template>
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
import { RouterView } from 'vue-router';

</script>

<style scoped>
.container {
  flex: 1;
  display: flex;
  height: calc(100vh - /* header height */ 60px - /* footer height */ 60px);
}

.calendar-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.router-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 20px;
}

nav {
  margin-bottom: 20px;
}
</style>