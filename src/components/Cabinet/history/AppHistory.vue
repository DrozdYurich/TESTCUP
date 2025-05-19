<template>
  <div class="card w-full">
    <Panel class="profile-panel">
      <!-- Заголовок -->
      <template #header>
        <div class="flex items-center gap-3 p-3">
          <span class="font-bold text-lg text-[var(--text-color)]"
            >Название</span
          >
        </div>
      </template>
      <div class="p-4">
        <div class="flex flex-col space-y-4">
          <div class="flex justify-between">
            <span class="text-sm text-[var(--card-subtext-color)]">Статус</span>
            <Tag
              :value="isFinished ? 'Активен' : 'Не активен'"
              :severity="isFinished ? 'success' : 'danger'"
            />
          </div>
        </div>
        <div v-if="!isFinished" class="flex justify-between mt-2">
          <span class="text-sm text-[var(--card-subtext-color)]">Выигрыш</span>
          <Tag value="Выигрыш" severity="info" />
        </div>
        <Divider />
      </div>
    </Panel>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";

import { Panel, Avatar, Button, Divider, Tag } from "primevue";

const toast = useToast();
const isFinished = computed(() => {
  return false;
});
</script>

<style scoped>
.profile-panel {
  background-color: var(--card-background-color);
  border: 1px solid var(--card-border-color);
  color: var(--text-color);
  box-shadow: var(--box-shadow);
  border-radius: 12px;
}

.theme-button {
  background-color: var(--card-border-color);
  color: #000;
  border: none;
  transition: all 0.3s ease;
}

.theme-button:hover {
  filter: brightness(90%);
}
</style>
