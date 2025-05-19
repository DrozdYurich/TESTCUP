<template>
  <div class="card">
    <h1 class="text-3xl font-bold mb-1 mt-1">Статистика СТОЛОТО</h1>
    <TheStatisticGlobal />
  </div>
</template>

<script setup>
import Button from "primevue/button";
import useModalMethods from "@/components/Modal/MethodsModal/methods";
import CardInfo from "@/components/CardInfo.vue";
import AppFilter from "@/components/AppFilter.vue";
import items from "../../public/data";
import { computed, ref } from "vue";
import useScrollY from "@/components/Utility/useScrollY";
import { Tag } from "primevue";
import TheStatisticGlobal from "@/components/TheStatisticGlobal.vue";
const { showDialogProduct } = useModalMethods();
const searchTitle = ref("");
const searchSubtitle = ref("");
const status = ref("");
const { scrollY } = useScrollY();
const filteredItems = computed(() => {
  return items.filter((it) => {
    const matchesTitle = it.title
      .toLowerCase()
      .includes(searchTitle.value.toLowerCase());
    const matshSubTitle = it.subtitle
      .toLowerCase()
      .includes(searchSubtitle.value.toLowerCase());
    const matshStatus = status.value ? it.status === status.value : true;
    return matchesTitle && matshSubTitle && matshStatus;
  });
});
const resetFilter = () => {
  searchSubtitle.value = "";
  searchTitle.value = "";
  status.value = "";
};

const goToHead = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<style scoped>
.card {
  width: 90vw;
  max-width: 1400px;
  margin: 0 auto;
}

.container {
  margin: 0 auto;
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 100%;
}

.cardinf {
  flex: 1 1 25%;
  min-width: 300px;
  max-width: 400px;
  box-sizing: border-box;
}
@media (max-width: 600px) {
  .card {
    width: 90vw;
  }
}
</style>
