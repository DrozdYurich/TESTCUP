import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useLoteryStore = defineStore("lotery", () => {
  const loteryData = localStorage.getItem("lotery");
  const lotery = ref(null);

  try {
    if (loteryData) {
      lotery.value = JSON.parse(loteryData); // Только если данные есть
    }
  } catch (e) {
    localStorage.removeItem("lotery"); // Очищаем битые данные
  }
  function setLotery(newUser) {
    lotery.value = newUser;
    localStorage.setItem("lotery", JSON.stringify(newUser));
  }
  function removeLotery() {
    lotery.value = null;
    localStorage.removeItem("lotery");
  }
  const getLotery = computed(() => lotery.value);
  return {
    setLotery,
    getLotery,
    removeLotery,
  };
});
