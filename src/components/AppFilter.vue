<template>
  <div class="w-full mb-2 flex gap-2">
    <IconField>
      <InputIcon class="pi pi-search" />
      <InputText
        class="w-full"
        v-model="searchTitle"
        placeholder="Title"
        size="small"
      />
    </IconField>
    <RadioButtonGroup class="flex gap-2">
      <div class="flex items-center gap-2">
        <RadioButton inputId="activ" value="activ" />
        <label for="activ">Активный</label>
      </div>
      <div class="flex items-center gap-2">
        <RadioButton inputId="noactiv" value="noactiv" />
        <label for="noactiv">Неактивный</label>
      </div>
    </RadioButtonGroup>
    <IconField>
      <InputIcon class="pi pi-search" />
      <InputText
        class="w-full"
        v-model="value1"
        placeholder="subtitle"
        size="small"
      />
    </IconField>
  </div>
</template>
<script setup>
import {
  IconField,
  InputIcon,
  InputText,
  RadioButton,
  RadioButtonGroup,
} from "primevue";
const props = defineProps({
  searchTitle: String,
  status: String,
});
</script>
<style scoped></style>
