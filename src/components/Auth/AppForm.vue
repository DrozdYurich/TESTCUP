<template>
  {{ initialValues }}
  <div class="flex justify-center">
    <Toast />
    <Form
      v-slot="{ data }"
      :initialValues="initialValues"
      :resolver="resolver"
      @submit="onFormSubmit"
      class="flex flex-col gap-4 w-full sm:w-80"
    >
      <FormField v-slot="$field" name="nickname" class="flex flex-col gap-1">
        <InputText
          type="text"
          v-model="initialValues.nickname"
          placeholder="NickName"
        />
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $field.error?.message }}</Message
        >
      </FormField>
      <FormField v-slot="$field" name="name" class="flex flex-col gap-1">
        <InputText type="text" v-model="initialValues.name" placeholder="Имя" />
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $field.error?.message }}</Message
        >
      </FormField>
      <FormField v-slot="$field" name="surname" class="flex flex-col gap-1">
        <InputText
          type="text"
          v-model="initialValues.surname"
          placeholder="Фамилия"
        />
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $field.error?.message }}</Message
        >
      </FormField>
      <FormField v-slot="$field" name="patronymic" class="flex flex-col gap-1">
        <InputText
          type="text"
          v-model="initialValues.patronymic"
          placeholder="Отчество"
        />
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $field.error?.message }}</Message
        >
      </FormField>
      <FormField v-slot="$field" name="password" class="flex flex-col gap-1">
        <Password
          type="text"
          placeholder="Password"
          v-model="initialValues.password"
          :feedback="false"
          toggleMask
          fluid
        />
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $field.error?.message }}</Message
        >
      </FormField>
      <Button type="submit" severity="success" label="Зарегестрироваться" />
    </Form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { yupResolver } from "@primevue/forms/resolvers/yup";
import * as yup from "yup";
import { useToast } from "primevue/usetoast";
import { FormField } from "@primevue/forms";
import {
  Button,
  InputText,
  Message,
  Password,
  Textarea,
  Toast,
} from "primevue";
import { Form } from "@primevue/forms";
const toast = useToast();

const initialValues = reactive({
  name: "",
  nickname: "",
  surname: "",
  patronymic: "",
  password: "",
});
const schema = yup.object().shape({
  name: yup.string().required("Введите Имя"),
  nickname: yup.string().required("Введите NickName"),
  surname: yup.string().required("Введите Фамилию"),
  password: yup
    .string()
    .min(8, "Пароль должен содержать минимум 8 символов")
    .matches(/[a-z]/, "Должна быть хотя бы одна строчная буква")
    .matches(/[A-Z]/, "Должна быть хотя бы одна заглавная буква")
    .matches(/\d/, "Должна быть хотя бы одна цифра")
    .required("Пароль обязателен"),
});
const resolver = yupResolver(schema);
const onFormSubmit = async (formData) => {
  console.log("Form submitted", formData);

  if (formData.valid) {
    toast.add({
      severity: "success",
      summary: "Вы успешно зарегистрировались",
      detail: `Добро пожаловать, ${formData.values.name} ${formData.values.surname}!`,
      life: 3000,
    });
  } else {
    toast.add({
      severity: "error",
      summary: "Ошибка валидации",
      detail: "Пожалуйста, проверьте введенные данные",
      life: 3000,
    });
  }
};
</script>
