<template>
  <div class="cabinet">
    <TheSideBar class="sidebar" v-if="!isMobile" />

    <div
      class="info mt-5 ml-1.5 rounded"
      :style="{ background: 'var(--background-color)' }"
    >
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </div>

    <TheToolBar v-if="isMobile" class="toolbar" />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import TheSideBar from "./TheSideBar.vue";
import TheToolBar from "./TheToolBar.vue";
const isMobile = ref(window.innerWidth <= 1100);

function onResize() {
  isMobile.value = window.innerWidth <= 1100;
  console.log(isMobile.value);
}

onMounted(() => {
  window.addEventListener("resize", onResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", onResize);
});
</script>
<style>
.cabinet {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas: "sidebar info";
  height: 100%;
}
.sidebar {
  grid-area: sidebar;
  align-self: flex-start;
  position: sticky;
  top: 80px;
  height: calc(100vh - 80px);
  overflow-y: auto;
}
.info {
  grid-area: info;
  overflow-y: auto;
  padding: 1rem;
}

@media (max-width: 1100px) {
  .cabinet {
    display: flex;
    flex-direction: column;
  }
  .footer {
    display: none;
  }

  .sidebar {
    display: none;
  }

  .info {
    height: calc(100vh - 56px);
    padding: 1rem;
  }

  .toolbar {
    display: block;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;

    z-index: 1000;
  }
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
