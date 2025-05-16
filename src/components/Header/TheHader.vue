<template>
  <div class="card sticky top-0 z-50">
    <Menubar :model="items" ref="menubarRef">
      <template #start>
        <span class="menu-label">Menu</span>
      </template>

      <template #item="{ item, props, hasSubmenu }">
        <router-link
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="{ name: item.route }"
          custom
        >
          <a
            :href="href"
            v-bind="props.action"
            @click="() => handleMenuClick(navigate)"
          >
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else :href="item.url" v-bind="props.action">
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
        </a>
      </template>
    </Menubar>
    <ToggleSwitch
      id="theme-switch"
      v-model="isDark"
      :aria-label="`Переключатель темы, сейчас ${
        isDark ? 'тёмная' : 'светлая'
      }`"
    >
      <template #handle="{ checked }">
        <i :class="checked ? 'pi pi-moon' : 'pi pi-sun'" class="text-lg"></i>
      </template>
    </ToggleSwitch>
    <span>{{ isDark ? "Тёмная тема" : "Светлая тема" }}</span>
  </div>
</template>

<script setup>
import { Menubar, ToggleSwitch } from "primevue";
import { computed, onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/useAuthStore";
import useTheme from "../Utility/useTheme";
const menubarRef = ref();
const { isAuth } = storeToRefs(useAuthStore());
const { isDark } = useTheme();
const auth = computed(() => {
  return isAuth.value;
});
const items = ref([
  {
    label: "Главная",
    icon: "pi pi-home",
    route: "home",
  },
  {
    label: "Первый",
    icon: "pi pi-palette",
    route: "one",
  },
  {
    label: "Второй",
    icon: "pi pi-link",
    route: "two",
  },
  {
    label: "Третий",
    icon: "pi pi-home",
    route: "three",
  },
  {
    label: auth.value ? "Личный кабинет" : "Войти",
    icon: auth.value ? "pi pi-home" : "pi pi-sign-in",
    route: auth.value ? "cabinet" : "login",
  },
]);

function handleMenuClick(navigate) {
  event.preventDefault();
  navigate();
  menubarRef.value?.hide();
}
</script>
<style>
.pi-moon {
  position: relative;
  color: #fbbf24;
}
.pi-sun {
  position: relative;
  color: #facc00;
}
.p-toggleswitch-slider {
  background-color: rgb(250, 250, 250);
  transition: background-color 0.3s ease;
}
.p-menubar-root-list {
  width: 80%;
  justify-content: space-between;
  margin: auto;
}
.menu-label {
  display: inline-block;
  font-size: 1rem;
  font-weight: 600;
  margin-left: 8px;
  vertical-align: middle;
}
@media (min-width: 960px) {
  .menu-label {
    display: none;
  }
}

/* Для выравнивания по центру с бургером */
.p-menubar-start {
  display: flex;
  align-items: center;
}
</style>
