<template>
  <div class="card">
    <h1 class="text-3xl font-bold mb-3">Лотереи</h1>
    <div class="container w-full">
      <CardInfo
        data-aos="fade-up"
        data-aos-anchor-placement="top-center"
        v-for="n in filteredItems"
        :key="n.id"
        :title="n.title"
        :subtitle="n.subtitle"
        :border-width="'1px'"
        class="cardinf"
        style="
          --card-bg: var(--card-background-color);
          --card-border: var(--card-border-color);
          --card-text: var(--card-text-color);
          --card-subtext: var(--card-subtext-color);
        "
      >
        <template #header>
          <img
            alt="user header"
            src="https://primefaces.org/cdn/primevue/images/usercard.png"
          />
        </template>
        <template #content>
          <div class="w-full flex justify-between">
            <p class="text-[var(--card-color-content)]">{{ n.desription }}</p>
            <Tag
              class="h-1/6"
              :icon="n.status === 'activ' ? 'pi pi-check' : 'pi pi-times'"
              :severity="n.status === 'activ' ? 'success' : 'danger'"
              :value="n.status"
            ></Tag>
          </div>
        </template>
        <template #footer>
          <Button
            @click="showDialogProduct"
            style="background-color: var(--button-bg); border: none"
            >Открыть модальное окно</Button
          >
        </template>
      </CardInfo>
    </div>
    <Button
      v-if="scrollY > 100"
      class="fixed bottom-3 right-3 z-50"
      icon="pi pi-arrow-up"
      severity="secondary"
      rounded
      size="large"
      @click="goToHead"
    >
    </Button>
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
