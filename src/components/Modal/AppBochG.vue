<template>
  <div class="p-4">
    <h2 class="text-3xl font-bold mb-2 text-[var(--text-color)]">Бочонки</h2>
    <strong class="text-2xl">Описание:</strong>
    <p class="text-[var(--text-color)]">
      Старинная русская игра - Яблочко. Но в нашем случае это бочонок.
      Продвигайтесь вверх по полю и выигрывайте невероятные призы.
    </p>
    <p>
      <strong class="text-xl">Правила игры:</strong> вы ставите свою ставку и
      нажимаете начать игру. Каждый раунд вы ставите бочонок на каждую линию по
      очереди. Если бочонок упал - вы проиграли, если устоял - вы можете
      продолжить игру или закончить и забрать выигрыш.
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
  router.push({ name: "boch" });
}
</script>
