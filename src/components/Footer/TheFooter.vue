<template>
  <footer
    class="border-t transition-colors duration-300 mt-3"
    :style="{
      'background-color': 'var(--card-background-color)',
      'border-color': 'var(--border-color)',
      color: 'var(--card-text-color)',
    }"
  >
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- О нас -->
        <div>
          <h4 class="text-xl mb-4" :style="{ color: 'var(--border-color)' }">
            О нас
          </h4>
          <p>Компания, создающая лучшие цифровые решения</p>
        </div>
        <div>
          <h4 class="text-xl mb-4" :style="{ color: 'var(--border-color)' }">
            Контакты
          </h4>
          <ul class="space-y-2">
            <li class="flex items-center gap-2">
              <i class="pi pi-envelope"></i>
              info@example.com
            </li>
            <li class="flex items-center gap-2">
              <i class="pi pi-phone"></i>
              +7 (123) 456-78-90
            </li>
          </ul>
        </div>
        <div>
          <h4 class="text-xl mb-4" :style="{ color: 'var(--border-color)' }">
            Соцсети
          </h4>

          <div>
            <div class="flex gap-4 items-center">
              <Button
                icon="pi pi-telegram"
                class="p-button-rounded p-button-text"
                severity="info"
                text
                size="large"
              ></Button>
              <Button
                icon="pi pi-android"
                class="p-button-rounded p-button-text"
                severity="info"
              />
              <Button
                icon="pi pi-github"
                class="p-button-rounded p-button-text"
                severity="info"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        class="border-t mt-8 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4"
        :style="{ 'border-color': 'var(--border-color)' }"
      >
        <p>© 2025 Аналитик. Все права защищены</p>
        <!-- <Button
          :icon="!isDark ? 'pi pi-moon' : 'pi pi-sun'"
          class="p-button-rounded p-button-text"
          :style="{ color: 'var(--border-color)' }"
        /> -->
      </div>
    </div>
  </footer>
</template>

<script setup>
import Button from "primevue/button";
import useTheme from "../Utility/useTheme";
const { isDark } = useTheme();
</script>
