<template>
  <div class="flex items-center justify-center min-h-screen">
    <div
      class="bg-[var(--background-color)] rounded-lg shadow-lg p-6 w-full max-w-md"
      :style="{ borderColor: 'var(--card-border-color)', borderWidth: '1px' }"
    >
      <div v-if="loading">
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
          <FormField v-slot="$field" name="role" class="flex flex-col gap-1">
            <FloatLabel variant="on">
              <Select
                class="w-full"
                :options="roles"
                optionLabel="name"
                type="text"
                v-model="initialValues.role"
                id="role"
              />
              <label for="role">Role</label>
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
        <Message v-if="mode != 'registr'" severity="warn" class="text-center">
          Забыли пароль?
          <Button
            variant="text"
            class="text-[var(--text-color)] p-0 border-0 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:shadow-none"
            style="text-decoration: underline; text-underline-offset: 4px"
            @click="showForgotToPasswd"
            >Восстановить пароль</Button
          >
        </Message>
        <Message severity="warn" class="text-center">
          {{ mode === "registr" ? "Уже есть аккаунт?" : "Ещё нет аккаунта?" }}
          <RouterLink
            :to="mode === 'registr' ? { name: 'login' } : { name: 'auth' }"
            class="text-[var(--text-color)] underline hover:text-blue-800"
            >{{
              mode === "registr" ? "Войти" : "Зарегистрироваться"
            }}</RouterLink
          >
        </Message>
        <Button
          :disabled="loading"
          type="submit"
          class="bg-[var(--button-bg)] border-0 save-btn"
          :label="mode === 'registr' ? 'Зарегистрироваться' : 'Войти'"
        />
      </Form>
    </div>
    {{ getUser }}
  </div>
</template>

<script setup>
import { reactive, computed, ref } from "vue";
import { yupResolver } from "@primevue/forms/resolvers/yup";
import * as yup from "yup";
import { FormField } from "@primevue/forms";
import { useToastStore } from "@/stores/useToastStore";
import { nextTick } from "vue";
import {
  Button,
  DatePicker,
  Divider,
  FloatLabel,
  InputText,
  Message,
  Password,
  ProgressBar,
  Select,
} from "primevue";
import { Form } from "@primevue/forms";
import { useAuthStore } from "@/stores/useAuthStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useRoleStore } from "@/stores/useRoleStore";
import { useUserStore } from "@/stores/useUserStore";
import useModalMethods from "../Modal/MethodsModal/methods";
import axios from "axios";
const props = defineProps({
  mode: {
    type: String,
    default: "login",
    validator: (value) => ["login", "registr"].includes(value),
  },
});
const { showForgotToPasswd } = useModalMethods();
const router = useRouter();
const authStore = useAuthStore();
const { getToken, isAuth } = storeToRefs(useAuthStore());
const toastStore = useToastStore();
const roleStore = useRoleStore();
const userStore = useUserStore();
const { getUser } = storeToRefs(useUserStore());
const loading = ref(false);
const initialValues = reactive({
  name: "",
  nickname: "",
  surname: "",
  patronymic: "",
  password: "",
  dR: "",
  role: "",
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
      dR: yup.string().required("Укажите роль"),
      password: baseSchema.password
        .matches(/[a-z]/, "Должна быть хотя бы одна строчная буква")
        .matches(/[A-Z]/, "Должна быть хотя бы одна заглавная буква")
        .matches(/\d/, "Должна быть хотя бы одна цифра"),
    });
  }

  return yup.object().shape(baseSchema);
});

const resolver = computed(() => yupResolver(schema.value));
const roles = ref([
  { name: "Админ", code: "1" },
  { name: "Участник", code: "2" },
]);
const onFormSubmit = async (formData) => {
  try {
    loading.value = true;
    if (formData.valid) {
      const formattedData = {
        email: formData.values.email,
        password: formData.values.password,
        ...(props.mode === "registr" && {
          last_name: formData.values.name,
          first_name: formData.values.surname,
          father_name: formData.values.patronymic,
          username: formData.values.nickname,
          is_root: formData.values.role.name === 1 ? true : false,
          birthday: new Date(formData.values.dR).toISOString().split("T")[0],
        }),
      };

      const response = await authStore.login(
        "http://10.8.0.23:8000/auth/users/",
        formattedData
      );
      // if (formattedData.role) {
      //   roleStore.setRole(formattedData.role);
      // } else {
      //   roleStore.setRole(2);
      // }
      // userStore.setUser({
      //   name: "evgeni",
      //   firstname: "drozdov",
      //   id: 4,
      //   data: Date.now(),
      // });
      await nextTick();
      if (response) {
        const token = await axios.post(
          "http://10.8.0.23:8000/auth/jwt/create/",
          {
            username: getUser.value.username,
            password: initialValues.password,
          }
        );
        console.log(token);
        authStore.setAccsessToken(token.data.access);
        authStore.setRefreshToken(token.data.refresh);
        if (isAuth.value) {
          router.push("/");
        } else {
          console.error("Registration failed");
          toastStore.showErrorToast(
            props.mode === "registr"
              ? "Регистрация не выполнена"
              : "Вход не выполнен",
            "Пожалуйста, проверьте введенные данные"
          );

          return;
        }
      }

      console.log(response);
      toastStore.showSuccessToast(
        props.mode === "registr"
          ? "Вы успешно зарегистрировались"
          : "Вход выполнен",
        props.mode === "registr"
          ? `Добро пожаловать, ${formData.values.name} ${formData.values.surname}!`
          : "Добро пожаловать!"
      );
    } else {
      toastStore.showErrorToast(
        props.mode === "registr"
          ? "Регистрация не выполнена"
          : "Вход не выполнен",
        "Пожалуйста, проверьте введенные данные"
      );
    }
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.log(error);
    toastStore.showErrorToast(
      props.mode === "registr"
        ? "Регистрация не выполнена"
        : "Вход не выполнен",
      "Пожалуйста, попробуйте снова"
    );
  }
};
</script>
<style>
.custom-progressbar .p-progressbar-value {
  background-color: black !important; /* нужный цвет */
}
.save-btn:hover {
  filter: brightness(90%);
}
label {
  background-color: transparent;
}
.p-inputtext {
  background: var(--background-color);
}
.p-select {
  background: var(--background-color);
}
</style>
