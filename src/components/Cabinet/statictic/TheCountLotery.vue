<template>
  <div class="stat-card" :class="severityClass">
    <h3 class="stat-title">{{ title }}</h3>
    <p class="stat-value">{{ value }}</p>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  severity: {
    type: String,
    default: null,
    validator: (value) =>
      ["success", "info", "warning", "danger", "primary", null].includes(value),
  },
});

// Вычисляем класс по уровню важности
const severityClass = computed(() => {
  if (!props.severity) return "";
  return `severity-${props.severity}`;
});
</script>

<style scoped>
.stat-card {
  background-color: var(--card-background-color);
  border-left-width: 7px;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: var(--box-shadow);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(255, 215, 0, 0.3); /* Золотая тень при ховере */
}

.stat-title {
  font-size: 1rem;
  color: var(--card-subtext-color);
  margin-bottom: 0.5rem;
  text-align: left;
  font-weight: 500;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: bold;
  color: var(--text-color);
  text-align: right;
}

.severity-primary {
  border-color: var(--card-border-color); /* Золотой */
}

.severity-success {
  border-color: #3d3c3c; /* Чёрный */
}

.severity-info {
  border-color: #ffd700; /* Золотой */
}

.severity-warning {
  border-color: #3d3c3c; /* Чёрный */
}

.severity-danger {
  border-color: #ffd700; /* Золотой */
}
</style>
