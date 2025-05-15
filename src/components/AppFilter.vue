<template>
  <div
    class="filter w-full mb-2 flex flex-col md:flex-row justify-around gap-2"
  >
    <IconField>
      <InputIcon class="pi pi-search" />
      <InputText
        class="w-full"
        :value="searchTitle"
        @input="$emit('update:searchTitle', $event.target.value)"
        placeholder="Title"
      />
    </IconField>

    <div class="flex items-center gap-2">
      <RadioButton
        inputId="activ"
        value="activ"
        :modelValue="status"
        @update:modelValue="$emit('update:status', $event)"
      />
      <label for="activ">Активный</label>
    </div>
    <div class="flex items-center gap-2">
      <RadioButton
        inputId="noactiv"
        name="status"
        value="noactiv"
        :modelValue="status"
        @update:modelValue="$emit('update:status', $event)"
      />
      <label for="noactiv">Неактивный</label>
    </div>

    <IconField>
      <InputIcon class="pi pi-search" />
      <InputText
        class="w-full"
        :value="searchSubTitle"
        @input="$emit('update:searchSubTitle', $event.target.value)"
        placeholder="subtitle"
      />
    </IconField>
    <Button
      class="px-5"
      severity="danger"
      @click="$emit('reset')"
      label="Сбросить"
    ></Button>
  </div>
</template>
<script setup>
import { Button, IconField, InputIcon, InputText, RadioButton } from "primevue";
const props = defineProps({
  searchTitle: String,
  status: String,
  searchSubTitle: String,
});
const emits = defineEmits([
  "update:searchTitle",
  "update:status",
  "update:searchSubTitle",
  "reset",
]);
</script>
<style scoped>
.filter {
  width: 100%;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 0.5rem;
}
@media (min-width: 768px) {
  .filter {
    flex-direction: row;
  }
}
</style>
