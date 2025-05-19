<template>
  <Card class="app-card" :style="cardStyle">
    <!-- Заголовок -->
    <template #header>
      <slot name="header" />
    </template>

    <!-- Основной заголовок -->
    <template v-if="title" #title>
      <h3 class="app-card-title">{{ title }}</h3>
    </template>

    <!-- Подзаголовок -->
    <template v-if="subtitle" #subtitle>
      <div class="app-card-subtitle">
        {{ subtitle }}
      </div>
    </template>

    <!-- Контент -->
    <template #content>
      <slot name="content" />
    </template>

    <!-- Футер -->
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
  borderTop: `${props.borderWidth} solid var(--card-border)`,
  borderRight: `${props.borderWidth} solid var(--card-border)`,
  borderBottom: `${props.borderWidth} solid var(--card-border)`,
}));
</script>

<style>
.app-card {
  background-color: var(--card-background-color);
  border-left: v-bind("borderLeftWidth + ' solid var(--card-border-color)'");
  box-shadow: var(--box-shadow);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.app-card:hover {
  box-shadow: 0 8px 16px rgba(255, 215, 0, 0.3); /* золотистая тень */
}

/* === Заголовок === */
.app-card-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

/* === Подзаголовок === */
.app-card-subtitle {
  font-size: 0.9rem;
  color: var(--card-subtext-color);
  margin-bottom: 1rem;
}

/* === Контент внутри карточки === */
.p-card-body {
  padding: 1.5rem;
  color: var(--text-color);
}

.p-card-footer {
  background-color: transparent;
}
</style>
