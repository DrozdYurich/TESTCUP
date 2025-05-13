<template>
  <div>
    <Button class="bg-black border-0" @click="showDialogList"
      >Открыть список</Button
    >
  </div>
</template>
<script setup>
import useModalMethods from "@/components/Modal/MethodsModal/methods";
import { Button } from "primevue";
const { showDialogList } = useModalMethods();
// const getIzavka = async () => {
//   try {
//     loading.value = true;
//     const response = await axios.get(
//       "http://10.8.0.23:8000/user/vacancy-responses/",
//       {
//         headers: {
//           Authorization: `Token ${token.value}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     console.log(response);
//     isData.value = false;
//     izavka.value = response.data.responses;
//     loading.value = false;
//     console.log("zavka", izavka.value);
//     return response.data;
//   } catch (error) {
//     isData.value = true;
//     loading.value = false;
//     console.error("Error fetching regions:", error);
//     throw error;
//   }
// };
</script>
<style scoped></style>
