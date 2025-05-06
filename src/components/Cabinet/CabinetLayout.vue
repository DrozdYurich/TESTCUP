<template>
  <div class="cabinet gap-6">
    <TheSideBar class="sidebar" />
    <div class="info">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </RouterView>
    </div>
    <TheToolBar />
  </div>
</template>

<script setup>
import TheSideBar from "./TheSideBar.vue";
import TheToolBar from "./TheToolBar.vue";
</script>
<style>
.cabinet {
  display: grid;
  grid-template-columns: auto 1fr;

  height: 90vh;
}
.sidebar {
  align-self: flex-start;
  position: sticky;
  top: 80px;
}
.info {
  overflow-y: auto;
  margin-top: 1rem;
}

.fade-enter-active {
  animation: in 0.4s ease;
}
.fade-leave-active {
  animation: out 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
@keyframes in {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes out {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100px);
  }
}
</style>
