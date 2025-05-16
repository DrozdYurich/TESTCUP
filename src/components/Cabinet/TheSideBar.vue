<template>
  <div class="flex justify-center sidebar h-auto mt-5">
    <Menu :model="menuItems" class="w-full h-3/5">
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
          class="w-full border-0 bg-transparent flex items-start p-2 pl-4"
        >
          <Avatar :image="avatarImg" class="mr-2" shape="circle" />
          <span class="inline-flex flex-col items-start">
            <span class="font-bold"
              >{{ user?.name }} {{ user?.firstname }}</span
            >
            <span class="text-sm">{{ role }}</span>
          </span>
        </button>
      </template>
    </Menu>
  </div>
</template>

<script setup>
import avatarImg from "/src/assets/img/avatar.jpeg";
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
});
</script>
<style></style>
