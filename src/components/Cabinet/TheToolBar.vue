<template>
  <Toolbar
    class="fixed left-0 w-11/12 z-50 bg-white toolbar-mobile p-0"
    style="bottom: 20px"
  >
    <template #center>
      <Button
        v-for="item in flatMenuItems"
        :key="item.key"
        class="py-2.5 px-1 btn flex flex-col items-center justify-center"
        severity="secondary"
        :label="item.label"
        :icon="item.icon"
        text
        :class="{ active: activeBtn === item.key }"
        @click="handleMenuClick(item)"
      />
    </template>
  </Toolbar>
</template>

<script setup>
import { Button, Toolbar } from "primevue";
import { useRouter } from "vue-router";
import { getMenuItems } from "./data/sidebar";
import useGoCaninet from "./methods/useGoTo";
import { computed, ref } from "vue";
const router = useRouter();
const {
  goToPD,
  gotoProfil,
  gotoPunct,
  removetoken,
  gotoProfilTwo,
  gotoProfilThree,
  removeUser,
} = useGoCaninet();
const menuItems = getMenuItems({
  gotoProfilThree,
  goToPD,
  gotoProfil,
  gotoPunct,
  removetoken,
  gotoProfilTwo,
  removeUser,
});
const flatMenuItems = computed(() => {
  return menuItems
    .flatMap((group) => group.items || [])
    .filter((item) => item.label && item.command);
});
const activeBtn = ref(null);

function handleMenuClick(item) {
  activeBtn.value = item.key;
  if (item.command) {
    item.command();
  }
}
</script>
<style>
.btn {
  font-size: 11px;
  margin-right: 0;
}

.active {
  background: #e0e7ff !important; /* Пример активного цвета */
  color: #1d4ed8 !important;
}
.p-toolbar {
  border-bottom: none !important;
}
.p-toolbar-center {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
}
</style>
