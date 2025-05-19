<template>
  <div class="news-card w-4/5 mb-3">
    <div class="news-image-wrapper">
      <img :src="item.image" :alt="item.title" class="news-image" />
    </div>
    <div class="news-content">
      <div class="news-category">{{ item.category }}</div>
      <h3 class="news-title">{{ item.title }}</h3>
      <p class="news-summary">{{ item.summary }}</p>

      <div class="news-footer">
        <span class="news-date">{{ formatDate(item.date) }}</span>
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
  border: 1px solid var(--card-border-color);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--box-shadow);
  cursor: pointer;
  transition: all 0.3s ease;
}

.news-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(255, 215, 0, 0.3);
}

.news-image-wrapper {
  height: 200px;
  overflow: hidden;
}

.news-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.news-image:hover {
  transform: scale(1.05);
}

.news-content {
  padding: 1.5rem;
}

.news-category {
  font-size: 0.75rem;
  color: var(--card-subtext-color);
  text-transform: uppercase;
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
  margin-bottom: 1rem;
}

.news-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: var(--card-subtext-color);
}

.news-icon {
  color: var(--card-border-color);
  transition: transform 0.3s ease;
}

.news-card:hover .news-icon {
  transform: translateX(4px);
}
</style>
