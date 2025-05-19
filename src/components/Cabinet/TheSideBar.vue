<template>
  <div class="flex justify-center sidebar h-auto mt-5">
    <Menu
      :model="menuItems"
      class="w-full h-4/5 custom-menu"
      :style="{ background: 'var(--background-color)' }"
    >
      <template #start>
        <span class="inline-flex items-center gap-1 px-2 py-2">
          <span class="text-2xl font-semibold text-[var(--text-color)]">
            СТО<span class="text-[var(--card-border-color)]">ЛОТО</span>
          </span>
          <Avatar :image="Img" />
        </span>
      </template>
      <template #submenulabel="{ item }">
        <span class="text-[var(--card-border-color)] font-bold">
          {{ item.label }}
        </span>
      </template>
      <template #item="{ item, props }">
        <a class="flex items-center custom-menu-item" v-bind="props.action">
          <span :class="item.icon" class="text-[var(--text-color)]" />
          <span class="text-[var(--text-color)]">{{ item.label }}</span>
          <Badge
            v-if="item.badge"
            class="ml-auto"
            :value="item.badge"
            :class="{ 'bg-[var(--card-border-color)]': true }"
          />
        </a>
      </template>
      <template #end>
        <button
          class="w-full border-0 bg-transparent flex items-start p-0 pl-4"
        >
          <Avatar :image="avatarImg" class="mr-2" shape="circle" />
          <span class="inline-flex flex-col items-start">
            <span class="font-bold text-[var(--text-color)]">
              {{ user?.last_name }} {{ user?.first_name }}
              {{ user?.father_name }}
            </span>
            <span class="text-sm text-[var(--card-subtext-color)] mr-1">
              {{ role ? "Администратор" : "Участник" }}
            </span>
          </span>
        </button>
      </template>
    </Menu>
  </div>
</template>

<script setup>
import avatarImg from "/src/assets/img/avatar.jpeg";
import Img from "/src/assets/img/bg.webp";
import { Avatar, Badge, Menu } from "primevue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/useUserStore";
import { getMenuItems } from "./data/sidebar";
import useGoCaninet from "./methods/useGoTo";
import { computed, onMounted } from "vue";
import { useRoleStore } from "@/stores/useRoleStore";
const { getUser } = storeToRefs(useUserStore());
const { getRole } = storeToRefs(useRoleStore());
const {
  goToPD,
  gotoProfil,
  gotoPunct,
  removetoken,
  gotoProfilTwo,
  gotoProfilThree,
} = useGoCaninet();
const user = computed(() => {
  return getUser.value;
});
const role = computed(() => {
  return getRole.value;
});
const menuItems = getMenuItems({
  goToPD,
  gotoProfilThree,
  gotoProfil,
  gotoPunct,
  gotoProfilTwo,
  removetoken,
  isAdmin: role,
});
</script>
<style>
.p-menu-item-content:focus-within {
  background-color: var(--card-background-color);
  box-shadow: 0 0 0 0.2rem var(--border-color);
}

.p-menu.p-component {
  background-color: var(--background-color);
}

.custom-menu {
  background-color: var(--background-color) !important;
  border-color: var(--border-color) !important;
}

.custom-menu .p-menuitem-link {
  color: var(--text-color) !important;
  background-color: var(--background-color) !important;
}

.custom-menu .p-menuitem-link:hover {
  background-color: var(--card-background-color) !important;
}

.custom-menu .p-submenu-header {
  background-color: var(--background-color) !important;
  color: var(--text-color) !important;
}

.custom-menu .p-submenu-list {
  background-color: var(--card-background-color) !important;
  border-color: var(--border-color) !important;
}

.custom-menu-item:hover {
  background-color: var(--card-background-color) !important;
}

.p-avatar {
  border: 2px solid var(--card-border-color);
}
</style>
