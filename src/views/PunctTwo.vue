<template>
  <div class="container">
    <h1 class="text-3xl mt-1 mb-2 font-bold">Новости</h1>
    <AppNews v-for="(news, index) in newsList" :key="index" :item="news" />
  </div>
</template>

<script setup>
import AppNews from "@/components/News/AppNews.vue";

const newsList = [
  {
    title: "Рекордный выигрыш в «Золотом ключе»",
    summary:
      "Сегодня был разыгран рекордный призовой фонд лотереи «Золотой ключ»",
    category: "Лотереи",
    date: new Date("2025-04-05"),
    image:
      "https://pic.rutubelist.ru/user/dc/d1/dcd1b6eb3781ece3662c6e404f882aff.jpg",
    route: "/news/1",
  },
  {
    title: "Как правильно выбрать номера?",
    summary: "Попробуйте простые стратегии повышения шансов на победу",
    category: "Советы",
    date: new Date("2025-04-01"),
    image:
      "https://pic.rutubelist.ru/user/dc/d1/dcd1b6eb3781ece3662c6e404f882aff.jpg",
    route: "/news/2",
  },
];
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
