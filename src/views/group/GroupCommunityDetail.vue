<template>
    <div>
        <GroupPostDetailView v-if="postData !== null" :post="postData" />
    </div>
</template>

<script setup>
import GroupPostDetailView from '@/components/group/GroupPostDetailView.vue';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const currentPostId = ref(null);
const postData = ref(null);

/* onMounted와 watch를 사용하여 현재 postId를 가져옴 */
onMounted(() => {
    currentPostId.value = route.params.postId;
});

watch(() => route.params.postId, async (newId, oldId) => {
    currentPostId.value = newId;
});

// 현재 postId가 있다면 글 가져오기
watch(currentPostId, () => {
    if (currentPostId.value === null) return;

    fetch(`http://localhost:8080/group-posts/${currentPostId.value}`)
    .then((response) => response.json())
    .then(data => {
        postData.value = data;
    })
    .catch(error => {
        alert("게시글을 가져오는 동안 오류가 발생했습니다.");
    });
});
</script>

<style scoped>

</style>