<template>
  <div class="user-card">
    <div class="user-header p-4 flex flex-col items-center text-center">
      <!-- Аватар -->
      <Avatar
        :image="avatarImg"
        size="xlarge"
        shape="circle"
        class="mb-3 border-2"
      />

      <!-- Форма редактирования -->
      <form @submit.prevent="saveChanges" class="w-full px-4 space-y-4">
        <!-- Имя -->
        <div class="flex flex-col">
          <label
            for="name"
            class="text-left text-sm text-[var(--card-subtext-color)]"
            >Имя</label
          >
          <InputText
            id="name"
            v-model="editableUser.name"
            class="w-full bg-transparent border-b border-gray-500 focus:border-[var(--card-border-color)] text-[var(--text-color)]"
            required
          />
        </div>

        <!-- Фамилия -->
        <div class="flex flex-col">
          <label
            for="firstname"
            class="text-left text-sm text-[var(--card-subtext-color)]"
            >Фамилия</label
          >
          <InputText
            id="firstname"
            v-model="editableUser.firstname"
            class="w-full bg-transparent border-b border-gray-500 focus:border-[var(--card-border-color)] text-[var(--text-color)]"
            required
          />
        </div>
        <!-- Отчество -->
        <div class="flex flex-col">
          <label
            for="patronymic"
            class="text-left text-sm text-[var(--card-subtext-color)]"
            >Отчество</label
          >
          <InputText
            id="firstname"
            v-model="editableUser.patronymic"
            class="w-full bg-transparent border-b border-gray-500 focus:border-[var(--card-border-color)] text-[var(--text-color)]"
          />
        </div>
        <!-- Username -->
        <div class="flex flex-col">
          <label
            for="username"
            class="text-left text-sm text-[var(--card-subtext-color)]"
            >Username</label
          >
          <InputText
            id="username"
            v-model="editableUser.username"
            class="w-full bg-transparent border-b border-gray-500 focus:border-[var(--card-border-color)] text-[var(--text-color)]"
            required
          />
        </div>

        <!-- Дата рождения -->
        <div class="flex flex-col">
          <label
            for="birthdate"
            class="text-left text-sm text-[var(--card-subtext-color)]"
          >
            Дата рождения
          </label>
          <DatePicker
            id="birthdate"
            v-model="editableUser.birthdate"
            :showIcon="true"
            dateFormat="dd.mm.yy"
            class="w-full datepicker-wrapper"
            inputClass="w-full bg-transparent border-b border-gray-500 focus:border-[var(--card-border-color)] text-[var(--text-color)] placeholder:text-[var(--card-subtext-color)]"
            :pt="{
              input: {
                style: {
                  backgroundColor: 'transparent',
                  borderColor: 'var(--card-border-color)',
                  color: 'var(--text-color)',
                },
              },
              icon: {
                style: {
                  color: 'var(--card-subtext-color)',
                },
              },
            }"
          />
        </div>
        <!-- Кнопки -->
        <div class="flex justify-between mt-4 gap-24">
          <Button
            label="Сохранить"
            icon="pi pi-save"
            type="submit"
            class="theme-button save-btn"
          />
          <Button
            label="Изменить  пароль"
            icon="pi pi-key"
            @click="showChangePasswd"
            class="theme-button reset-btn"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import avatarImg from "@/assets/img/avatar.jpeg";
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/useUserStore";
import InputText from "primevue/inputtext";

import Button from "primevue/button";
import { Avatar, DatePicker } from "primevue";
import useModalMethods from "@/components/Modal/MethodsModal/methods";
const userStore = useUserStore();
const { showChangePasswd } = useModalMethods();
const { getUser } = storeToRefs(userStore);
const user = computed(() => getUser.value);
const editableUser = ref({
  name: "",
  firstname: "",
  patronymic: "",
  username: "",
  email: "",
  birthdate: null,
});

const loading = ref();

onMounted(() => {
  if (user.value) {
    editableUser.value = {
      name: user.value.first_name || "",
      firstname: user.value.last_name || "",
      patronymic: user.value.father_name || "",
      username: user.value.username || "",
      birthdate: user.value.birthday ? new Date(user.value.birthday) : null,
    };
  }
});

const saveChanges = () => {
  console.log("Сохраняем данные:", editableUser.value);
  userStore.updateUser(editableUser.value); // Пример метода в сторе
};

// Восстановление пароля
const resetPassword = () => {
  console.log("Запрос восстановления пароля");
  // Здесь можно открыть модальное окно или отправить запрос
};
</script>

<style>
.p-datepicker-dropdown {
  background-color: var(--background-color);
}
.theme-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem; /* это 2 * 0.25rem = 8px */
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 0.875rem; /* text-sm */
  font-weight: 500;
  border-radius: 0.375rem; /* rounded-md */
  transition: all 0.3s ease-in-out;
}
.save-btn {
  background-color: var(--card-border-color); /* Золотой */
  color: #000000; /* Чёрный текст */
  border: none;
}

.save-btn:hover {
  filter: brightness(90%);
}

.reset-btn {
  background-color: transparent;
  color: var(--card-border-color); /* Золотой текст */
  border: 2px solid var(--card-border-color);
}

.reset-btn:hover {
  background-color: var(--card-border-color);
  color: #000000;
}
.user-card {
  background-color: var(--card-background-color);
  border: 1px solid var(--card-border-color);
  border-radius: 12px;
  margin: 1rem;
  box-shadow: var(--box-shadow);
  overflow: hidden;
  transition: all 0.3s ease;
}

.p-avatar {
  border-color: var(--card-border-color);
}
</style>
