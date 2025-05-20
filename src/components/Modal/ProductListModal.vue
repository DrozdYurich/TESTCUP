<template>
  <div class="p-4">
    <h2 class="text-3xl font-bold mb-2 text-[var(--text-color)]">
      Взлом пароля
    </h2>
    <strong class="text-2xl">Описание:</strong>
    <p class="text-[var(--text-color)]">
      Вам доверили важное задание - взломать пароль на телефона шпиона. При
      обыске было найдена записка - "Пароль из 5 линий. Начинается...", далее
      записка была порвана. Шпион оказался крепким и не раскололся. Помогите
      вычислить пароль от телефона шпиона.
    </p>

    <button
      @click="goToGame"
      class="mt-4 bg-yellow-500 text-black px-4 py-2 rounded"
    >
      Играть
    </button>
  </div>
</template>
<script setup>
import { computed, defineProps } from "vue";
import { inject } from "vue";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
const { getTokenAccsess } = storeToRefs(useAuthStore());
const isAuth = computed(() => getTokenAccsess.value);
const router = useRouter();
const dialogRef = inject("dialogRef");
function goToGame() {
  if (isAuth) {
    dialogRef.value.close();
    router.push({ name: "lottery" });
  } else {
    dialogRef.value.close();
    router.push({ name: "login" });
  }
}
</script>
