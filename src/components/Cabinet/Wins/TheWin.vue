<template>
  <TheWinsMe title="Мои награды" value="12" severity="success" />
</template>

<script setup>
import axios from "axios";
import TheWinsMe from "./TheWinsMe.vue";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUserStore } from "@/stores/useUserStore";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
const { getUser } = storeToRefs(useUserStore());
const wins = ref();
const loading = ref();
const user = computed(() => {
  return getUser.value;
});
const getWins = async () => {
  try {
    loading.value = true;
    const response = await axios.get("/info/user-achivments/", user.value.id);
    wins.value = response.data;
    console.log(wins.value);
    loading.value = false;
    return response.data;
  } catch (error) {
    loading.value = false;
    console.error("Error fetching regions:", error);
    throw error;
  }
};

onMounted(() => {
  getWins();
});
</script>
