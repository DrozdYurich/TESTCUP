<template>
  <div class="lottery-card mb-2.5">
    <div class="lottery-field">
      <label for="title" class="lottery-label">Название</label>
      <InputText
        id="title"
        v-model="editableLottery.title"
        class="lottery-input"
      />
    </div>
    <div class="lottery-field">
      <label for="edition" class="lottery-label">Начальный призовой фонд</label>
      <InputText
        id="edition"
        v-model="editableLottery.base_fund"
        class="lottery-input"
      />
    </div>
    <div class="lottery-field">
      <label for="price" class="lottery-label">Цена билета (P)</label>
      <InputNumber
        id="price"
        v-model="editableLottery.ticket_price"
        class="lottery-input"
      />
    </div>
    <div class="lottery-field">
      <label for="winRate" class="lottery-label"
        >Процент средств поступающих в призовой фонд</label
      >
      <InputNumber
        id="winRate"
        v-model="editableLottery.prize_percent"
        class="lottery-input"
        suffix="%"
      />
    </div>
    <div class="save-button-container">
      <Button
        label="Сохранить"
        icon="pi pi-save"
        class="theme-button"
        @click="saveChanges"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { Button, InputText, InputNumber } from "primevue";
import { useAuthStore } from "@/stores/useAuthStore";
import { computed, onMounted, reactive } from "vue";
const { getTokenAccsess } = useAuthStore();
const token = computed(() => {
  return getTokenAccsess;
});
import axios from "axios";
const loading = ref();
const props = defineProps({
  lottery: {
    type: Object,
    required: true,
    default: () => ({
      title: "Лотерея №1",
      edition: "123",
      price: 100,
      winRate: 15,
    }),
  },
});
const editableLottery = ref({ ...props.lottery });
const getLot = async () => {
  try {
    console.log(token.value, "token");
    loading.value = true;
    const response = await axios.put(
      `http://10.8.0.23:8001/lotteries/${props.lottery.id}/`,
      editableLottery.value,
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

const saveChanges = () => {
  console.log("Сохраняем данные:", editableLottery.value);
  getLot();
};
</script>

<style scoped>
.lottery-card {
  background-color: var(--card-background-color);
  border: 1px solid var(--card-border-color);
  border-radius: 12px;
  box-shadow: var(--box-shadow);
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.lottery-card:hover {
  box-shadow: 0 8px 16px rgba(255, 215, 0, 0.3);
}

.lottery-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.lottery-label {
  font-size: 0.875rem;
  color: var(--card-subtext-color);
  margin-bottom: 0.25rem;
}

.lottery-input {
  background-color: transparent !important;
  color: var(--text-color);
  border: none;
  border-bottom: 1px solid var(--card-subtext-color);
  border-radius: 0;
  padding: 0.5rem 0;
  font-size: 1rem;
}

/* Стиль кнопки */
.theme-button {
  background-color: var(--card-border-color);
  color: #000;
  border: none;
  transition: all 0.3s ease;
}

.theme-button:hover {
  filter: brightness(90%);
}
</style>
