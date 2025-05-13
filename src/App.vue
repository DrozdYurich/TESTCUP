<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import AuthLayout from "./Layout/AuthLayout.vue";
import MainLayout from "./Layout/MainLayout.vue";
import Toast from "primevue/toast";
import { DynamicDialog } from "primevue";

const route = useRoute();
const layout = computed(() => {
  return route.meta.layout === "Auth" ? AuthLayout : MainLayout;
});
</script>

<template>
  <Toast position="top-right" />
  <DynamicDialog />
  <component :is="layout">
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" :key="$route.path" />
      </Transition>
    </RouterView>
  </component>
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
  background-color: rgba(
    255,
    255,
    255,
    0.9
  ); /* вместо 0.7 или другого значения */
  /* или можно использовать сплошной цвет без прозрачности */
  /* background-color: #000000; */
}

/* Если нужно, можно убрать прозрачность у текста */
.p-toast .p-toast-message .p-toast-summary,
.p-toast .p-toast-message .p-toast-detail {
  opacity: 1;
}
</style>
