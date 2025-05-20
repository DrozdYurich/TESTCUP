<template>
  <div class="replenish-container">
    <div class="replenish-card">
      <div v-if="loading" class="progressbar-wrapper">
        <ProgressBar
          class="custom-progressbar"
          mode="indeterminate"
          style="height: 5px"
        />
      </div>

      <!-- Заголовок -->
      <Divider align="center" type="solid">
        <span
          class="text-xl font-bold text-[var(--text-color)] bg-[var(--background-color)]"
        >
          Вывод денег
        </span>
      </Divider>

      <Form
        @submit="onSubmit"
        :initial-values="initialValues"
        class="flex flex-col gap-4 w-full"
      >
        <FormField v-slot="$field" name="card" class="flex flex-col gap-1">
          <FloatLabel variant="on">
            <Select
              v-model="selectedCard"
              :options="cards"
              optionLabel="label"
              optionValue="value"
              id="card"
              class="w-full input-field"
            >
              <!-- Кастомное отображение -->
              <template #option="slotProps">
                <div class="flex items-center gap-2">
                  <span>{{ slotProps.option.bank }}</span>
                  <span class="text-sm text-[var(--card-subtext-color)]">
                    •••• {{ getLastFourDigits(slotProps.option.cardNumber) }}
                  </span>
                </div>
              </template>
            </Select>
            <label for="card">Выберите карту</label>
          </FloatLabel>
          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $field.error?.message }}
          </Message>
        </FormField>
        <FormField v-slot="$field" name="amount" class="flex flex-col gap-1">
          <FloatLabel variant="on">
            <InputText
              id="amount"
              v-model="amount"
              mode="currency"
              currency="RUB"
              locale="ru"
              class="w-full input-field"
            />
            <label for="amount">Сумма вывода</label>
          </FloatLabel>
          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $field.error?.message }}
          </Message>
        </FormField>
        <Button
          label="Вывести"
          icon="pi pi-credit-card"
          class="theme-button w-full"
          type="submit"
          :disabled="loading"
        />
      </Form>
    </div>
  </div>
</template>

<script setup>
import * as yup from "yup";
import { yupResolver } from "@primevue/forms/resolvers/yup";
import { storeToRefs } from "pinia";

import { computed, inject, onMounted, ref } from "vue";
import { Form, FormField } from "@primevue/forms";
import { usePlatezhStore } from "@/stores/usePlatezhStore";
import { useToastStore } from "@/stores/useToastStore";
const balanceStore = useBalansStore();
const plStore = usePlatezhStore();
const toastStore = useToastStore();
import {
  Button,
  Divider,
  FloatLabel,
  InputNumber,
  InputText,
  Message,
  ProgressBar,
  Select,
} from "primevue";
import axios from "axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useBalansStore } from "@/stores/usebalanceStore";
const dialogRef = inject("dialogRef");
const selectedCard = ref(null);
const amount = ref(100);
const loading = ref(false);
function closeDialog() {
  dialogRef.value.close();
}

const { getTokenAccsess } = storeToRefs(useAuthStore());
const token = computed(() => getTokenAccsess.value);
const getBalansOut = async () => {
  try {
    loading.value = true;
    const response = await axios.patch(
      "http://10.8.0.23:8000/balance/",
      { action: "out", value_type: "real", value: amount.value },
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
const initialValues = ref({
  card: "",
  amount: 100,
});
const { getCarts } = storeToRefs(usePlatezhStore());
const cards = computed(() => {
  return getCarts.value.map((card) => ({
    ...card,
    label: `${card.bank || "Карта"} •••• ${getLastFourDigits(card.cardNumber)}`,
    value: card.cardNumber,
  }));
});
function getLastFourDigits(cardNumber) {
  if (!cardNumber) return "";
  const cleaned = cardNumber.replace(/\D/g, "");
  return cleaned.slice(-4);
}

const schema = ref(
  yup.object().shape({
    card: yup.string().required("Выберите карту"),
    amount: yup
      .number()
      .min(10, "Минимальная сумма — 10 P")
      .required("Введите сумму"),
  })
);

const resolver = ref(yupResolver(schema.value));
const onSubmit = async (formData) => {
  if (formData.valid && !loading.value) {
    loading.value = true;
    try {
      console.log("Форма валидна. Отправляем данные:", formData.values);
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      await getBalansOut();
      toastStore.showSuccessToast(
        `Вы успешно вывели сумму: ${formData.values.amount} P`
      );
      closeDialog();
    } catch (e) {
      toastStore.showErrorToast("Ошибка", "Не удалось вывести деньги");
    } finally {
      loading.value = false;
    }
  }
};
</script>

<style scoped>
.replenish-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}
label {
  background-color: transparent;
}
.replenish-card {
  background-color: var(--card-background-color);
  border: 1px solid var(--card-border-color);
  border-radius: 12px;
  box-shadow: var(--box-shadow);
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.replenish-card:hover {
  box-shadow: 0 8px 16px rgba(255, 215, 0, 0.3);
}

.progressbar-wrapper {
  margin-bottom: 1rem;
}

.input-field {
  background-color: transparent !important;
  color: var(--text-color);
  border: none;
  border-bottom: 1px solid var(--card-subtext-color);
  border-radius: 0;
  padding: 0.5rem 0;
}

.p-float-label label {
  color: var(--card-subtext-color);
}

.p-float-label input:focus ~ label,
.p-float-label select:focus ~ label {
  color: var(--card-border-color);
}

.theme-button {
  background-color: var(--card-border-color);
  color: #000;
  border: none;
  transition: all 0.3s ease;
}

.theme-button:hover {
  filter: brightness(90%);
}

.theme-button:disabled {
  opacity: 0.5;
}
</style>
