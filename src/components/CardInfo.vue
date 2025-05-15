<template>
  <Card class="card" :style="cardStyle">
    <template #header>
      <slot name="header" />
    </template>
    <template #title>{{ title }}</template>
    <template #subtitle
      ><div :style="styleSub">{{ subtitle }}</div></template
    >
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
  color: { type: String, default: "white" },
  colorSub: { type: String, default: "gray" },
  borderColor: { type: String, default: "transparent" },
  borderLeft: { type: String, default: "0px" },
  borderLeftWidth: { type: String, default: "0px" },
  borderWidth: {
    type: String,
    default: "0px",
  },
});
const cardStyle = computed(() => ({
  color: props.color || "white",
  backgroundColor: props.backgroundColor || "rgb(59, 63, 63)",
  borderLeft: `${props.borderLeftWidth} solid ${props.borderLeft}`,
  borderTop: `${props.borderWidth} solid ${props.borderColor}`,
  borderRight: `${props.borderWidth} solid ${props.borderColor}`,
  borderBottom: `${props.borderWidth} solid ${props.borderColor}`,
}));
const styleSub = computed(() => ({
  color: props.colorSub || "gray",
}));
</script>

<style scoped>
@media (max-width: 600px) {
  .card {
    width: 80vw;
  }
}
</style>
