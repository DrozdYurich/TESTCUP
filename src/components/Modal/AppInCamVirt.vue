<template>
  <div class="replenish-container">
    <div class="replenish-card">
      <Divider align="center" type="solid">
        <span class="text-xl font-bold text-[var(--text-color)]">
          Пополнение виртуального баланса
        </span>
      </Divider>
      <Form
        :initialValues="initialValues"
        :resolver="resolver"
        @submit="onSubmit"
        class="flex flex-col gap-4 w-full"
      >
        <FormField v-slot="$field" name="virt" class="flex flex-col gap-1">
          <FloatLabel variant="on"
            ><InputText
              class="w-full"
              type="text"
              v-model="initialValues.rub"
              id="rub"
            />
            <label for="rub">Сумма обмена</label>
          </FloatLabel>

          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</Message
          >
        </FormField>
        {{ virtualAmount }}
        <Button
          label="Перевести "
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
import {
  Button,
  Divider,
  FloatLabel,
  InputNumber,
  InputText,
  Message,
} from "primevue";

const loading = ref(false);
const exchangeRate = ref(0.5);

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

function onSubmit() {
  console.log("Пополнение на", formData.value.amountRub, "RUB");
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 1000);
}
</script>

<style scoped>
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
