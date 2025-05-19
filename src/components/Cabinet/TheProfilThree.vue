<template>
  <div class="flex flex-col">
    <h1 class="text-3xl mb-4 font-bold">Администрирование</h1>
    <TheAdminChange v-for="loter in lotteries" :lottery="loter" />
  </div>
</template>
<script setup>
import TheAdminChange from "./Admin/TheAdminChange.vue";

import { reactive } from "vue";

const lotteries = reactive([
  {
    id: 1,
    title: "Золотой ключ",
    edition: "LOT-2024",
    price: 100,
    winRate: 15,
  },
  {
    id: 2,
    title: "Большое колесо",
    edition: "LOT-2025",
    price: 50,
    winRate: 10,
  },
  {
    id: 3,
    title: "Джекпот",
    edition: "LOT-2026",
    price: 200,
    winRate: 5,
  },
]);
</script>

<style></style>
