<template>
    <transition name="toast-slide">
        <div class="toast" v-if="showToast">
            <div class="toast-content"
                :style="{ backgroundColor: bgColor === 'success' ? '#30A46C' : 'red', color: textColor }">
                {{ message }}
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "ToastNotification",
    props: {
        message: String,
        isVisible: Boolean,
        bgColor: String,
        textColor: String,
    },
    data() {
        return {
            showToast: this.isVisible,
        };
    },
    methods: {
        hideToast() {
            this.showToast = false;
        },
    },
    watch: {
        isVisible: function (newVal) {
            if (newVal) {
                this.showToast = true;
                setTimeout(this.hideToast, 5000); // Auto-hide after 6 seconds
            }
        },
    },
};
</script>

<style scoped>
.toast {
    position: fixed;
    top: 20px;
    right: 0;
    z-index: 100;
    box-shadow: 0 0 8px 2px rgba(0, 0, 0, 0.2);
}

.toast-content {
    padding: 10px;
    border-radius: 4px;
    color: white;
    font-size: 16px;
    font-weight: 600;
    background-color: #30a46c;
}

.toast-slide-enter-active,
.toast-slide-leave-active {
    transition: transform 0.5s;
}

.toast-slide-enter-to,
.toast-slide-leave {
    transform: translateX(0);
}

.toast-slide-enter,
.toast-slide-leave-to {
    transform: translateX(100%);
}
</style>
