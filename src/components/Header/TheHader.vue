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
      <template #end>
        <div class="flex gap-2 items-center">
          <span class="balance-tag" @click="goTokoshel"> {{ balance }} P </span>
          <ToggleSwitch
            id="theme-switch"
            v-model="isDark"
            :aria-label="`Переключатель темы, сейчас ${
              isDark ? 'тёмная' : 'светлая'
            }`"
          >
            <template #handle="{ checked }">
              <i
                :class="checked ? 'pi pi-moon' : 'pi pi-sun'"
                class="text-lg"
              ></i>
            </template>
          </ToggleSwitch>
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup>
import { Menubar, ToggleSwitch } from "primevue";
import { computed, onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/useAuthStore";
import useTheme from "../Utility/useTheme";
import { useBalansStore } from "@/stores/usebalanceStore";
import { useRouter } from "vue-router";
const { getBalanse } = storeToRefs(useBalansStore());
const router = useRouter();
const menubarRef = ref();
const { isAuth } = storeToRefs(useAuthStore());
const { isDark } = useTheme();
const auth = computed(() => {
  return isAuth.value;
});
const balance = computed(() => getBalanse.value.balance);
const goTokoshel = () => {
  router.push({ name: "profilone" });
};
const items = ref([
  {
    label: "Главная",
    icon: "pi pi-home",
    route: "home",
  },
  {
    label: "Лотереи",
    icon: "pi pi-ticket",
    route: "one",
  },
  {
    label: "Новости",
    icon: "pi pi-book",
    route: "two",
  },
  {
    label: "Вопросы",
    icon: "pi pi-question-circle",
    route: "three",
  },
  {
    label: auth.value ? "Личный кабинет" : "Войти",
    icon: auth.value ? "pi pi-user" : "pi pi-sign-in",
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
  background-color: var(--background-color);
  border-color: var(--border-color);
  transition: background-color 0.3s ease;
}
.p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-slider {
  background-color: var(--background-color);
}
.balance-tag {
  font-size: 0.8rem;
  padding: 0.4rem 0.8rem;
  background-color: var(--card-background-color);
  color: var(--card-border-color); /* Золотой цвет текста */
  border-radius: 999px;
  border: 1px solid var(--card-border-color);
  transition: all 0.3s ease;
}

.balance-tag:hover {
  background-color: var(--card-border-color);
  color: #000;
  border-color: var(--card-border-color);
}
.toggle-switch .p-toggleswitch-slider {
  background-color: var(--card-border-color) !important;
  border-color: var(--card-border-color) !important;
}

.toggle-icon {
  color: #000 !important;
  background-color: var(--card-border-color) !important;
  border-radius: 999px;
  padding: 0.25rem;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.toggle-switch.p-component.p-toggleswitch-checked .toggle-icon.pi-moon,
.toggle-switch.p-component.p-toggleswitch-checked .toggle-icon.pi-sun {
  background-color: #000 !important;
  color: var(--card-border-color) !important;
}
</style>
