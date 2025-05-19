<template>
  <div class="flex flex-col">
    <h1 class="text-3xl mb-4 font-bold">Администрирование</h1>
    <TheAdminChange
      v-for="loter in lotteries"
      :key="loter.id"
      :lottery="loter"
    />
  </div>
</template>
<script setup>
import axios from "axios";
import TheAdminChange from "./Admin/TheAdminChange.vue";
import { useAuthStore } from "@/stores/useAuthStore";
import { computed, onMounted, reactive, ref } from "vue";
const { getTokenAccsess } = useAuthStore();
const token = computed(() => {
  return getTokenAccsess;
});
const lotteries = ref([]);
const loading = ref();
const getLot = async () => {
  try {
    console.log(token.value, "token");
    loading.value = true;
    const response = await axios.get("http://10.8.0.23:8001/lotteries/", {
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    lotteries.value = response.data;
    loading.value = false;
    return response.data;
  } catch (error) {
    loading.value = false;
    console.error("Error fetching regions:", error);
    throw error;
  }
};

onMounted(() => {
  getLot();
});
</script>

<style></style>
