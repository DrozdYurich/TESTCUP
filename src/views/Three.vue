<template>
  <div class="container">
    <h1 class="text-3xl mt-1 mb-2 font-bold">Часто задаваемые вопросы</h1>
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
  max-width: 1400px;
  margin: 0 auto;
}
.p-accordion-content {
  background-color: var(--background-color);
}
@media (max-width: 600px) {
  .container {
    width: 90vw;
  }
}
</style>
