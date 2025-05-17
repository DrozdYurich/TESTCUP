<template>
  <div class="container">
    <div class="card">
      <Accordion value="0">
        <AccordionPanel v-for="acc in tabs" :value="acc.value">
          <AccordionHeader>{{ acc.title }}</AccordionHeader>
          <AccordionContent>
            <p class="m-0">
              {{ acc.content }}
            </p>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
  </div>
</template>

<script setup>
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionPanel,
} from "primevue";
import { value } from "valibot";
import { ref } from "vue";

const tabs = ref([
  { title: "Title 1", content: "Content 1", value: "0" },
  { title: "Title 2", content: "Content 2", value: "1" },
  { title: "Title 3", content: "Content 3", value: "2" },
]);
</script>

<style scoped>
.container {
  width: 90vw;
  margin: auto;
}
.p-accordion.p-component {
}
/* Стили для всего аккордеона */
.p-accordion {
  border: 1px solid var(--border-color);
  border-radius: 6px;
}

/* Стили для заголовков */
.p-accordion-header {
  background-color: var(--card-background-color);
  color: var(--text-color);
  padding: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.p-accordion-header:hover {
  background-color: var(--card-background-color-hover);
}

/* Стили для активного заголовка */
.p-accordion-header.p-highlight {
  background-color: var(--primary-color);
  color: white;
}

/* Стили для содержимого */
.p-accordion-content {
  padding: 1rem;
  background-color: var(--background-color);
  border-bottom: 1px solid var(--border-color);
}

/* Иконки стрелок */
.p-accordion-header-icon {
  color: var(--text-color);
}
</style>
