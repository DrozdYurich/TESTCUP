<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-900">
    <Toast />
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <Form
        :initialValues="initialValues"
        :resolver="resolver"
        @submit="onFormSubmit"
        class="flex flex-col gap-4 w-full"
      >
        <FormField v-slot="$field" name="nickname" class="flex flex-col gap-1">
          <FloatLabel variant="on"
            ><InputText
              class="w-full"
              type="text"
              v-model="initialValues.nickname"
              id="nickname"
            />
            <label for="nickname">NickName</label>
          </FloatLabel>

          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</Message
          >
        </FormField>
        <FormField v-slot="$field" name="name" class="flex flex-col gap-1">
          <FloatLabel variant="on">
            <InputText
              class="w-full"
              type="text"
              v-model="initialValues.name"
              id="name"
            />
            <label for="name">Имя</label>
          </FloatLabel>
          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</Message
          >
        </FormField>
        <FormField v-slot="$field" name="surname" class="flex flex-col gap-1">
          <FloatLabel variant="on">
            <InputText
              class="w-full"
              type="text"
              v-model="initialValues.surname"
              id="surname"
            />
            <label for="surname">Фамилия</label>
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
          name="patronymic"
          class="flex flex-col gap-1"
        >
          <FloatLabel variant="on">
            <InputText
              class="w-full"
              type="text"
              v-model="initialValues.patronymic"
              id="patronymic"
            />
            <label for="patronymic">Отчество</label>
          </FloatLabel>
          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</Message
          >
        </FormField>
        <FormField v-slot="$field" name="password" class="flex flex-col gap-1">
          <FloatLabel variant="on">
            <Password
              type="text"
              id="password"
              v-model="initialValues.password"
              :feedback="false"
              toggleMask
              fluid
            />
            <label for="password">Пароль</label>
          </FloatLabel>
          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</Message
          >
        </FormField>
        <FormField v-slot="$field" name="dR" class="flex flex-col gap-1">
          <FloatLabel variant="on">
            <DatePicker
              class="w-full"
              type="text"
              v-model="initialValues.dR"
              input-id="dR"
              show-icon
              fluid
              :show-on-focus="false"
            />
            <label for="dR">Дата рождения</label>
          </FloatLabel>
          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</Message
          >
        </FormField>
        <FormField v-slot="$field" name="email" class="flex flex-col gap-1">
          <FloatLabel variant="on">
            <InputText
              class="w-full"
              type="text"
              v-model="initialValues.email"
              id="email"
            />
            <label for="email"> Email</label>
          </FloatLabel>
          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</Message
          >
        </FormField>
        <Message severity="info" class="text-center">
          Уже есть аккаунт?
          <a href="/login" class="text-blue-600 underline hover:text-blue-800"
            >Войти</a
          >
        </Message>
        <Button
          type="submit"
          class="bg-black border-0 hover:bg-blue-950"
          label="Зарегестрироваться"
        />
      </Form>
    </div>
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
  DatePicker,
  FloatLabel,
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
  dR: "",
  email: "",
});
const schema = yup.object().shape({
  name: yup.string().required("Введите Имя"),
  nickname: yup.string().required("Введите NickName"),
  surname: yup.string().required("Введите Фамилию"),
  dR: yup
    .date()
    .typeError("Укажите дату своего рождения")
    .required("Укажите дату своего рождения"),
  email: yup
    .string()
    .required("Укажите email")
    .email("Некорректный формат email"),
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
  if (formData.valid) {
    const formattedData = {
      ...formData.values,
      dR: new Date(formData.values.dR).toISOString().split("T")[0], // 'YYYY-MM-DD'
    };
    console.log("Form submitted", formattedData);
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
