<template>
  <div class="flex justify-center sidebar h-auto mt-5">
    <Menu :model="items" class="w-full h-full">
      <template #start>
        <span class="inline-flex items-center gap-1 px-2 py-2">
          <span class="text-xl font-semibold"
            >WORLD<span class="text-primary-300">CUP</span></span
          >
        </span>
      </template>
      <template #submenulabel="{ item }">
        <span class="text-primary font-bold">{{ item.label }}</span>
      </template>
      <template #item="{ item, props }">
        <a class="flex items-center" v-bind="props.action">
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
          <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
        </a>
      </template>
      <template #end>
        <button
          class="relative overflow-hidden w-full border-0 bg-transparent flex items-start p-2 pl-4 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-none cursor-pointer transition-colors duration-200"
        >
          <Avatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            class="mr-2"
            shape="circle"
          />
          <span class="inline-flex flex-col items-start">
            <span class="font-bold">User user</span>
            <span class="text-sm">role</span>
          </span>
        </button>
      </template>
    </Menu>
  </div>
</template>

<script setup>
import { Avatar, Badge, Menu } from "primevue";
import { ref } from "vue";
import useGoCaninet from "./methods/useGoTo";
const { goToPD, gotoProfil, gotoPunct, removetoken } = useGoCaninet();
const items = ref([
  {
    separator: true,
  },
  {
    label: "Общая информация",
    items: [
      {
        label: "Мои данные",
        icon: "pi pi-plus",
        shortcut: "⌘+N",
        command: goToPD,
      },
      {
        label: "Еще пункт",
        icon: "pi pi-search",
        shortcut: "⌘+S",
        command: gotoPunct,
      },
    ],
  },
  {
    label: "Профиль",
    items: [
      {
        label: "Пункт профиля",
        icon: "pi pi-cog",
        shortcut: "⌘+O",
        command: gotoProfil,
      },
      {
        label: "Пункт профиля 2",
        icon: "pi pi-inbox",
        badge: 3,
      },
      {
        label: "Выход",
        icon: "pi pi-sign-out",
        shortcut: "⌘+Q",
        command: removetoken,
      },
    ],
  },
  {
    separator: true,
  },
]);
</script>
<style>
.sidebar {
  display: none;
}
@media (min-width: 1100px) {
  .sidebar {
    display: flex;
  }
}
</style>
