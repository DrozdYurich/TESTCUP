<template>
  <Card class="card p-0" :style="cardStyle">
    <template #header>
      <slot name="header" />
    </template>
    <template v-if="title" #title>{{ title }}</template>
    <template v-if="subtitle" #subtitle
      ><div class="p-0" :style="styleSub">{{ subtitle }}</div></template
    >
    <template #content>
      <slot v-if="$slots.content" name="content" />
    </template>
    <template v-if="$slots.footer" #footer>
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
  color: props.colorSub,
}));
</script>

<style>
@media (max-width: 600px) {
  .card {
    width: 80vw;
  }
}
.p-card-body {
  padding: 10px;
}
.p-card {
  width: auto;
}
</style>
