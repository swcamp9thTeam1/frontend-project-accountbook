<template>
    <div v-if="props.visible" class="modal-overlay">
        <div class="modal-content">
            <img src="@/assets/icons/check_modal.png"/>
            <section class="modal-body">
                <slot></slot>
            </section>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    // Props for title and visibility
    const props = defineProps({
        title: {
            type: String,
            default: "Dialog",
        },
        visible: {
            type: Boolean,
            default: false,
        },
    });

</script>

<style scoped>
    .modal-overlay {
        position: fixed;
        flex-direction: column;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(128, 123, 123, 0.685);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-content {
        width: 427px;
        height: 202px;
        border-radius: 21px;
        display: grid;
        grid-template-rows: 1fr 1fr;
        border: 1px solid #B1B1D2;
        background: #FFF;
        padding: 20px;
        align-items: center;
        justify-items: center;
        
    }
    img{
        padding-top: 30px;
    }
    .modal-body {
        margin: 0;
        padding-bottom: 30px;
        color: #101424;
        font-family: "Noto Sans KR";
    }
    img {
        width: 60px;
        height: 60px;
    }
</style>