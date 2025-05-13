<template>
  <div>
    <div>Home</div>
    <Button @click="showDialogProduct">Открыть модальное окно</Button>
  </div>
</template>
<script setup>
import { Button } from "primevue";
import useModalMethods from "@/components/Modal/MethodsModal/methods";
const { showDialogProduct } = useModalMethods();
</script>
<style scoped></style>
