<template>
  <div class="text-amber-400">
    Home
    <Button @click="removetoken">Выйти</Button>
  </div>
</template>
<script setup>
import { Button } from "primevue";
import AppForm from "../components/Auth/AppForm.vue";
import { useAuthStore } from "@/stores/useAuthStore";
const router = useRouter();
import { useRouter } from "vue-router";

const authSote = useAuthStore();
const removetoken = () => {
  authSote.removeToken();
  router.push("/auth");
};
</script>
<style scoped></style>
