<template>
  <div class="card">
    <h1>Home</h1>

    <AppFilter
      v-model:searchTitle="searchTitle"
      v-model:status="status"
      v-model:searchSubTitle="searchSubtitle"
      @reset="resetFilter"
    />
    <div class="container w-full">
      <CardInfo
        v-animateonscroll="{
          enterClass:
            'animate-enter fade-in-10 zoom-in-80 slide-in-from-t-20 animate-duration-1000',
        }"
        v-for="n in filteredItems"
        :key="n.id"
        :title="n.title"
        :subtitle="n.subtitle"
        class="cardinf"
      >
        <template #header>
          <img
            alt="user header"
            src="https://primefaces.org/cdn/primevue/images/usercard.png"
          />
        </template>
        <template #content>
          <div class="w-full flex justify-between">
            <p>{{ n.desription }}</p>
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
            style="background-color: palevioletred; border: none"
            >Открыть модальное окно</Button
          >
        </template>
      </CardInfo>
    </div>
  </div>
</template>

<script setup>
import Button from "primevue/button";
import useModalMethods from "@/components/Modal/MethodsModal/methods";
import CardInfo from "@/components/CardInfo.vue";
import AppFilter from "@/components/AppFilter.vue";
import items from "../../public/data";
import { computed, onMounted, ref } from "vue";
import { Tag } from "primevue";
const { showDialogProduct } = useModalMethods();
const searchTitle = ref("");
const searchSubtitle = ref("");
const status = ref("");
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
