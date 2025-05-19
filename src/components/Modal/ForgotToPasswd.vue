<template>
  <div class="form-container">
    <div v-if="loading">
      <ProgressBar
        class="custom-progressbar"
        mode="indeterminate"
        style="height: 5px"
      />
    </div>

    <h2 class="title">Введите email</h2>

    <Form
      :initialValues="initialValues"
      :resolver="resolver"
      @submit="onFormSubmit"
      class="flex flex-col gap-4 w-full"
    >
      <FormField v-slot="$field" name="email" class="flex flex-col gap-1">
        <FloatLabel variant="on">
          <InputText
            class="input-field"
            type="text"
            v-model="initialValues.email"
            id="email"
          />
          <label for="email">Email</label>
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
        :disabled="loading"
        type="submit"
        class="theme-button"
        label="Восстановить"
      />
    </Form>
  </div>
</template>
<script setup>
import { Form, FormField } from "@primevue/forms";
import { Button, FloatLabel, InputText, Message, ProgressBar } from "primevue";
import { computed, inject, reactive, ref } from "vue";
import { useToastStore } from "@/stores/useToastStore";
import * as yup from "yup";
import { yupResolver } from "@primevue/forms/resolvers/yup";
import axios from "axios";

const dialogRef = inject("dialogRef");
function closeDialog() {
  dialogRef.value.close();
}
const toastStore = useToastStore();
const initialValues = reactive({
  email: "",
});
const loading = ref(false);
const schema = computed(() => {
  const baseSchema = {
    email: yup
      .string()
      .required("Укажите email")
      .email("Некорректный формат email"),
  };

  return yup.object().shape(baseSchema);
});
const resolver = computed(() => yupResolver(schema.value));
const onFormSubmit = async (formData) => {
  try {
    loading.value = true;
    if (formData.valid) {
      const formattedData = {
        email: formData.values.email,
      };
      //   const response = await axios.post(url, formattedData);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      //   await nextTick();
      //   return;
      console.log(formattedData);
    }
    toastStore.showSuccessToast(
      "Вы успешно подали заявку",
      "Вам придет сообщение на вашу почту, ожидайте"
    );

    loading.value = false;
    closeDialog();
  } catch (error) {
    loading.value = false;
    console.log(error);
    toastStore.showErrorToast("Произошла системная ошибка ");
  }
};
</script>
<style>
.form-container {
  background-color: var(--background-color);
  color: var(--text-color);
  border: 1px solid var(--card-border-color);
  border-radius: 12px;
  padding: 2rem;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-color);
  text-align: center;
  margin-bottom: 1rem;
}

.input-field {
  background-color: transparent !important;
  color: var(--text-color) !important;
  border: none !important;
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

.custom-progressbar .p-progressbar-value {
  background-color: var(--card-border-color) !important;
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
</style>
