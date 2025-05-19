<template>
  <div class="container">
    <h1 class="text-3xl mb-2">Часто задаваемые вопросы</h1>
    <div class="card">
      <TheAccordion
        title="Как зарегистрироваться?"
        :expanded="true"
        :content="'Ответ на вопрос о регистрации'"
      ></TheAccordion>
    </div>
  </div>
</template>

<script setup>
import TheAccordion from "@/components/TheAccordion.vue";
import { ref } from "vue";
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
