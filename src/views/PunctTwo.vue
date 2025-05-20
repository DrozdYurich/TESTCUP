<template>
  <div class="container">
    <h1 class="text-3xl mt-1 mb-2 font-bold">Новости</h1>
    <AppNews
      data-aos="fade-up"
      data-aos-anchor-placement="top-center"
      v-for="(news, index) in news"
      :key="index"
      :item="news"
    />
  </div>
</template>

<script setup>
import AppNews from "@/components/News/AppNews.vue";
import axios from "axios";
import { onMounted, ref } from "vue";

const loading = ref();
const news = ref();
const getFaq = async () => {
  try {
    loading.value = true;
    const response = await axios.get("http://10.8.0.23:8002/news/");
    console.log(response.data);
    news.value = response.data;
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
<style scoped>
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
