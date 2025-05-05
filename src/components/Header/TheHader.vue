<template>
  <div class="card">
    <Menubar :model="items" ref="menubarRef">
      <template #item="{ item, props, hasSubmenu }">
        <router-link
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="item.route"
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
  </div>
</template>

<script setup>
import { Menubar } from "primevue";
import { ref } from "vue";

const menubarRef = ref();

const items = ref([
  {
    label: "Главная",
    icon: "pi pi-home",
    route: "/",
  },
  {
    label: "Первый",
    icon: "pi pi-palette",
    route: "/one",
  },
  {
    label: "Второй",
    icon: "pi pi-link",
    route: "/two",
  },
  {
    label: "Третий",
    icon: "pi pi-home",
    route: "/three",
  },
  {
    label: "Личный кабинет",
    icon: "pi pi-home",
    route: "/cabinet",
  },
]);

function handleMenuClick(navigate) {
  event.preventDefault();
  navigate();
  menubarRef.value?.hide();
}
</script>
