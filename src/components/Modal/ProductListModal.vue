<template>
  <div>
    <div>Modal 1</div>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, optio
      atque doloremque deserunt suscipit debitis praesentium dolores consequatur
      earum animi, nihil enim laudantium ullam numquam cupiditate eveniet
      reprehenderit accusamus quas!
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
<style></style>
