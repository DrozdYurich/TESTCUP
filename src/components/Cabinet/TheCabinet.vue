<template>
  <div
    class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
  >
    <AppHistory
      data-aos="fade-up"
      data-aos-anchor-placement="top-center"
      v-for="n in history?.participants"
      :key="n.id"
      class="w-full"
      :title="n.lottery_title"
      :status="n.status"
      :prize="n.prize_amount"
      :number="n.ticket_number"
    />
  </div>
</template>

<script setup>
import AppHistory from "./history/AppHistory.vue";
import axios from "axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { computed, onMounted, ref } from "vue";
const { getTokenAccsess } = useAuthStore();
const token = computed(() => {
  return getTokenAccsess;
});

const loading = ref();
const history = ref();
const gethistory = async () => {
  try {
    console.log(token.value, "token");
    loading.value = true;
    const response = await axios.get("http://10.8.0.23:8001/participants/", {
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    history.value = response.data;
    localStorage.setItem("part", JSON.stringify(history.value.participants));
    localStorage.setItem("stat", JSON.stringify(history.value.stats));
    loading.value = false;
    return response.data;
  } catch (error) {
    loading.value = false;
    console.error("Error fetching regions:", error);
    throw error;
  }
};

onMounted(() => {
  gethistory();
});
</script>
<style scoped>
::v-deep .p-paginator-page-selected {
  background-color: var(--checked-color) !important;
  color: rgb(255, 255, 255) !important;
}
.fade-enter-active {
  animation: in 0.4s ease;
}
.fade-leave-active {
  animation: out 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
@keyframes in {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes out {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100px);
  }
}
</style>
