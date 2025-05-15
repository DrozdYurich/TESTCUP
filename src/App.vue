<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import AuthLayout from "./Layout/AuthLayout.vue";
import MainLayout from "./Layout/MainLayout.vue";
import Toast from "primevue/toast";
import { DynamicDialog } from "primevue";

const route = useRoute();
const layout = computed(() => {
  return route.meta.layout === "Auth" ? AuthLayout : MainLayout;
});
onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<template>
  <Toast position="top-right" />
  <DynamicDialog />
  <Transition name="fade" mode="out-in">
    <component :is="layout">
      <RouterView v-slot="{ Component }">
        <component :is="Component" :key="$route.path" />
      </RouterView>
    </component>
  </Transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

@media (max-width: 940px) {
  .p-toast {
    width: 280px !important; /* Занимает 90% ширины экрана */
  }
}
/* Увеличиваем непрозрачность фона toast */
.p-toast .p-toast-message {
  background-color: rgba(255, 255, 255, 0.9);
}

.p-toast .p-toast-message .p-toast-summary,
.p-toast .p-toast-message .p-toast-detail {
  opacity: 1;
}
</style>
