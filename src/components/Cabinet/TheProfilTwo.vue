<template>
  <div class="w-full px-6 py-8">
    <h1 class="text-4xl p-5 font-bold text-center">Ваша статистика</h1>
    <div class="statistic">
      <TheCountLotery
        class="count"
        title="Участие в лотереях"
        :value="stat?.total_count"
        severity="info"
      />
      <TheCountLotery
        class="many"
        title="Ваш выигрыш"
        :value="stat?.total_prize_amount + ' P'"
        severity="success"
      />
      <TheCountLotery
        class="win"
        title="Вы выиграли"
        :value="stat?.status_counts.partial_winner"
        severity="warning"
      />
      <TheCountLotery
        class="grand"
        title="Количество супер призов"
        :value="stat?.status_counts.winner"
        severity="danger"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import TheCountLotery from "./statictic/TheCountLotery.vue";
const stat = ref();
onMounted(() => {
  stat.value = JSON.parse(localStorage.getItem("stat"));
});
</script>

<style scoped>
.statistic {
  display: grid;
  grid-template-areas:
    "count many many"
    "win win grand";
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
.many {
  grid-area: many;
}
.count {
  grid-area: count;
}
.win {
  grid-area: win;
}
.grand {
  grid-area: grand;
}
</style>
