<template>
  <div>
    <h3 class="text-2xl font-semibold mb-4">Пагинация</h3>
    <div
      class="cards flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md max-h-[60vh] overflow-y-auto"
    >
      <CardInfo
        v-for="pag in paginatesItems"
        :key="pag.id"
        :title="pag.title"
        :subtitle="pag.subtitle"
        class="cardinf transition-shadow hover:shadow-lg rounded-lg border border-gray-200"
        backgroundColor="gainsboro"
        border-left-width="10px"
        border-left="red"
        color="black"
        colorSub="gray"
      />
    </div>
    <div class="flex gap-2 mt-6 justify-center items-center">
      <Button
        icon="pi pi-arrow-left"
        :disabled="currentPage === 1"
        @click="prevPage"
        class="w-10 h-10 rounded-md border border-gray-300 hover:bg-gray-100 transition"
        aria-label="Previous page"
      />
      <Button
        v-for="page in totalPage"
        :key="page"
        @click="goToPage(page)"
        :class="[
          'w-10 h-10 rounded-md border border-gray-300 transition',
          page === currentPage
            ? 'bg-blue-600 text-white shadow-md'
            : 'bg-white text-gray-700 hover:bg-gray-100',
        ]"
        aria-current="page"
        :aria-label="`Page ${page}`"
      >
        {{ page }}
      </Button>
      <Button
        :disabled="currentPage === totalPage"
        icon="pi pi-arrow-right"
        @click="nextPage"
        class="w-10 h-10 rounded-md border border-gray-300 hover:bg-gray-100 transition"
        aria-label="Next page"
      />
    </div>
  </div>
</template>

<script setup>
import { Button } from "primevue";
import comp from "../../../public/compititions";
import CardInfo from "../CardInfo.vue";
import usePagination from "../Utility/usePagination";
const { goToPage, nextPage, paginatesItems, prevPage, totalPage, currentPage } =
  usePagination(comp);
</script>
<style scoped></style>
