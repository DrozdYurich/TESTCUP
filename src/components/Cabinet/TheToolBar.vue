<template>
  <div class="card">
    <Toolbar class="fixed bottom-0 left-0 w-full z-50 bg-white toolbar-mobile">
      <template #start>
        <Button
          class="mr-2"
          severity="secondary"
          label="Добавить"
          text
          :class="{ active: activeBtn === 'add' }"
          @click="activeBtn = 'add'"
        />
        <Button
          label="Мои данные"
          class="mr-2"
          severity="secondary"
          text
          :class="{ active: activeBtn === 'data' }"
          @click="activeBtn = 'data'"
        />
        <Button
          label="Мои соревнования"
          severity="secondary"
          text
          :class="{ active: activeBtn === 'comp' }"
          @click="activeBtn = 'comp'"
        />
      </template>
      <template #center>
        <IconField>
          <InputIcon>
            <i class="pi pi-search" />
          </InputIcon>
          <InputText placeholder="Search" />
        </IconField>
      </template>

      <template #end>
        <SplitButton label="Save" :model="items"></SplitButton
      ></template>
    </Toolbar>
  </div>
</template>

<script setup>
import {
  Button,
  IconField,
  InputIcon,
  InputText,
  SplitButton,
  Toolbar,
} from "primevue";
import { ref } from "vue";
const activeBtn = ref(null);
const items = ref([
  {
    label: "Update",
    icon: "pi pi-refresh",
  },
  {
    label: "Delete",
    icon: "pi pi-times",
  },
]);
</script>
<style>
.toolbar-mobile {
  display: none;
}
@media (max-width: 767px) {
  .toolbar-mobile {
    display: flex;
  }
}
.active {
  background: #e0e7ff !important; /* Пример активного цвета */
  color: #1d4ed8 !important;
}
</style>
