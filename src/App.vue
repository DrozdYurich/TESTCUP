<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import AuthLayout from "./Layout/AuthLayout.vue";
import MainLayout from "./Layout/MainLayout.vue";
import Toast from "primevue/toast";

const route = useRoute();
const layout = computed(() => {
  return route.meta.layout === "Auth" ? AuthLayout : MainLayout;
});
</script>

<template>
  <Toast />
  <component :is="layout">
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" :key="$route.path" />
      </Transition>
    </RouterView>
  </component>
</template>

<style scoped>
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
    width: 90vw !important; /* Занимает 90% ширины экрана */
    left: 5vw !important; /* Отступ слева для центрирования */
    right: auto !important; /* Отключаем правый отступ */
    max-width: none !important; /* Убираем максимальную ширину */
  }
}
</style>
