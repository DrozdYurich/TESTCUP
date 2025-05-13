<template>
  <div class="card">
    <h1>Home</h1>
    <div class="container w-full">
      <CardInfo
        v-for="n in 3"
        :key="n"
        :title="'Н' + n"
        :subtitle="'По' + n"
        class="cardinf"
      >
        <template #content>
          <p>Lorem ipsum dolor sit amet consectetu</p>
        </template>
        <template #footer>
          <Button
            @click="showDialogList"
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
const { showDialogList } = useModalMethods();
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
    width: 90vw;
  }
}
</style>
