<template>
  <div class="card">
    <h1 class="text-3xl font-bold mb-3 mt-1">Лотереи</h1>
    <div class="container w-full">
      <CardInfo
        data-aos="fade-up"
        data-aos-anchor-placement="top-center"
        v-for="n in loter"
        :key="n.id"
        :title="n.title"
        :subtitle="n.subtitle"
        :border-width="'1px'"
        class="cardinf"
        style="
          --card-bg: var(--card-background-color);
          --card-border: var(--card-border-color);
          --card-text: var(--text-color);
          --card-subtext: var(--card-subtext-color);
        "
      >
        <template #header>
          <img
            alt="user header"
            src="https://primefaces.org/cdn/primevue/images/usercard.png"
          />
        </template>
        <template #content>
          <div class="w-full flex justify-between">
            <p class="text-[var(--text-color)]">
              Конец розыгрыша:{{ formatDate(n.end_date) }}
            </p>
            <Tag
              class="h-1/6"
              :icon="!n.is_finished ? 'pi pi-check' : 'pi pi-times'"
              :severity="!n.is_finished ? 'success' : 'danger'"
              :value="!n.is_finished ? 'Идет' : 'Завершено'"
            ></Tag>
          </div>
          <div class="w-full flex justify-between">
            <p class="text-[var(--text-color)]">Призовой фонд:</p>
            <Tag
              class="h-1/6"
              severity="contrast"
              :value="n.prize_fund + 'P'"
            ></Tag>
          </div>
          <div class="w-full flex justify-between mt-1.5">
            <p class="text-[var(--text-color)]">Цена билета:</p>
            <Tag
              class="h-1/6"
              severity="info"
              :value="n.ticket_price + 'P'"
            ></Tag>
          </div>
          <div class="w-full flex justify-between mt-1.5">
            <p class="text-[var(--text-color)]">Продано билетов:</p>
            <Tag class="h-1/6" severity="warn" va :value="n.tickets_sold"></Tag>
          </div>
        </template>
        <template #footer>
          <Button
            @click="showDialogProduct"
            style="background-color: var(--button-bg); border: none"
            >Открыть модальное окно</Button
          >
        </template>
      </CardInfo>
    </div>
    <Button
      v-if="scrollY > 100"
      class="fixed bottom-3 right-3 z-50"
      icon="pi pi-arrow-up"
      severity="secondary"
      rounded
      size="large"
      @click="goToHead"
    >
    </Button>
  </div>
</template>

<script setup>
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
const { showDialogProduct } = useModalMethods();
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
const resetFilter = () => {
  searchSubtitle.value = "";
  searchTitle.value = "";
  status.value = "";
};
const loading = ref();
const loter = ref();
const goToHead = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
const getLoters = async () => {
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
    loading.value = false;
    return response.data;
  } catch (error) {
    loading.value = false;
    console.error("Error fetching regions:", error);
    throw error;
  }
};
onMounted(() => {
  getLoters();
});
</script>

<style scoped>
.card {
  width: 90vw;
  max-width: 1400px;
  margin: 0 auto;
}

.container {
  margin: 0 auto;
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 100%;
}

.cardinf {
  flex: 1 1 25%;
  min-width: 300px;
  max-width: 400px;
  box-sizing: border-box;
}
@media (max-width: 600px) {
  .card {
    width: 90vw;
  }
}
</style>
