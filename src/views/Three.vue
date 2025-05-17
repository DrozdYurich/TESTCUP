<template>
  <div class="container">
    <div class="card">
      <Accordion value="0">
        <AccordionPanel
          v-for="acc in tabs"
          :value="acc.value"
          :style="{ background: 'blue' }"
        >
          <AccordionHeader :style="{ background: 'blue' }">{{
            acc.title
          }}</AccordionHeader>
          <AccordionContent :style="{ background: 'blue' }">
            <p class="m-0">
              {{ acc.content }}
            </p>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
  </div>
</template>

<script setup>
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionPanel,
} from "primevue";
import { value } from "valibot";
import { ref } from "vue";

const tabs = ref([
  { title: "Title 1", content: "Content 1", value: "0" },
  { title: "Title 2", content: "Content 2", value: "1" },
  { title: "Title 3", content: "Content 3", value: "2" },
]);
</script>

<style>
.container {
  width: 90vw;
  margin: auto;
}
.p-accordioncontent-content {
  background-color: blue;
}
</style>
