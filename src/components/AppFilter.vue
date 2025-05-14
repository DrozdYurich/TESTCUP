<template>
  <div class="w-full mb-2 flex gap-2">
    <IconField>
      <InputIcon class="pi pi-search" />
      <InputText
        class="w-full"
        :value="searchTitle"
        @input="$emit('update:searchTitle', $event.target.value)"
        placeholder="Title"
        size="small"
      />
    </IconField>
    <RadioButtonGroup class="flex gap-2">
      <div class="flex items-center gap-2">
        <RadioButton
          inputId="activ"
          :value="'activ'"
          :checked="(status = 'activ')"
          @change="$emit('update:status')"
        />
        <label for="activ">Активный</label>
      </div>
      <div class="flex items-center gap-2">
        <RadioButton
          inputId="noactiv"
          :value="'noactiv'"
          :checked="(status = 'noactiv')"
          @change="$emit('update:status')"
        />
        <label for="noactiv">Неактивный</label>
      </div>
    </RadioButtonGroup>
    <IconField>
      <InputIcon class="pi pi-search" />
      <InputText
        class="w-full"
        :value="searchSubTitle"
        @input="$emit('update:searchSubTitle', $event.target.value)"
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
  searchSubTitle: String,
});
const emits = defineEmits([
  "update:searchTitle",
  "update:status",
  "update:searchSubTitle",
]);
</script>
<style scoped></style>
