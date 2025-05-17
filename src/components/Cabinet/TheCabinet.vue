<template>
  <div>
    <h3 class="text-2xl font-semibold mb-4">Пагинация</h3>
    <transition name="fade" mode="out-in">
      <div
        :key="currentPage"
        class="cards grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white rounded-lg shadow-md max-h-[60vh] overflow-y-auto"
      >
        <CardInfo
          v-for="(pag, i) in paginatesItems"
          :key="pag.id"
          :title="pag.title"
          :subtitle="pag.subtitle"
          :border-width="'1px'"
          :border-left-width="'10px'"
          class="cardinf transition-shadow hover:shadow-lg rounded-lg border border-gray-200"
          style="
            border-left: 10px solid var(--card-border-left) !important;
            --card-bg: var(--card-background-color);
            --card-border: var(--card-border-color);
            --card-text: var(--card-text-color);
            --card-subtext: var(--card-subtext-color);
          "
        >
        </CardInfo>
      </div>
    </transition>
    <div class="flex gap-2 mt-6 justify-center items-center">
      <Paginator
        :rows="itemsPerPage"
        :total-records="comp.length"
        :first="(currentPage - 1) * itemsPerPage"
        :page-link-size="4"
        @page="onPageChange"
      >
      </Paginator>
    </div>
  </div>
</template>

<script setup>
import { Button, Paginator } from "primevue";
import comp from "../../../public/compititions";
import CardInfo from "../CardInfo.vue";
import usePagination from "../Utility/usePagination";
const { goToPage, itemsPerPage, paginatesItems, currentPage } =
  usePagination(comp);
function onPageChange(event) {
  goToPage(event.page + 1);
}
</script>
<style scoped>
::v-deep .p-paginator-page-selected {
  background-color: var(--checked-color) !important;
  color: rgb(255, 255, 255) !important;
}
.fade-enter-active {
  animation: in 0.4s ease;
}
.fade-leave-active {
  animation: out 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
@keyframes in {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes out {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100px);
  }
}
</style>
