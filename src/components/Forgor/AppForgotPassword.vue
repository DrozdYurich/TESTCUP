<template>
  <div class="w-full h-full flex flex-col justify-center items-center mt-40">
    <h1 class="text-3xl mb-3">Восстановление пароля</h1>
    <div
      class="text-black w-3/4 md:w-2/5 h-72 p-5 rounded-xl flex flex-col mx-auto"
      style="box-shadow: var(--box-shadow); max-width: 95vw"
    >
      <div v-if="loading">
        <ProgressBar
          class="custom-progressbar"
          mode="indeterminate"
          style="height: 5px"
        />
      </div>

      <Form
        :initialValues="initialValues"
        :resolver="resolver"
        @submit="onFormSubmit"
        class="flex flex-col gap-4 w-full m-auto"
      >
        <FormField v-slot="$field" name="passwdold" class="flex flex-col gap-1">
          <FloatLabel variant="on">
            <Password
              class="w-full"
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
            >{{ $field.error?.message }}</Message
          >
        </FormField>
        <FormField v-slot="$field" name="passwdnew" class="flex flex-col gap-1">
          <FloatLabel variant="on">
            <Password
              class="w-full"
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
            >{{ $field.error?.message }}</Message
          >
        </FormField>
        <FormField
          v-slot="$field"
          name="passwdnew1"
          class="flex flex-col gap-1"
        >
          <FloatLabel variant="on">
            <Password
              class="w-full"
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
            >{{ $field.error?.message }}</Message
          >
        </FormField>
        <Button
          :disabled="loading"
          type="submit"
          class="bg-blue-700 border-0 hover:bg-blue-950"
          label="Восстановить"
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

const toastStore = useToastStore();
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
      .required("Пароль обязателен"),
    passwdnew1: yup
      .string()
      .min(8, "Пароль должен содержать минимум 8 символов")
      .required("Пароль обязателен"),
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
    toastStore.showSuccessToast("Вы восстановили пароль");

    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.log(error);
    toastStore.showErrorToast("Произошла ошибка, попробуйте еще раз");
  }
};
</script>
<style></style>
