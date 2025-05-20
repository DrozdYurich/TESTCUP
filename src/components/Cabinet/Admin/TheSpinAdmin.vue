<template>
  <div class="vip-card">
    <!-- Заголовок -->
    <h2
      class="vip-title flex items-center text-[var(--card-color-content)] text-4xl"
    >
      <i class="pi pi-crown mr-3 text-[var(--card-color-content)]"></i>
      Ваш статус: VIP
    </h2>

    <!-- Блок текущего уровня -->
    <div
      class="level-current p-4 mb-4 rounded-lg bg-[var(--card-background-color)] border-l-4 border-[var(--card-color-content)]"
    >
      <div class="level-badge">{{ currentLevel }} уровень</div>
      <h3 class="level-name mt-2">{{ levelData.name }}</h3>
    </div>
    <div
      class="level-info p-4 mb-4 rounded-lg bg-[var(--card-background-color)] border-l-4 border-[var(--card-border-left)]"
    >
      <h4>Бонусы:</h4>
      <ul class="mt-2 space-y-1">
        <li
          v-for="(bonus, index) in levelData.bonuses"
          :key="index"
          class="text-[var(--card-subtext-color)]"
        >
          • {{ bonus }}
        </li>
      </ul>
    </div>

    <!-- Условия следующего уровня -->
    <div
      v-if="nextLevel"
      class="level-next p-4 mb-4 rounded-lg bg-[var(--card-background-color)] border-l-4 border-[var(--card-border-left)]"
    >
      <h4>Условия повышения:</h4>
      <p class="mt-2 text-[var(--card-subtext-color)]">
        {{ nextLevel.requirement }}
      </p>
    </div>

    <!-- Кнопка купить (если уровень < 3) -->
    <div v-if="currentLevel < 3" class="buy-button mt-6 flex justify-center">
      <button
        @click="upgradeVip"
        class="px-6 py-3 font-bold rounded-lg transition-transform hover:scale-105"
      >
        Купить VIP {{ vipLevel }}
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "@/stores/useUserStore";
import { storeToRefs } from "pinia";
const { getUser } = storeToRefs(useUserStore());
// Текущий уровень пользователя
const currentLevel = ref(2); // Пример: пользователь на уровне 2
const vipLevel = computed(() => getUser.value);
const vipData = ref();
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
const levelData = computed(() => levels[currentLevel.value] || {});
const nextLevel = computed(() => levels[currentLevel.value + 1] || null);
const getVIP = async () => {
  try {
    console.log("g", vipLevel.value);
    loading.value = true;
    const response = await axios.get(
      `http://10.8.0.23:8002/vip/${vipLevel.value}/`
    );
    console.log(response.data);
    vipData.value = response.data;
    loading.value = false;
    return response.data;
  } catch (error) {
    loading.value = false;
    console.error("Error fetching regions:", error);
    throw error;
  }
};
onMounted(() => {
  getVIP();
});
const upgradeVip = () => {
  if (currentLevel.value < 3) {
    alert("Вы повысили свой VIP-уровень!");
    currentLevel.value += 1;
  }
};
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
