<template>
  <div class="card">
    <Toolbar
      class="fixed bottom-0 left-0 w-full z-50 bg-white toolbar-mobile p-0"
    >
      <template #center>
        <Button
          v-for="item in flatMenuItems"
          :key="item.key"
          class="py-2.5 px-1 btn"
          severity="secondary"
          :label="item.label"
          text
          :class="{ active: activeBtn === item.key }"
          @click="handleMenuClick(item)"
        />
      </template>
    </Toolbar>
  </div>
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
} = useGoCaninet();
const menuItems = getMenuItems({
  gotoProfilThree,
  goToPD,
  gotoProfil,
  gotoPunct,
  removetoken,
  gotoProfilTwo,
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
.toolbar-mobile {
  display: none;
}
@media (max-width: 1100px) {
  .toolbar-mobile {
    display: flex;
  }
}
.active {
  background: #e0e7ff !important; /* Пример активного цвета */
  color: #1d4ed8 !important;
}
</style>
