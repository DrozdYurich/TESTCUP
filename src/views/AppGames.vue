<template>
  <div class="card">
    <h1 class="text-3xl font-bold mb-3 mt-1">Мини игры</h1>

    <div class="container w-full wrap-normal">
      <div class="game-card">
        <img
          src="@/assets/img/star.jpg"
          alt="Название игры"
          class="game-image"
        />
        <h3 class="game-title">Star track</h3>
        <Button severity="warn" @click="showDialogList"> Подробнее </Button>
      </div>
    </div>
    <Button
      v-show="scrollY > 100"
      icon="pi pi-arrow-up"
      severity="secondary"
      rounded
      size="large"
      class="fixed bottom-4 right-4 z-50 shadow-lg transition-opacity duration-300 hover:bg-gray-800"
      @click="goToHead"
    />
  </div>
</template>

<script setup>
import img from "@/assets/img/star.jpg";
import Button from "primevue/button";
import useModalMethods from "@/components/Modal/MethodsModal/methods";
import CardInfo from "@/components/CardInfo.vue";
import AppFilter from "@/components/AppFilter.vue";
import items from "../../public/data";
import { computed, onMounted, ref } from "vue";
import useScrollY from "@/components/Utility/useScrollY";
import { Tag } from "primevue";
import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";
import { storeToRefs } from "pinia";
import { useLoteryStore } from "@/stores/useLoteryStore";
const loteryStore = useLoteryStore();
const { showDialogList } = useModalMethods();
const searchTitle = ref("");
const { getTokenAccsess } = storeToRefs(useAuthStore());
const token = computed(() => {
  return getTokenAccsess.value;
});
const searchSubtitle = ref("");
const status = ref("");
const { scrollY } = useScrollY();
const filteredItems = computed(() => {
  return items.filter((it) => {
    const matchesTitle = it.title
      .toLowerCase()
      .includes(searchTitle.value.toLowerCase());
    const matshSubTitle = it.subtitle
      .toLowerCase()
      .includes(searchSubtitle.value.toLowerCase());
    const matshStatus = status.value ? it.status === status.value : true;
    return matchesTitle && matshSubTitle && matshStatus;
  });
});
function formatDate(dateString) {
  const date = new Date(dateString);

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };

  const formattedDate = date.toLocaleDateString("ru-RU", options);
  const formattedTime = date.toLocaleTimeString("ru-RU", timeOptions);

  return `${formattedDate}, ${formattedTime}`;
}
const loading = ref();
const loter = ref();
const goToHead = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
const getGames = async () => {
  try {
    loading.value = true;
    const response = await axios.get("http://10.8.0.23:8001/lotteries/", {
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    loter.value = response.data;
    loteryStore.setLotery(loter.value);
    loading.value = false;
    return response.data;
  } catch (error) {
    loading.value = false;
    console.error("Error fetching regions:", error);
    throw error;
  }
};
onMounted(() => {
  getGames();
});
</script>

<style scoped>
.game-card {
  font-family: var(--font-family);
  background-color: var(--card-background-color);
  border-radius: 10px;
  box-shadow: var(--box-shadow);
  padding: 2rem;
  text-align: center;
  max-width: 500px;
  width: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  color: var(--text-color);
  border-left: 4px solid var(--card-border-left); /* Золотая полоска слева */
}

.game-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 28px rgba(255, 215, 0, 0.2);
}

.game-image {
  width: 100%;
  border-radius: var(--border-radius);
  margin-bottom: 1.5rem;
  object-fit: cover;
  height: 240px;
  transition: transform 0.3s ease;
  border: 2px solid var(--card-border-color); /* Золотая рамка */
}

.game-card:hover .game-image {
  transform: scale(1.02);
}

.game-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  color: var(--card-text-color);
  line-height: 1.4;
}
.p-button {
  background-color: var(--button-bg); /* Золото */
  color: #000; /* Чёрный текст */
  border: none;
  border-radius: var(--border-radius);
  padding: 0.6rem 1.5rem;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.p-button:hover {
  background-color: #e6c200; /* Темнее золото при наведении */
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
}
</style>
