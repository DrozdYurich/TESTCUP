<template>
  <div class="text-black">
    <div v-if="loading">
      <ProgressBar
        class="custom-progressbar"
        mode="indeterminate"
        style="height: 5px"
      />
    </div>
    <h2>Введите пароль</h2>
    <Form
      :initialValues="initialValues"
      :resolver="resolver"
      @submit="onFormSubmit"
      class="flex flex-col gap-4 w-full"
    >
      <FormField v-slot="$field" name="email" class="flex flex-col gap-1">
        <FloatLabel variant="on">
          <InputText
            class="w-full"
            type="text"
            v-model="initialValues.name"
            id="email"
          />
          <label for="email">Email</label>
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
<style></style>
