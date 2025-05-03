<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-900">
    <Toast />
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <Divider align="center" type="solid">
        <span class="text-xl font-bold">
          {{ mode === "registr" ? "Регистрация" : "Вход" }}
        </span>
      </Divider>
      <Form
        :initialValues="initialValues"
        :resolver="resolver"
        @submit="onFormSubmit"
        class="flex flex-col gap-4 w-full"
      >
        <template v-if="mode === 'registr'">
          <FormField
            v-slot="$field"
            name="nickname"
            class="flex flex-col gap-1"
          >
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
        </template>
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

        <Message severity="info" class="text-center">
          {{ mode === "registr" ? "Уже есть аккаунт?" : "Ещё нет аккаунта?" }}
          <RouterLink
            :to="mode === 'registr' ? '/login' : '/auth'"
            class="text-blue-600 underline hover:text-blue-800"
            >{{
              mode === "registr" ? "Войти" : "Зарегистрироваться"
            }}</RouterLink
          >
        </Message>
        <Button
          type="submit"
          class="bg-black border-0 hover:bg-blue-950"
          :label="mode === 'registr' ? 'Зарегистрироваться' : 'Войти'"
        />
      </Form>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import { yupResolver } from "@primevue/forms/resolvers/yup";
import * as yup from "yup";
import { useToast } from "primevue/usetoast";
import { FormField } from "@primevue/forms";

import { nextTick } from "vue";
import {
  Button,
  DatePicker,
  Divider,
  FloatLabel,
  InputText,
  Message,
  Password,
  Toast,
} from "primevue";
import { Form } from "@primevue/forms";
import { useAuthStore } from "@/stores/useAuthStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
const props = defineProps({
  mode: {
    type: String,
    default: "login",
    validator: (value) => ["login", "registr"].includes(value),
  },
});
const router = useRouter();
const authStore = useAuthStore();
const { getToken, isAuth } = storeToRefs(useAuthStore());
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

const schema = computed(() => {
  const baseSchema = {
    email: yup
      .string()
      .required("Укажите email")
      .email("Некорректный формат email"),
    password: yup
      .string()
      .min(8, "Пароль должен содержать минимум 8 символов")
      .required("Пароль обязателен"),
  };

  if (props.mode === "registr") {
    return yup.object().shape({
      ...baseSchema,
      name: yup.string().required("Введите Имя"),
      nickname: yup.string().required("Введите NickName"),
      surname: yup.string().required("Введите Фамилию"),
      dR: yup
        .date()
        .typeError("Укажите дату рождения")
        .required("Укажите дату рождения"),
      password: baseSchema.password
        .matches(/[a-z]/, "Должна быть хотя бы одна строчная буква")
        .matches(/[A-Z]/, "Должна быть хотя бы одна заглавная буква")
        .matches(/\d/, "Должна быть хотя бы одна цифра"),
    });
  }

  return yup.object().shape(baseSchema);
});

const resolver = computed(() => yupResolver(schema.value));

const onFormSubmit = async (formData) => {
  try {
    if (formData.valid) {
      const formattedData = {
        email: formData.values.email,
        password: formData.values.password,
        ...(props.mode === "registr" && {
          name: formData.values.name,
          surname: formData.values.surname,
          patronymic: formData.values.patronymic,
          nickname: formData.values.nickname,
          dR: new Date(formData.values.dR).toISOString().split("T")[0],
        }),
      };

      console.log("Form submitted", formattedData);
      const response = await authStore.login(
        "http://10.8.0.23:8000/api/auth/register/",
        formattedData
      );
      await nextTick();
      console.log(isAuth.value, "fff");
      if (isAuth.value) {
        router.push("/");
      } else {
        console.error("Registration failed");
        toast.add({
          severity: "error",
          summary:
            props.mode === "registr"
              ? "Регистрация не выполнена"
              : "Вход не выполнен",
          detail: "Пожалуйста, попробуйте снова",
          life: 3000,
        });
        return;
      }
      console.log(response);
      toast.add({
        severity: "success",
        summary:
          props.mode === "registr"
            ? "Вы успешно зарегистрировались"
            : "Вход выполнен",
        detail:
          props.mode === "registr"
            ? `Добро пожаловать, ${formData.values.name} ${formData.values.surname}!`
            : "Добро пожаловать!",
        life: 3000,
      });
    } else {
      toast.add({
        severity: "error",
        summary:
          props.mode === "registr"
            ? "Регистрация не выполнена"
            : "Вход не выполнен",
        detail: "Пожалуйста, проверьте введенные данные",
        life: 3000,
      });
    }
  } catch (error) {
    console.log(error);
    toast.add({
      severity: "error",
      summary:
        props.mode === "registr"
          ? "Регистрация не выполнена"
          : "Вход не выполнен",
      detail: "Пожалуйста, попробуйте снова",
      life: 3000,
    });
  }
};
</script>
