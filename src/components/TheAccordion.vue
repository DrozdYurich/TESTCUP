<template>
  <div class="question-card" :class="{ 'question-card--expanded': isExpanded }">
    <div class="question-header" @click="toggle">
      <div class="flex items-center gap-3">
        <i class="pi pi-question-circle text-[var(--card-border-color)]"></i>
        <h3 class="text-[var(--text-color)] font-semibold">{{ title }}</h3>
      </div>
      <i
        :class="[
          'pi',
          isExpanded ? 'pi-chevron-up' : 'pi-chevron-down',
          'text-[var(--card-border-color)] transition-transform duration-300',
        ]"
      ></i>
    </div>

    <transition name="slide">
      <div v-show="isExpanded" class="question-content">
        <p class="text-[var(--text-color)] leading-relaxed">
          {{ content }}
        </p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  expanded: {
    type: Boolean,
    default: false,
  },
});

const isExpanded = ref(props.expanded);

function toggle() {
  isExpanded.value = !isExpanded.value;
}
</script>

<style scoped>
.question-card {
  background-color: var(--card-background-color);
  border-left: 4px solid var(--card-border-color);
  border-radius: 12px;
  box-shadow: var(--box-shadow);
  overflow: hidden;
  transition: all 0.3s ease;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  cursor: pointer;
  background-color: var(--accordion-bg);
  color: var(--text-color);
  border-bottom: 1px solid var(--card-border-color);
  transition: background-color 0.3s ease;
}

.question-content {
  padding: 1rem 1.25rem;
  background-color: var(--card-background-color);
  border-bottom: 1px solid var(--card-border-color);
}

/* Анимация */
.slide-enter-active,
.slide-leave-active {
  transition: max-height 0.3s ease-out;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
}

.slide-enter-to,
.slide-leave-from {
  max-height: 200px; /* Максимальная высота для анимации */
}
</style>
