<template>
  <div class="container">
    <div class="card">
      <TheAccordion
        v-for="(n, index) in tabs"
        :key="index"
        :title="n.title"
        :content="n.content"
        :value="n.value"
      />
    </div>
  </div>
</template>

<script setup>
import TheAccordion from "@/components/TheAccordion.vue";
import { ref } from "vue";

const tabs = ref([
  { title: "Title 1", content: "Content 1", value: "0" },
  { title: "Title 2", content: "Content 2", value: "1" },
  { title: "Title 3", content: "Content 3", value: "2" },
]);
</script>

<style>
.container {
  width: 90vw;
  margin: auto;
}
.p-accordion-content {
  background-color: var(--background-color);
}
</style>
