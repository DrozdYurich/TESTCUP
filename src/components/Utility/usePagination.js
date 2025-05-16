import { computed, ref } from "vue";

export default function usePagination(items) {
  const currentPage = ref(1);
  const itemsPerPage = 4;
  const totalPage = computed(() => Math.ceil(items.length / itemsPerPage));
  const paginatesItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
  });

  function prevPage() {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  }
  console.log(paginatesItems.value);
  function nextPage() {
    if (currentPage.value < totalPage.value) {
      currentPage.value++;
    }
  }
  function goToPage(page) {
    if (page >= 1 && page <= totalPage.value) {
      currentPage.value = page;
    }
  }
  return {
    currentPage,
    totalPage,
    itemsPerPage,
    paginatesItems,
    prevPage,
    nextPage,
    goToPage,
  };
}
