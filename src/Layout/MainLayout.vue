<template>
  <div class="min-h-screen flex flex-col">
    <TheHader />
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </RouterView>
    <TheFooter class="mt-auto" />
  </div>
</template>

<script setup>
import TheFooter from "@/components/Footer/TheFooter.vue";
import TheHader from "@/components/Header/TheHader.vue";
import { useAuthStore } from "@/stores/useAuthStore";
import { useBalansStore } from "@/stores/usebalanceStore";
import { useRoleStore } from "@/stores/useRoleStore";
import { useUserStore } from "@/stores/useUserStore";
import axios from "axios";
import { computed, onMounted, ref } from "vue";
const loading = ref();
const userStore = useUserStore();
const balanseStore = useBalansStore();
const roleStore = useRoleStore();
const { getTokenAccsess } = useAuthStore();
const token = computed(() => {
  return getTokenAccsess;
});
const user = ref();
const getId = async () => {
  try {
    console.log(token.value, "token");
    loading.value = true;
    const response = await axios.get("/auth/auth/users/me/", {
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json",
      },
    });
    user.value = response.data;
    console.log(user.value);
    userStore.setUser(user.value);
    balanseStore.setbalanse({
      balance: user.value.balance,
      balance_virtual: user.value.balance_virtual,
    });
    roleStore.setRole(user.value.is_root);
    loading.value = false;
    return response.data;
  } catch (error) {
    loading.value = false;
    console.error("Error fetching regions:", error);
    throw error;
  }
};
onMounted(() => {
  getId();
});
</script>
<style scoped>
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
