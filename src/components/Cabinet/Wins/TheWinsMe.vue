<template>
  <div class="stat-card flex gap-3 items-center w-2/6" :class="severityClass">
    <Avatar :image="image" class="custom-avatar" shape="square" />
    <h1 class="text-[var(--text-color)] text-3xl">{{ title }}</h1>
    <p class="text-[var(--text-color)] text-3xl">{{ value }}</p>
  </div>
</template>

<script setup>
import { Avatar } from "primevue";
import { defineProps, computed } from "vue";
import image from "../../../assets/img/avatar.jpeg";
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

// Вычисляем класс на основе значения severity
const severityClass = computed(() => {
  return props.severity ? `severity-${props.severity}` : "";
});
</script>

<style scoped>
.custom-avatar {
  width: 10rem !important; /* Пример: 160px */
  height: 10rem !important; /* Пример: 160px */
  font-size: 5rem !important; /* Размер иконки внутри (если используется) */
}
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
