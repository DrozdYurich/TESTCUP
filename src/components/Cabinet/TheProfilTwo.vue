<template>
  <div class="w-full px-6 py-8">
    <h1 class="text-4xl p-5 font-bold text-center">Ваша статистика</h1>

    <div class="statistic">
      <TheCountLotery
        class="count"
        title="Участие в лотереях"
        value="25"
        severity="info"
      />
      <TheCountLotery
        class="many"
        title="Ваш выигрыш"
        value="1500 P"
        severity="success"
      />
      <TheCountLotery
        class="win"
        title="Вы выиграли"
        value="32"
        severity="warning"
      />
      <TheCountLotery
        class="grand"
        title="Количество супер призов"
        value="7"
        severity="danger"
      />
    </div>
  </div>
</template>

<script setup>
import TheCountLotery from "./statictic/TheCountLotery.vue";
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
