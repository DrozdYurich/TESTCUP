<template>
  <div>
    <div>Modal List</div>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, optio
      atque deserunt
    </p>
  </div>
</template>
<script setup>
import { inject } from "vue";

const dialogRef = inject("dialogRef");
function closeDialog() {
  dialogRef.value.close();
}
</script>
<style scoped></style>
