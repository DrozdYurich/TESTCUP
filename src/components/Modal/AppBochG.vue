<template>
  <div class="p-4">
    <h2 class="text-3xl font-bold mb-2 text-[var(--text-color)]">Бочонки</h2>
    <strong class="text-2xl">Описание:</strong>
    <p class="text-[var(--text-color)]">
      Вашей космической команде брошен вызов. На конкурсе лучшей ракеты вы
      должны показать самую инновационную ракету. Но для ее улучшения требуются
      монеты. Так давайте же, в комсмос за монетами.
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
