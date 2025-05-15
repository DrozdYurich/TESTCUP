<template>
  <Card class="card" :style="cardStyle">
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
import { computed } from "vue";

const props = defineProps({
  title: String,
  subtitle: String,
  backgroundColor: String,
  color: String,
  borderLeft: String,
  borderWidth: {
    type: String,
    default: "3px",
  },
});
const cardStyle = computed(() => ({
  color: props.color || "white",
  backgroundColor: props.backgroundColor || "rgb(59, 63, 63)",
  borderLeft: `${props.borderWidth} solid ${props.borderLeft || "red"}`,
  border: `${props.borderWidth} solid ${props.borderColor || "#blue"}`,
}));
</script>

<style scoped>
@media (max-width: 600px) {
  .card {
    width: 80vw;
  }
}
</style>
