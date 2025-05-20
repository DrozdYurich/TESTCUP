<template>
  <div
    class="flex flex-col md:flex-row gap-6 p-6 bg-[var(--card-background-color)] rounded-xl shadow-md border-l-4 border-[var(--card-border-left)] p-5"
  >
    <!-- Левая часть — описание -->
    <div class="descr flex-1">
      <h1 class="text-4xl text-[var(--text-color)] font-bold mb-4">
        Взлом пароля
      </h1>

      <div class="mb-4">
        <strong class="text-2xl text-[var(--text-color)]">Описание:</strong>
        <p class="mt-2 text-[var(--card-subtext-color)]">
          Вам доверили важное задание - взломать пароль на телефоне шпиона. При
          обыске было найдена записка — "Пароль из 5 линий. Начинается...",
          далее записка была порвана. Шпион оказался крепким и не раскололся.
          Помогите вычислить пароль от телефона шпиона.
        </p>
      </div>

      <div>
        <strong class="text-2xl text-[var(--text-color)]">Как играть:</strong>
        <p class="mt-2 text-[var(--card-subtext-color)]">
          Сначала выберете начало вашего пароля. Далее вы можете выбирать любую
          точку в радиусе 1. Разрешается выбирать уже использованные точки, но
          нельзя использовать уже пройденный маршрут. Всего вы должны выбрать 6
          точек или 5 линий. Удачи!
        </p>
      </div>
    </div>

    <!-- Правая часть — игра -->
    <div class="gm flex-1 flex items-center justify-center">
      <AppPasswordLotery />
    </div>
  </div>
</template>

<script setup>
import AppPasswordLotery from "@/components/games/AppPasswordLotery.vue";
import { useAuthStore } from "@/stores/useAuthStore";
import { useLoteryStore } from "@/stores/useLoteryStore";
import { useToastStore } from "@/stores/useToastStore";
import { useUserStore } from "@/stores/useUserStore";
import axios from "axios";
import { storeToRefs } from "pinia";
import { computed } from "vue";
const { getTokenAccsess } = storeToRefs(useAuthStore());
const { getLotery } = storeToRefs(useLoteryStore());
const toastStore = useToastStore();
const token = computed(() => {
  return getTokenAccsess.value;
});
const { getUser } = storeToRefs(useUserStore());
const id = computed(() => {
  return getUser.value.id;
});
const getCart = async () => {
  try {
    console.log("fdfdf");
    loading.value = true;
    const response = await axios.patch(
      `http://10.8.0.23:8003/game_accounts/${id.value}/`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    loading.value = false;
    return response.data;
  } catch (error) {
    loading.value = false;
    console.error("Error fetching regions:", error);
    throw error;
  }
};
onMounted(async () => {
  await getCart();
});
</script>
<style scoped>
.descr {
  flex: 0.25;
}
.gm {
  flex: 0.7;
}
</style>
