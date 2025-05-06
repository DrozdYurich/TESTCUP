<template>
  <div class="cabinet">
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
  height: 100vh;
}
.sidebar {
  /* Высота по содержимому, не ограничиваем */
  align-self: flex-start;
  position: sticky;
  top: 80px;
  /* Можно добавить padding/margin по желанию */
}
.info {
  height: 100vh;
  overflow-y: auto;
  margin-top: 1rem;
  /* Если нужен отступ сверху, например под тулбар */
  /* padding-top: 60px; */
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
