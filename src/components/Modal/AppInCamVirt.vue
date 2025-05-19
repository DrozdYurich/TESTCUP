<template>
  <div class="replenish-container">
    <div class="replenish-card">
      <!-- Заголовок -->
      <div v-if="loading" class="progressbar-wrapper">
        <ProgressBar
          class="custom-progressbar"
          mode="indeterminate"
          style="height: 5px"
        />
      </div>
      <Divider align="center" type="solid">
        <span
          class="text-xl font-bold text-[var(--text-color)] bg-[var(--background-color)]"
        >
          Пополнение виртуального баланса
        </span>
      </Divider>

      <!-- Форма пополнения -->
      <Form
        :initialValues="initialValues"
        :resolver="resolver"
        @submit="onSubmit"
        class="flex flex-col gap-4 w-full"
      >
        <!-- Поле ввода суммы -->
        <FormField v-slot="$field" name="rub" class="flex flex-col gap-1">
          <FloatLabel variant="on">
            <InputText
              id="rub"
              v-model="initialValues.rub"
              class="w-full input-field"
              placeholder="0"
            />
            <label for="rub" class="bg-[var(--background-color)]"
              >Сумма в рублях</label
            >
          </FloatLabel>

          <!-- Сообщение об ошибке -->
          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
          >
            {{ $field.error?.message }}
          </Message>
          <div class="conversion-preview mt-2">
            <span class="text-[var(--text-color)]">Вы получите:</span>
            <strong class="ml-1">{{ virtualAmount }} виртуальной валюты</strong>
          </div>
        </FormField>

        <!-- Кнопка отправки -->
        <Button
          label="Перевести виртуальную валюту"
          icon="pi pi-wallet"
          class="theme-button w-full"
          type="submit"
          :disabled="loading"
        />
      </Form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import * as yup from "yup";
import { yupResolver } from "@primevue/forms/resolvers/yup";
import { Form, FormField } from "@primevue/forms";
import { useToastStore } from "@/stores/useToastStore";
import {
  Button,
  Divider,
  FloatLabel,
  InputText,
  Message,
  ProgressBar,
} from "primevue";
import { inject } from "vue";
const dialogRef = inject("dialogRef");
const toastStore = useToastStore();
function closeDialog() {
  dialogRef.value.close();
}
const loading = ref(false);
const exchangeRate = ref(0.05);

const initialValues = reactive({
  rub: 100,
});
const virtualAmount = computed(() => {
  return Math.floor(initialValues.rub * exchangeRate.value);
});

const schema = yup.object().shape({
  rub: yup
    .number()
    .typeError("Введите корректную сумму")
    .min(10, "Минимальная сумма — 10 ₽")
    .required("Укажите сумму"),
});

const resolver = yupResolver(schema);

async function onSubmit() {
  console.log("Пополнение на", virtualAmount.value, "virt");
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 2000));
  toastStore.showSuccessToast(
    `Баланс виртуальной валюты пополнен на ${virtualAmount.value} `
  );
  closeDialog();
}
</script>

<style>
label {
  background-color: transparent;
}
.p-divider-content {
  border: none;
  background: transparent;
}
.replenish-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
}

.replenish-card {
  background-color: var(--card-background-color);
  border: 1px solid var(--card-border-color);
  border-radius: 16px;
  box-shadow: var(--box-shadow);
  padding: 2rem;
  transition: all 0.3s ease;
}

.replenish-card:hover {
  box-shadow: 0 8px 20px rgba(255, 215, 0, 0.3);
}

.input-field {
  background-color: transparent !important;
  color: var(--text-color);
  border: none;
  border-bottom: 1px solid var(--card-subtext-color);
  font-size: 1.1rem;
  padding: 0.5rem 0;
  width: 100%;
}

.p-float-label label {
  color: var(--card-subtext-color);
  font-size: 0.9rem;
}

.p-float-label input:focus ~ label {
  color: var(--card-border-color);
  font-weight: bold;
}

.conversion-preview {
  font-size: 0.9rem;
  color: var(--card-subtext-color);
  background-color: #1a1a1a;
  border-left: 3px solid var(--card-border-color);
  padding-left: 1rem;
  margin-top: 0.5rem;
  border-radius: 6px;
}

.conversion-preview strong {
  color: var(--card-border-color);
  font-weight: bold;
}

.theme-button {
  background-color: var(--card-border-color);
  color: #000;
  border: none;
  padding: 0.75rem 1rem;
  font-weight: bold;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
}

.theme-button:hover {
  filter: brightness(90%);
}

.theme-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.replenish-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
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

.p-float-label input:focus ~ label {
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
