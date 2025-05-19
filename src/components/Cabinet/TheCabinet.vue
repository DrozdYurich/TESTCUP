<template>
  <div
    class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
  >
    <AppHistory v-for="n in 10" :key="n" class="w-full" />
  </div>
</template>

<script setup>
import { Button, Paginator } from "primevue";
import comp from "../../../public/compititions";
import CardInfo from "../CardInfo.vue";
import usePagination from "../Utility/usePagination";
import AppHistory from "./history/AppHistory.vue";
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
