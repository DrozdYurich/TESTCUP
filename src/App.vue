<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import AuthLayout from "./Layout/AuthLayout.vue";
import MainLayout from "./Layout/MainLayout.vue";

const route = useRoute();
const layout = computed(() => {
  return route.meta.layout === "Auth" ? AuthLayout : MainLayout;
});
</script>

<template>
  <component :is="layout">
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
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
</style>
