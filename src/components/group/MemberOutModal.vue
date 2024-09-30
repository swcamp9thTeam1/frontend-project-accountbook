<template>
    <div v-if="props.visible" class="modal-overlay">
        <div class="modal-content">
            <header class="modal-header">
                <h3>{{ title }}</h3>
            </header>
            <section class="modal-body">
                <slot></slot>
            </section>
            <footer class="modal-footer">
                <button class="btn ok-btn" @click="confirm">확인</button>
                <button class="btn cancel-btn" @click="cancel">취소</button>
            </footer>
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

    // Emit events when buttons are clicked
    const emit = defineEmits(["cancel", "confirm"]);

    // Methods for handling button clicks
    const cancel = () => {
        emit("cancel");
    };

    const confirm = () => {
        emit("confirm");
    };
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    width: 500px;
    flex-shrink: 0;
    border-radius: 23px;
    background-color:  #FFF;
    box-shadow: 0px 4px 4px 0px rgba(93, 93, 93, 0.25);
    padding: 20px;
    text-align: center;
}

.modal-header h3 {
    margin: 0;
}

.modal-body {
    margin: 20px 0;
}

.modal-footer {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 0 30px 0 30px;
}

.btn {
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 5px;
}

.ok-btn {
    background-color: #E14239;
    color: white;
}
.cancel-btn {
    background-color: #858585;
    color: white;
}
</style>