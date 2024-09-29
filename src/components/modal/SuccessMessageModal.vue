<template>
    <dialog class="modal-success-message">
        <img src="/src/assets/icons/ic-success.svg" alt="Success Icon">
        <p>성공했습니다!!</p>
    </dialog>
</template>

<script setup>

</script>

<style scoped>
.modal-success-message {
    background-color: white;
    border: 1px solid #B1B1D2;
    padding: 40px 60px;
    min-width: 400px;
    border-radius: 21px;
    
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 54px;
        height: 54px;
        margin-bottom: 20px;
    }

    p {
        font-size: 20px;
        margin: 0;
    }
}
</style>