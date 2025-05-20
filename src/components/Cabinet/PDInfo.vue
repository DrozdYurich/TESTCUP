<template>
  <div class="w-11/12 p-0.5">
    <h2 class="text-[var(--text-color)] text-3xl">Личная иформация</h2>
    <div class="info grid grid-cols-2 gap-6 sm:grid-cols-1 md:grid-cols-2">
      <AppFio data-aos="fade-up" data-aos-anchor-placement="top-center" />
      <TheSpinAdmin data-aos="fade-up" data-aos-anchor-placement="top-center" />
    </div>
  </div>
</template>
<script setup>
import TheSpinAdmin from "./Admin/TheSpinAdmin.vue";
import AppFio from "./PD/AppFio.vue";
</script>
<style scoped></style>
