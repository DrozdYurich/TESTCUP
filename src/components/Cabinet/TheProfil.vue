<template>
  <div class="koshel">
    <h1 class="h1 text-3xl font-bold">Мой кошелёк</h1>
    <TheBalance class="my" />
    <TheCartPlatezh class="plat" />
  </div>
</template>

<script setup>
import TheBalance from "../Platezh/TheBalance.vue";
import TheCartPlatezh from "../Platezh/TheCartPlatezh.vue";
</script>

<style scoped>
.koshel {
  display: grid;
  grid-template-columns: 1fr 2fr; /* Соотношение колонок 1:2 */
  grid-template-rows: auto 1fr; /* Заголовок и контент */
  grid-template-areas:
    "h1 h1"
    "my plat";
  gap: 1rem;
}

.h1 {
  grid-area: h1;
  margin: 0;
}

.my {
  grid-area: my;
}

.plat {
  grid-area: plat;
}

@media (max-width: 650px) {
  .koshel {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
}
</style>
