<template>
  <div class="container">
    <h1 class="text-3xl mt-1 mb-2 font-bold">Часто задаваемые вопросы</h1>
    <div class="card flex flex-col gap-8">
      <TheAccordion
        data-aos="fade-up"
        data-aos-anchor-placement="top-center"
        v-for="f in faq"
        :title="f.question"
        :expanded="false"
        :content="f.answer"
      ></TheAccordion>
    </div>
  </div>
</template>

<script setup>
import TheAccordion from "@/components/TheAccordion.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
const loading = ref();
const faq = ref();
const getFaq = async () => {
  try {
    loading.value = true;
    const response = await axios.get("/info/faq/");
    console.log(response.data);
    faq.value = response.data;
    loading.value = false;
    return response.data;
  } catch (error) {
    loading.value = false;
    console.error("Error fetching regions:", error);
    throw error;
  }
};
onMounted(() => {
  getFaq();
});
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
