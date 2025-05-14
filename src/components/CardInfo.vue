<template>
  <Card class="card">
    <template #header>
      <slot name="header" />
    </template>
    <template #title>{{ title }}</template>
    <template #subtitle>{{ subtitle }}</template>
    <template #content>
      <slot name="content" />
    </template>
    <template #footer>
      <slot name="footer" />
    </template>
  </Card>
</template>

<script setup>
import { Card } from "primevue";

const props = defineProps({
  title: String,
  subtitle: String,
});
</script>

<style scoped>
.card {
  background-color: rgb(59, 63, 63);
  color: white;
}
@media (max-width: 600px) {
  .card {
    height: 62vh;
  }
}
</style>
