<template>
  <div class="card">
    <h1>Home</h1>
    <div class="container w-full">
      <CardInfo
        v-for="n in 8"
        :key="n"
        :title="'Название' + n"
        :subtitle="'Подназвание' + n"
        class="cardinf"
      >
        <template #header>
          <img
            alt="user header"
            src="https://primefaces.org/cdn/primevue/images/usercard.png"
          />
        </template>
        <template #content>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non nulla
            quae enim officiis hic omnis illum beatae ratione placeat facilis at
            necessitatibus expedita deleniti, ducimus adipisci voluptas qui
            reprehenderit nam!
          </p>
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
const { showDialogProduct } = useModalMethods();
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
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 100%;
}

.cardinf {
  flex: 1 1 25%;
  min-width: 250px;
  max-width: 400px;
  box-sizing: border-box;
}
@media (max-width: 600px) {
  .card {
    width: 70vw;
  }
}
</style>
