<template>
  <div class="payment-card-container">
    <div class="cards-wrapper">
      <div v-if="loading" class="progressbar-wrapper">
        <ProgressBar mode="indeterminate" style="height: 5px" />
      </div>
      <Divider align="center" type="solid">
        <span class="text-xl font-bold text-[var(--text-color)]"
          >Добавить карту</span
        >
      </Divider>
      <Form
        :initialValues="initialValues"
        :resolver="resolver"
        @submit="onSubmit"
        class="card-form"
      >
        <FormField v-slot="$field" name="bank" class="flex flex-col gap-1">
          <FloatLabel variant="on">
            <InputText
              id="bank"
              v-model="initialValues.bank"
              class="w-full input-field"
            />
            <label for="bank">Наименование банка</label>
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
        <FormField
          v-slot="$field"
          name="cardNumber"
          class="flex flex-col gap-1"
        >
          <FloatLabel variant="on">
            <InputText
              id="cardNumber"
              v-model="initialValues.cardNumber"
              class="w-full input-field"
            />
            <label for="cardNumber">Номер карты</label>
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
        <FormField
          v-slot="$field"
          name="expiryDate"
          class="flex flex-col gap-1"
        >
          <FloatLabel variant="on">
            <InputMask
              id="expiryDate"
              v-model="initialValues.expiryDate"
              mask="99/99"
              class="w-full input-field"
            />
            <label for="expiryDate">Срок действия</label>
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
        <FormField v-slot="$field" name="cvv" class="flex flex-col gap-1">
          <FloatLabel variant="on">
            <InputText
              id="cvv"
              v-model="initialValues.cvv"
              type="password"
              class="w-full input-field"
            />
            <label for="cvv">CVV</label>
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
        <FormField
          v-slot="$field"
          name="cardholderName"
          class="flex flex-col gap-1"
        >
          <FloatLabel variant="on">
            <InputText
              id="cardholderName"
              v-model="initialValues.cardholderName"
              class="w-full input-field"
            />
            <label for="cardholderName">Имя держателя</label>
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
          label="Добавить карту"
          icon="pi pi-plus"
          class="theme-button w-full"
          type="submit"
          :disabled="loading"
        />
      </Form>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, reactive, ref } from "vue";
import { Form, FormField } from "@primevue/forms";
import {
  Button,
  Divider,
  FloatLabel,
  InputText,
  InputMask,
  Message,
  ProgressBar,
} from "primevue";
import * as yup from "yup";
import { yupResolver } from "@primevue/forms/resolvers/yup";
import { useToastStore } from "@/stores/useToastStore";
import { usePlatezhStore } from "@/stores/usePlatezhStore";
import { useRouter } from "vue-router";
const dialogRef = inject("dialogRef");
function closeDialog() {
  dialogRef.value.close();
}
const cartsStore = usePlatezhStore();
const loading = ref(false);
const initialValues = reactive({
  cardNumber: "",
  expiryDate: "",
  cvv: "",
  cardholderName: "",
  bank: "",
});

const schema = computed(() => {
  return yup.object().shape({
    cardNumber: yup
      .string()
      .required("Введите номер карты")
      .matches(
        /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/,
        "Неверный формат номера карты"
      ),
    bank: yup.string().required("Введите название банка"),
    expiryDate: yup
      .string()
      .required("Введите срок действия")
      .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Формат MM/YY"),
    cvv: yup
      .string()
      .required("Введите CVV")
      .matches(/^\d{3,4}$/, "CVV должен содержать 3 или 4 цифры"),
    cardholderName: yup.string().required("Введите имя держателя"),
  });
});
const resolver = computed(() => yupResolver(schema.value));
const router = useRouter();
const toastStore = useToastStore();

const onSubmit = async (formData) => {
  if (formData.valid && !loading.value) {
    loading.value = true;
    try {
      console.log("Данные карты:", formData.values);
      cartsStore.addCart(formData.values);
      toastStore.showSuccessToast(
        "Карта успешно добавлена",
        "Она будет отображаться в вашем списке карт"
      );
      closeDialog();
    } catch (e) {
      toastStore.showErrorToast("Ошибка", "Не удалось сохранить карту");
    } finally {
      loading.value = false;
    }
  }
};
</script>

<style scoped>
.payment-card-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.cards-wrapper {
  background-color: var(--card-background-color);
  border: 1px solid var(--card-border-color);
  border-radius: 12px;
  box-shadow: var(--box-shadow);
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.cards-wrapper:hover {
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
}

.p-float-label label {
  color: var(--card-subtext-color);
}

.p-float-label input:focus ~ label,
.p-float-label input:not(:placeholder-shown) ~ label {
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
