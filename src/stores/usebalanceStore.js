import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useBalansStore = defineStore("balans", () => {
  const balansData = localStorage.getItem("balans");
  const balans = ref(null);
  try {
    if (balansData) {
      balans.value = JSON.parse(balansData); // Только если данные есть
    }
  } catch (e) {
    localStorage.removeItem("balans"); // Очищаем битые данные
  }
  function setbalanse(newUser) {
    balans.value = newUser;
    localStorage.setItem("balans", JSON.stringify(newUser));
  }
  function removeBalans() {
    balans.value = null;
    localStorage.removeItem("balans");
  }
  const getBalanse = computed(() => balans.value);
  return {
    setbalanse,
    removeBalans,
    getBalanse,
  };
});
