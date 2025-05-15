<template>
  <div>
    <h3 class="text-2xl font-semibold mb-4">Пагинация</h3>
    <div
      class="cards grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white rounded-lg shadow-md max-h-[60vh] overflow-y-auto"
    >
      <CardInfo
        v-for="(pag, i) in paginatesItems"
        :key="i"
        :title="pag.title"
        :subtitle="pag.subtitle"
        class="cardinf transition-shadow hover:shadow-lg rounded-lg border border-gray-200"
        backgroundColor="rgb(93, 142, 216)"
        border-left-width="10px"
        border-left="gold"
        color="white"
        colorSub="black"
      >
      </CardInfo>
    </div>
    <div class="flex gap-2 mt-6 justify-center items-center">
      <Button
        icon="pi pi-arrow-left"
        :disabled="currentPage === 1"
        @click="prevPage"
        severity="success"
        class="w-10 h-10 rounded-md hover:not-disabled:bg-primary-300 transition hover:border-0"
      />
      <Button
        v-for="page in totalPage"
        :key="page"
        @click="goToPage(page)"
        :class="[
          'w-10 h-10 rounded-md border border-gray-300 transition',
          page === currentPage
            ? 'bg-red-600 text-white shadow-md'
            : 'bg-white text-gray-800 hover:bg-gray-100 ',
        ]"
      >
        {{ page }}
      </Button>
      <Button
        :disabled="currentPage === totalPage"
        icon="pi pi-arrow-right"
        severity="success"
        @click="nextPage"
        class="w-10 h-10 rounded-md hover:not-disabled:bg-primary-300 transition hover:border-0"
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
