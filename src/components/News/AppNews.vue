<template>
  <div class="news-card mt-3" @click="goToDetails">
    <!-- Иконка -->
    <div class="news-image-wrapper">
      <i class="pi pi-bolt news-icon"></i>
    </div>

    <!-- Контент -->
    <div class="news-content">
      <div class="news-category">{{ item.content }}</div>
      <h3 class="news-title">{{ item.title }}</h3>
      <div class="news-footer">
        <span class="news-date">Дата: {{ formatDate(item.created_at) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

defineProps({
  item: {
    type: Object,
    required: true,
  },
});

function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function goToDetails() {
  if (item.route) {
    router.push(item.route);
  }
}
</script>

<style scoped>
.news-card {
  background-color: var(--card-background-color);
  border-left: 6px solid var(--card-border-left); /* Золотая полоса слева */
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: var(--box-shadow);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.news-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(255, 215, 0, 0.2);
}

.news-image-wrapper {
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background-color);
  padding: 1rem;
  transition: all 0.3s ease;
}

.news-icon {
  font-size: 5rem;
  color: var(--card-color-content); /* Золотой цвет из переменных */
  transition: transform 0.3s ease;
}

.news-card:hover .news-icon {
  transform: scale(1.1) rotate(5deg);
}

.news-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.news-category {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: var(--card-subtext-color);
  margin-bottom: 0.5rem;
}

.news-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--text-color);
  margin-bottom: 0.75rem;
}

.news-summary {
  font-size: 0.95rem;
  color: var(--card-subtext-color);
  flex-grow: 1;
  margin-bottom: 1rem;
}

.news-footer {
  font-size: 0.85rem;
  color: var(--card-subtext-color);
}
</style>
