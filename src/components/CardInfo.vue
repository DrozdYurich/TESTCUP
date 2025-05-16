<template>
  <Card class="card p-0 bg-[var(--card-bg)]" :style="cardStyle">
    <template #header>
      <slot name="header" />
    </template>
    <template v-if="title" #title
      ><h3 :style="{ color: 'var(--card-text)' }">{{ title }}</h3></template
    >
    <template class="" v-if="subtitle" #subtitle
      ><div class="p-0" :style="{ color: 'var(--card-subtext)' }">
        {{ subtitle }}
      </div></template
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

  borderLeftWidth: { type: String, default: "0px" },
  borderWidth: {
    type: String,
    default: "0px",
  },
});
const cardStyle = computed(() => ({
  borderLeft: `${props.borderLeftWidth} solid var(--card-border-left)`,
  borderTop: `${props.borderWidth} solid var(--card-border)`,
  borderRight: `${props.borderWidth} solid var(--card-border)`,
  borderBottom: `${props.borderWidth} solid var(--card-border)`,
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
