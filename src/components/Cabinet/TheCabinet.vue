<template>
  <div>
    <h2>Личный кабинет</h2>
    <RouterView></RouterView>
    <TheSideBar />
    <TheToolBar />
  </div>
</template>
<script setup>
import TheSideBar from "./TheSideBar.vue";
import TheToolBar from "./TheToolBar.vue";
</script>
<style></style>
