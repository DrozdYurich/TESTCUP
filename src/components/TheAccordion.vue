<template>
  <Accordion :value="value">
    <AccordionPanel
      :value="value"
      :style="{ background: 'var(--accordion-bg)' }"
    >
      <AccordionHeader :style="{ background: 'var(--accordion-bg)' }">
        {{ title }}
      </AccordionHeader>
      <AccordionContent>
        <p class="m-0">
          {{ content }}
        </p>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>

<script setup>
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionPanel,
} from "primevue";

const props = defineProps({
  title: String,
  content: String,
  value: String,
});
</script>
<style>
.p-accordioncontent-content {
  color: red;
  background-color: var(--accordion-bg);
}
</style>
