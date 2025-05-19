<template>
  <div class="w-full h-full flex justify-center items-center mt-20">
    <div class="form-card">
      <div v-if="loading">
        <ProgressBar
          class="custom-progressbar"
          mode="indeterminate"
          style="height: 5px"
        />
      </div>

      <h2 class="form-title">Сменить пароль</h2>

      <Form
        :initialValues="initialValues"
        :resolver="resolver"
        @submit="onFormSubmit"
        class="flex flex-col gap-4 w-full"
      >
        <!-- Старый пароль -->
        <FormField v-slot="$field" name="passwdold" class="flex flex-col gap-1">
          <FloatLabel variant="on">
            <Password
              class="input-field"
              type="text"
              v-model="initialValues.passwdold"
              id="passwdold"
              :feedback="false"
              toggleMask
              fluid
            />
            <label for="passwdold">Введите старый пароль</label>
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

        <!-- Новый пароль -->
        <FormField v-slot="$field" name="passwdnew" class="flex flex-col gap-1">
          <FloatLabel variant="on">
            <Password
              class="input-field"
              type="text"
              v-model="initialValues.passwdnew"
              id="passwdnew"
              :feedback="false"
              toggleMask
              fluid
            />
            <label for="passwdnew">Введите новый пароль</label>
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

        <!-- Повторите пароль -->
        <FormField
          v-slot="$field"
          name="passwdnew1"
          class="flex flex-col gap-1"
        >
          <FloatLabel variant="on">
            <Password
              class="input-field"
              type="text"
              v-model="initialValues.passwdnew1"
              id="passwdnew1"
              :feedback="false"
              toggleMask
              fluid
            />
            <label for="passwdnew1">Повторите новый пароль</label>
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

        <!-- Кнопка -->
        <Button
          :disabled="loading || !formValid"
          type="submit"
          class="theme-button"
          label="Сменить пароль"
        />
      </Form>
    </div>
  </div>
</template>
<script setup>
import { Form, FormField } from "@primevue/forms";
import {
  Button,
  FloatLabel,
  InputText,
  Message,
  Password,
  ProgressBar,
} from "primevue";
import { computed, inject, reactive, ref } from "vue";
import { useToastStore } from "@/stores/useToastStore";
import * as yup from "yup";
import { yupResolver } from "@primevue/forms/resolvers/yup";
import axios from "axios";
import { watch } from "vue";
import { useRouter } from "vue-router";
const toastStore = useToastStore();
const router = useRouter();
const initialValues = reactive({
  passwdold: "",
  passwdnew: "",
  passwdnew1: "",
});
const loading = ref(false);
const schema = computed(() => {
  const baseSchema = {
    passwdold: yup
      .string()
      .min(8, "Пароль должен содержать минимум 8 символов")
      .required("Пароль обязателен"),
    passwdnew: yup
      .string()
      .min(8, "Пароль должен содержать минимум 8 символов")
      .required("Пароль обязателен")
      .matches(/[a-z]/, "Должна быть хотя бы одна строчная буква")
      .matches(/[A-Z]/, "Должна быть хотя бы одна заглавная буква")
      .matches(/\d/, "Должна быть хотя бы одна цифра")
      .notOneOf(
        [yup.ref("passwdold")],
        "Новый пароль должен отличаться от старого"
      ),
    passwdnew1: yup
      .string()
      .oneOf([yup.ref("passwdnew")], "Пароли должны совпадать")
      .required("Подтверждение пароля обязательно"),
  };

  return yup.object().shape(baseSchema);
});
const resolver = computed(() => yupResolver(schema.value));
const onFormSubmit = async (formData) => {
  try {
    loading.value = true;
    if (formData.valid) {
      const formattedData = {
        passwdold: formData.values.passwdold,
        passwdnew: formData.values.passwdnew,
        passwdnew1: formData.values.passwdnew1,
      };
      //   const response = await axios.post(url, formattedData);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      //   await nextTick();
      //   return;
      console.log(formattedData);
    }
    toastStore.showSuccessToast("Вы успешно изменили пароль");
    router.push({ name: "pd" });
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.log(error);
    toastStore.showErrorToast("Произошла ошибка, попробуйте еще раз");
  }
};
const formValid = ref(false);

watch(
  () => initialValues,
  (newValues) => {
    formValid.value =
      newValues.passwdold.length >= 8 &&
      newValues.passwdnew.length >= 8 &&
      newValues.passwdnew1.length >= 8 &&
      newValues.passwdnew === newValues.passwdnew1 &&
      newValues.passwdnew !== newValues.passwdold;
  },
  { deep: true }
);
</script>
<style>
.form-card {
  background-color: var(--card-background-color);
  border: 1px solid var(--card-border-color);
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: var(--box-shadow);
}

.form-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--card-border-color);
  text-align: center;
  margin-bottom: 1.5rem;
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

.theme-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
