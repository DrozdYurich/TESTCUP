<template>
  <div class="p-4">
    <h2 class="text-3xl font-bold mb-2 text-[var(--text-color)]">Карта</h2>
    <strong class="text-2xl">Описание:</strong>
    <p class="text-[var(--text-color)]">
      Дорогой капитан, нам дали особое задание - забрать особого гостя. Но увы
      нам не сообщили от куда. Мы должны попытать удачу и забрать его. Но если у
      нас не получиться, то мы должны его встретить в нужном регионе. От куда и
      куда мы политим, мой капитан?
    </p>
    <p>
      <strong class="text-xl">Правила игры:</strong> вы ставите свою ставку и
      выбираете 2 региона. Далее вы нажимаете на кнопку "Сделать ставку".
      Мнгновенный выигрыш или проигрыш.
    </p>
    <button
      @click="goToStar"
      class="mt-4 bg-yellow-500 text-black px-4 py-2 rounded"
    >
      Играть
    </button>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
import { inject } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const dialogRef = inject("dialogRef");
function goToStar() {
  dialogRef.value.close();
  router.push({ name: "cart" });
}
</script>
