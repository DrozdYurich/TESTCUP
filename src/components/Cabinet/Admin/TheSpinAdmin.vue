<template>
  <div class="vip-card">
    <div v-if="loading" class="progressbar-wrapper">
      <ProgressBar
        class="custom-progressbar"
        mode="indeterminate"
        style="height: 5px"
      />
    </div>
    <h2
      class="vip-title flex items-center text-[var(--card-color-content)] text-4xl"
    >
      <i class="pi pi-crown mr-3 text-[var(--card-color-content)]"></i>
      Ваш статус:
      {{
        data == 1
          ? "Бронза"
          : data == 2
          ? "Серебро"
          : data == 3
          ? "Золото"
          : "Не активен"
      }}
    </h2>

    <!-- Блок текущего уровня -->
    <div
      class="level-info p-4 mb-4 rounded-lg bg-[var(--card-background-color)] border-l-4 border-[var(--card-border-left)]"
    >
      <h4>Бонусы текущего уровня:</h4>
      <ul class="mt-2 space-y-1">
        <li class="text-[var(--card-subtext-color)]">•{{ vip.describe }}</li>
      </ul>
    </div>
    <div
      class="level-info p-4 mb-4 rounded-lg bg-[var(--card-background-color)] border-l-4 border-[var(--card-border-left)]"
    >
      <h4>Бонусы следующего уровня:</h4>
      <ul class="mt-2 space-y-1">
        <li class="text-[var(--card-subtext-color)]">•{{ vip1.describe }}</li>
      </ul>
    </div>
    <div
      v-if="nextLevel"
      class="level-next p-4 mb-4 rounded-lg bg-[var(--card-background-color)] border-l-4 border-[var(--card-border-left)]"
    >
      <h4>Условия повышения:</h4>
      <p class="mt-2 text-[var(--card-subtext-color)]">
        {{ vip1.requierments }}
      </p>
    </div>

    <!-- Кнопка купить (если уровень < 3) -->
    <div v-if="currentLevel < 3" class="buy-button mt-6 flex justify-center">
      <button
        :disabled="loading"
        @click="upgradeVip"
        class="px-6 py-3 font-bold rounded-lg transition-transform hover:scale-105"
      >
        Купить VIP за
        {{ data == 1 ? 1500 : data == 2 ? 5000 : data == 3 ? 15000 : 100000 }} P
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "@/stores/useUserStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { useToastStore } from "@/stores/useToastStore";
import { storeToRefs } from "pinia";
import { useVipStore } from "@/stores/useVipStore";
import { ProgressBar } from "primevue";
import { useBalansStore } from "@/stores/usebalanceStore";
const { getvip, getvip1 } = storeToRefs(useVipStore());
const balanceStore = useBalansStore();
const toastStore = useToastStore();
const { getUser } = storeToRefs(useUserStore());
// Текущий уровень пользователя
const currentLevel = ref(2); // Пример: пользователь на уровне 2
const { getTokenAccsess } = storeToRefs(useAuthStore());
const vip = computed(() => getvip.value);
const vip1 = computed(() => getvip1.value);
const token = computed(() => getTokenAccsess.value);
const levels = {
  1: {
    name: "Bronze",
    bonuses: ["+5% к выигрышу", "Доступ к закрытым лотереям"],
    requirement: "Сделайте 10 ставок",
  },
  2: {
    name: "Silver",
    bonuses: ["+10% к выигрышу", "Эксклюзивные подарки раз в месяц"],
    requirement: "Пополните баланс на 5000 монет",
  },
  3: {
    name: "Gold",
    bonuses: ["+20% к выигрышу", "Персональный менеджер", "VIP события"],
    requirement: "Доступен только по приглашению",
  },
};
const loading = ref();
const data = ref();
const price = ref();
const levelData = computed(() => levels[currentLevel.value] || {});
const nextLevel = computed(() => levels[currentLevel.value + 1] || null);
const getCup = async () => {
  try {
    loading.value = true;
    const response = await axios.patch(
      `http://10.8.0.23:8000/auth/users/me/`,
      { vip_level: vip1.value.id },
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json",
        },
      }
    );
    data.value = response.data.vip_level;
    price.value = response.data.price;
    toastStore.showSuccessToast("Вы успешно повысили уровень");
    console.log(response.data);
    console.log(data.value, "data");
    // vipStore.setvip(response.data);
    loading.value = false;
    return response.data;
  } catch (error) {
    toastStore.showErrorToast("Произошла системная ошибка");
    loading.value = false;
    console.error("Error fetching regions:", error);
    throw error;
  }
};
const getBalans = async () => {
  try {
    loading.value = true;
    const response = await axios.patch(
      "http://10.8.0.23:8000/balance/",
      {
        action: "out",
        value_type: "virtual",
        value:
          data.value == 1
            ? 1500
            : data.value == 2
            ? 5000
            : data.value == 3
            ? 15000
            : 100000,
      },
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json",
        },
      }
    );
    balanceStore.setbalanse({
      balance: response.data.new_balance,
      balance_virtual: response.data.new_virtual_balance,
    });
    console.log(response.data);
    loading.value = false;
    return response.data;
  } catch (error) {
    loading.value = false;
    console.error("Error fetching regions:", error);
    throw error;
  }
};
const user = computed(() => getUser.value);
const upgradeVip = async () => {
  await getCup();
  await getBalans();
};
const level = computed(() => {
  if (data.value.vip_level == 0) {
    return "Не активен";
  } else if (data.value.vip_level == 1) {
    return "Бронза";
  } else if (data.value.vip_level == 2) {
    return "Серебро";
  } else {
    return "Золото";
  }
});
onMounted(() => {
  data.value = user.value.vip_level;
  console.log(data.value, "fgfg");
});
</script>

<style scoped>
.vip-card {
  background-color: var(--card-background-color);
  color: var(--text-color);
  border-left: 6px solid var(--card-border-left);
  padding: 2.5rem;
  border-radius: 1.5rem;
  box-shadow: var(--box-shadow);
  max-width: 700px;
  margin: auto;
}

.vip-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
  color: var(--card-color-content);
}

.level-badge {
  background-color: var(--card-color-content);
  color: black;
  padding: 0.4rem 1rem;
  border-radius: 0.5rem;
  display: inline-block;
  font-weight: bold;
  font-size: 1.1rem;
}

.level-name {
  font-size: 1.5rem;
  margin-top: 0.5rem;
}

.buy-button button {
  background-color: var(--button-bg);
  color: black;
  border: none;
  font-size: 1.1rem;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.buy-button button:hover {
  background-color: gold;
}
</style>
